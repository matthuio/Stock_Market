"use client"
import * as React from 'react'
import BurgerMenu from '@/components/BurgerMenu'
import HeroSection from '@/components/HeroSection'
import { useState,useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import FrontPageMarquee from '@/components/FrontPageMarquee';
import ChartSection from '@/components/ChartSection';
import Chart from '@/components/Chart';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { fetchStockHistory } from '@/Models/StockModel';
import { Spinner } from "@/components/ui/spinner"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { fetchUserBalance, fetchUserUsername, updateUserBalance, updateUserStock, updateUserTradeHistory } from '@/Models/UserModel';


type PurchaseProps = {
    params: Promise<{
        ticker: string;
    }>;
};



const Purchase = ({params}: PurchaseProps) => {
    const [sidebarVisible,setSidebarVisible] = useState(false);
    const [quant,setQuant] = useState(0)
    const [price,setPrice] = useState(0)
    const [stockPrice,setStockPrice] = useState(0)
    const [balance,setBalance] = useState(0)
    const [username,setUsername] = useState("")
    const [visible,setVisible] = useState(false)
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
    const {ticker} = React.use(params)
    const calculatePrice = async (e)=>
    {
        const value = e.target.value
        setQuant(value)
        setPrice(Number(value) * stockPrice)
    }
    const handleSubmit = async (e:any)=>
    {
        console.log(typeof(Number(quant)))
        console.log(Number(quant))
        console.log(Number(balance))
        if(Number(price) == 0 || Number(quant) == 0 || Number.isNaN(quant) || Number.isNaN(price) )
        {
            toast("Please enter a quantity greater than 0")
            return
        }
        else if(Number(price) > balance)
        {
            toast(`You are too poor your balance is:${balance}`)
            return
        }
        else{
            toast('Processing Payment')
            setVisible(true)
            var payment =await updateUserBalance(username,Number(price),balance,false)
            var stock = await updateUserStock(username,ticker,Number(quant),Number(stockPrice))
            var trade = await updateUserTradeHistory(username,ticker,Number(quant),Number(stockPrice),true)
            if (payment  == 200 && stock == 200 && trade  == 200)
            {
                toast('Payment Complete')
                setVisible(false)
            }
            else
            {
                toast("Payment Error Please Contact an admin for help")
                setVisible(false)
            }
        }
        
    }
    useEffect(()=>
    {
        const run = async()=>
        {
            const res = await fetch("/api/login", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
                })
                const x = await res.json()
                console.log(x)
            var name = x.user.username
            var data =await fetchStockHistory(ticker)
            var userData = await fetchUserBalance(name)
            console.log(userData)
            data = data[data.length-1][1]
            setStockPrice(data)
            setBalance(userData)
            setUsername(name)
        }
        run()
    },[]
    )
  return (
    <main className='w-256 flex items-center self-center py-30'>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <Toaster position='top-center'/>
        <FieldGroup>
        <Field>
            <FieldLabel htmlFor="fieldgroup-name">Ticker</FieldLabel>
            <Input disabled id="fieldgroup-name" className='placeholder-red' placeholder={ticker} />
            <FieldDescription>
                Please ensure this is the ticker corolating to who you want to buy
            </FieldDescription>
        </Field>
        <Field>
            <FieldLabel htmlFor="fieldgroup-email">Quantity</FieldLabel>
            <Input
            type='text'
            value={quant}
            onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault()
            }
            }}
            onInput={(e) => calculatePrice(e)}
            id="fieldgroup-quantity"
            placeholder="4"
            />
            <FieldDescription>
            How many {ticker}&apos;s do you want to buy
            </FieldDescription>
        </Field>
        <Field>
            <FieldLabel htmlFor="fieldgroup-email">Total Price</FieldLabel>
            <Input
            disabled
            id="fieldgroup-price"
            placeholder="4"
            value={price}
            />
            <FieldDescription>
            Cost
            </FieldDescription>
        </Field>
        {!visible &&        
        <Field orientation="horizontal">
            <Button type="reset" variant="outline">
            Reset
            </Button>
            <Button onClick={(e)=>handleSubmit(e)} type="submit">Submit</Button>
        </Field>}
        <div
        className={`
            flex w-full max-w-xs flex-col gap-4 [--radius:1rem]
            transition-all duration-300 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}
        >
        <Item variant="muted">
            <ItemMedia>
            <Spinner />
            </ItemMedia>
            <ItemContent>
            <ItemTitle className="line-clamp-1">
                Processing payment...
            </ItemTitle>
            </ItemContent>
            <ItemContent className=" justify-end">
            <span className="text-sm tabular-nums">{price}</span>
            </ItemContent>
        </Item>
        </div>
        </FieldGroup>
    </main>
    
  )
}

export default Purchase
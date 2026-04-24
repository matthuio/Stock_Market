"use client"
import * as React from 'react'
import { useSearchParams } from 'next/navigation'
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
import { Spinner } from "@/components/ui/spinner"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { fetchBet } from '@/Models/BetModel';
import { fetchUserBalance, updateUserBalance, updateUserBets } from '@/Models/UserModel';

type PurchaseProps = {
    params: Promise<{
        id: string;
    }>;
};


const Purchase = ({params}: PurchaseProps) => {
    const searchParams = useSearchParams()
    const option = searchParams.get('option')
    const mult = searchParams.get('mult')
    const [quant,setQuant] = useState(0)
    const [bets,setBets] = useState <any[]>([])
    const [price,setPrice] = useState(0)
    const [stockPrice,setStockPrice] = useState(0)
    const [balance,setBalance] = useState(0)
    const [visible,setVisible] = useState(false)
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
    const {id} = React.use(params)
        const handleSubmit = async (e:any)=>
    {
        console.log(typeof(Number(quant)))
        console.log(Number(quant))
        console.log(Number(balance))
        if(Number(price) == 0  || Number.isNaN(price) )
        {
            toast("Please enter a quantity greater than 0")
            return
        }
        else if(Number(price) > balance)
        {
            toast(`You are too poor your balance is:${balance}`)
            return
        }
        else
        {
            toast('Processing Payment')
            setVisible(true)
            var handleBet =await updateUserBets("admin",bets[0].desc,bets[0].uuid,option,Number(mult))
            var handleBalance = await updateUserBalance("admin",price,balance,false)
            if (handleBet == 200)
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
        const run = async () =>
            {
                var data =await fetchBet(id)
                var userData = await fetchUserBalance("admin")
                setBets(Array.isArray(data) ? data : [data])
                setBalance(userData)
            } 
        run()
    },[id])
  return (
    <main className='w-256 flex items-center self-center py-30'>
        <Toaster position='top-center'/>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <FieldGroup>
        <Field>
            <FieldLabel htmlFor="fieldgroup-name">Description</FieldLabel>
            <Input disabled id="fieldgroup-name" className='placeholder-red' placeholder={bets[0]?.desc} />
            <FieldDescription>
                Please ensure this is the description corolating to who you want to buy
            </FieldDescription>
        </Field>
        <Field>
            <FieldLabel htmlFor="fieldgroup-email">Bet Amount</FieldLabel>
            <Input
            type='text'
            value={price}
            onKeyDown={(e) => {
            if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault()
            }
            }}
            onChange={(e)=>setPrice(Number(e.target.value))}
            id="fieldgroup-quantity"
            placeholder="4"
            />
            <FieldDescription>
            How much money do you want to bet on: {bets[0]?.desc}
            </FieldDescription>
        </Field>
                <Field>
                    <FieldLabel htmlFor="fieldgroup-email">Your Option</FieldLabel>
                    <Input
                    disabled
                    id="fieldgroup-price"
                    placeholder={option}
                    value={option}
                    />
                    <FieldDescription>
                    Option
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
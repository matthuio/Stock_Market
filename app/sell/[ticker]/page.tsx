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
import { fetchUserBalance, fetchUserStocks, fetchUserUsername, processUserSellOrder, updateUserBalance, updateUserStock, updateUserTradeHistory } from '@/Models/UserModel';
import { useRouter } from "next/navigation";


type PurchaseProps = 
{
    params:{
        ticker: string
    }
    
}

const sell = ({params}) => {
    const router = useRouter();
    const [reset,setReset] = useState(false)
    const [sidebarVisible,setSidebarVisible] = useState(false);
    const [quant,setQuant] = useState(0)
    const [price,setPrice] = useState(0)
    const [totalQuant,setTotalQuant] = useState(0)
    const [stockPrice,setStockPrice] = useState(0)
    const [reducedList,setReducedList] = useState <any[]>([])
    const [newData,setnewData] = useState <any[]>([])
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
    const handleSubmit = async ()=>
    {
        console.log(typeof(Number(quant)))
        console.log(Number(quant))
        if(Number(price) == 0 || Number(quant) == 0 || Number.isNaN(quant) || Number.isNaN(price) )
        {
            toast("Please enter a quantity greater than 0")
            return
        }
        else if(Number(quant) > totalQuant)
        {
            toast(`You are only have: ${totalQuant} ${ticker}'s`)
            return
        }
        else{
            toast('Processing Sell Order')
            setVisible(true)
            let remaining = quant
            const finalList = []

            for (const list of reducedList) {
            const qty = Number(list[1])

            if (remaining <= 0) {
                finalList.push(list)
                continue
            }

            if (qty <= remaining) {
                remaining -= qty
            } else {
                list[1] = String(qty - remaining)
                remaining = 0
                finalList.push(list)
            }
            }
            console.log(finalList)
            setnewData(newData.push(finalList))
            const cleanStock = structuredClone(newData[0]);
            var balance = await fetchUserBalance("admin")
            var payment =await updateUserBalance("admin",Number(price),Number(balance),true)
            var stock = await processUserSellOrder("admin",cleanStock)
            var trade = await updateUserTradeHistory("admin",ticker,Number(quant),Number(stockPrice),false)

            if ( stock == 200 && trade  == 200 && payment == 200)
            {
                toast('Sell Order Complete')
                setVisible(false)
                setReset(!reset)
            }
            else
            {
                toast("Selling Error Please Contact an admin for help")
                setVisible(false)
                setReset(!reset)
                
            }
        }
        
    }
        useEffect(()=>
        {
            const run = async()=>
            {
                var stockData =await fetchStockHistory(ticker)
                var data =await fetchUserStocks('admin')
                var proxyList= []
                var totalQuant = 0
                const newDataList = data.filter((list) => {
                if (list[0] === ticker) {
                    totalQuant += Number(list[1])
                    proxyList.push(list)
                    return false
                }
                return true
                })
                console.log('newData:',newDataList)
                console.log('totalQuant:' ,totalQuant)
                console.log('proxyList:' ,proxyList)
                setTotalQuant(totalQuant)
                setStockPrice(stockData[stockData.length-1][1   ])
                setReducedList(proxyList)
                setnewData(newDataList)
                }
            run()
        },[reset])

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
                Please ensure this is the ticker corolating to who you want to sell
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
            How many {ticker}&apos;s do you want to sell
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
            Value of sold stocks
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

export default sell
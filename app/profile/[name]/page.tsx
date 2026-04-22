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
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { fetchUserUsername } from '@/Models/UserModel';
import { data } from 'react-router-dom';
import Link from "next/link"


type ProfileProps = 
{
    params:{
        name: string
    }
    
}

const Profile = ({params}) => {
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }

    const [username,setUsername] = useState <any[]>([])
    const [user,setUser] = useState <any[]>([])
    const [value,setVal] = useState(0)
    const [stock,setStock] = useState <any[]>([])
    const [bets,setBets] = useState <any[]>([])
    const {name} = React.use(params)
    useEffect(()=>{
        const  run = async ()=>
        {
            const data  = await fetchUserUsername(name)
            console.log(data)
            setUser(data[0])
            setUsername(data.name)
            console.log(data.stock)
            var stockP= data[0].stock
            console.log(data.stockP)
            stockP = JSON.parse(stockP)
            setStock(stockP)
            setBets(data[0].bets)
            console.log(bets)
            calculatePortfolio()
        }
        const calculatePortfolio = async () =>
        {
            var val = 0
            const arr = (user.stock != null && user.stock.length() > 0) ? user.stock : []
            if (arr != [])
            {
                arr.map((list) =>(
                   val += list[3] 
                ))
            }
            setVal(val)
        }
        run()
    },[])

  return (
            <div className='w-full h-screen flex items-center self-center py-30'>
                <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
                <BurgerMenu visible={sidebarVisible}>
        
                </BurgerMenu>
                <ResizablePanelGroup
                orientation="horizontal"
                className="max-w-full rounded-lg border h-full"
                >
                <ResizablePanel defaultSize="50%">
                    <div className="block h-[200px] items-center justify-center p-6">
                    <p className="font-semibold">{name}&apos;s profile</p>
                    <p className="font-semibold">{name}&apos;s Balance is:{user.balance} </p>
                    <p className="font-semibold">{name}&apos;s total portfolio value is:{value}</p>
                    <p className="font-semibold">You currently Hold:</p>
                    {stock?.map((list, index) => (
                        <li
                        key={index}
                        >
                        <Link href={`/chart/${list[0]}`}>
                            {list[1]} {list[0]} at {list[2]}
                        </Link>
                        </li>
                    ))}
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <ResizablePanelGroup orientation="vertical">
                    <ResizablePanel defaultSize="25%">
                        <div className="block h-full items-center justify-center p-6">
                        <p className="font-semibold">Active Bets:</p>       
                        {bets?.map((list, index) => (
                        <li
                        key={index}
                        >
                        <Link href={`/chart/${list[0]}`}>
                            {list.desc} {list.option} @{list.mult}x
                        </Link>
                        </li>
                    ))}
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize="75%">
                        <div className="block h-full items-center justify-center p-6">
                        <p className="font-semibold"></p>
                        <p className="font-semibold">Sold 10 RCK @ 5</p>
                        <p className="font-semibold">Sold 10 RCK @ 5</p>
                        <p className="font-semibold">Sold 10 RCK @ 5</p>
                        <p className="font-semibold">Sold 10 RCK @ 5</p>
                        <p className="font-semibold">Sold 10 RCK @ 5</p>
                        <p className="font-semibold">Sold 10 RCK @ 5</p>
                        </div>
                    </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
                </ResizablePanelGroup>
            </div>
  )
}

export default Profile
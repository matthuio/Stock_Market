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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"
import { fetchBets } from '@/Models/BetModel';

type ProfileProps = 
{
    params:{
        name: string
    }
    
}

const Profile = ({params}) => {
    const [sidebarVisible,setSidebarVisible] = useState(false);
    const [bets,setBets] = useState <any[]>([])
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
    const {name} = React.use(params)
    useEffect(()=>
    {
        const run = async () =>
        {
            var data = await fetchBets()
            console.log(data)
            setBets(data)
            console.log(bets)
        }
        run()
    },[])
  return (
    <div className='w-screen h-screen flex flex-col items-center self-center justify-center'>
    <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
    <BurgerMenu visible={sidebarVisible}>

    </BurgerMenu>
    {   
        bets?.map((arr,index)=>(     
        <div className='py-50'>
            <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Link href={`bets/${arr.uuid}`}><Button className='text-white' variant="link">{arr.desc}</Button></Link>
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-0.5">
                    <div className='font-semibold'>{arr.desc}</div>
                    {arr.options.map((list,index)=>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {list} X{arr.mult[index]}
                        </div>
                    )}
                  
                </HoverCardContent>
            </HoverCard>
        </div>
        ))
        }



    </div>
  )
}

export default Profile
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
import { fetchBet } from '@/Models/BetModel';

type ProfileProps = 
{
    params:{
        id: string
    }
    
}

const Profile = ({params}) => {
    const [bets,setBets] = useState<any[]>([])
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
    const {id} = React.use(params)
    useEffect(()=>
    {
        const run = async () =>
            {
                var data =await fetchBet(id)
                console.log(data)
                setBets(data)
                console.log(bets[0])
            } 
        run()
    },[id])
  return (
    <div className='w-screen h-screen flex flex-col items-center self-center justify-center'>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <div>
            <h1>
                {bets.length!=0 && bets[0].desc}
            </h1>
            {bets && bets.length != 0 &&
                bets[0]?.options.map((list,index)=>
                (
                <Link href={`/purchase/bets/${id}?option=${list}&mult=${bets[0].mult[index]}`}>
                        <Button>
                            Over Multiplier : {bets[0].mult[index]}
                        </Button>
                </Link>
                ))
            }
            <h4>
                Status : {bets.length != 0 && (bets[0].status ? "Active": "Inactive")}
            </h4>

        </div>


    </div>
  )
}

export default Profile
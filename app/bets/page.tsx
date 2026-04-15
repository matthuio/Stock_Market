"use client"
import * as React from 'react'
import BurgerMenu from '@/components/BurgerMenu'
import HeroSection from '@/components/HeroSection'
import { useState } from "react";
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
    const {name} = React.use(params)
  return (
    <div className='w-screen h-screen flex flex-col items-center self-center justify-center'>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <div>
            <HoverCard openDelay={10} closeDelay={100}>
                <HoverCardTrigger asChild>
                    <Button className='text-white' variant="link">Hover Here</Button>
                </HoverCardTrigger>
                <HoverCardContent className="flex flex-col gap-0.5">
                    <div className="font-semibold">@nextjs</div>
                    <div>The React Framework – created and maintained by @vercel.</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                    Joined December 2021
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
            <div className='py-50'>
                <HoverCard openDelay={10} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <Link href='bets/1'><Button className='text-white' variant="link">Hover Here</Button></Link>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-col gap-0.5">
                        <div className="font-semibold">@nextjs</div>
                        <div>The React Framework – created and maintained by @vercel.</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                        Joined December 2021
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>


    </div>
  )
}

export default Profile
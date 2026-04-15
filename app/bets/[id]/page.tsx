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
        id: string
    }
    
}

const Profile = ({params}) => {
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
    const {id} = React.use(params)
  return (
    <div className='w-screen h-screen flex flex-col items-center self-center justify-center'>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <div>
            <h1>
                Lorem Impsum (Description)
            </h1>
            <h2>
                Multiplier : 3x
            </h2>
            <Link href={`/purchase/bets/1?=Over`}>
                    <Button>
                        Over
                    </Button>
            </Link>
            <Link href={`/purchase/bets/1?=Under`}>
                    <Button>
                        Under
                    </Button>
            </Link>
            <h4>
                Status
            </h4>

        </div>


    </div>
  )
}

export default Profile
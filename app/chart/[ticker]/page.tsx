"use client"
import React from 'react'
import BurgerMenu from '@/components/BurgerMenu'
import HeroSection from '@/components/HeroSection'
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import FrontPageMarquee from '@/components/FrontPageMarquee';
import ChartSection from '@/components/ChartSection';
import Chart from '@/components/Chart';
import { Button } from "@/components/ui/button"
import Link from "next/link"

type ChartProps = 
{
    params:{
        ticker: string
    }
    
}

const chart = ({params}) => {
    const {ticker} = React.use(params)
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
  return (
    <main className='h-screen overflow-y-scroll snap-y snap-mandatory bg-black'>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <section>
            <Chart ticker={ticker}>

            </Chart>
        </section>
    </main>
  )
}

export default chart
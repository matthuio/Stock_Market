"use client"
import React from 'react'
import BurgerMenu from '@/components/BurgerMenu'
import HeroSection from '@/components/HeroSection'
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import FrontPageMarquee from '@/components/FrontPageMarquee';
import ChartSection from '@/components/ChartSection';

const FrontPage = () => {
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
  return (
    <main className='h-screen overflow-y-scroll snap-y snap-mandatory bg-black'>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-256 flex justify-center">
            <FrontPageMarquee>

            </FrontPageMarquee>
        </div>
        <CiMenuBurger  className="absolute text-4xl top-4 left-4 z-50 cursor-pointer" onClick={handleClick}/>
        <BurgerMenu visible={sidebarVisible}>

        </BurgerMenu>
        <section className="snap-start h-screen">
            <HeroSection>

            </HeroSection>
        </section>
        
        <section className="snap-start h-screen">
            <ChartSection>
            </ChartSection>
        </section>
    </main>
  )
}

export default FrontPage
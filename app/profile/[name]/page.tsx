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
                    <p className="font-semibold">Matthew&apos;s profile</p>
                    <p className="font-semibold">Matthew&apos;s Balance is: 100</p>
                    <p className="font-semibold">Matthew&apos;s total portfolio value is:1000</p>
                    <p className="font-semibold">You currently Hold:</p>
                    <p className="font-semibold">10 RCK</p>
                    <p className="font-semibold">2 BOB</p>
                    <p className="font-semibold">4 Tyrese</p>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize="50%">
                    <ResizablePanelGroup orientation="vertical">
                    <ResizablePanel defaultSize="25%">
                        <div className="block h-full items-center justify-center p-6">
                        <p className="font-semibold">Active Bets:</p>
                        <p className="font-semibold">Over 3 Main Characters die by episode 3</p>
                        <p className="font-semibold">Lorem Ipsum</p>
                        <p className="font-semibold">Lorem Ipsum</p>
                        <p className="font-semibold">Lorem Ipsum</p>                    
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
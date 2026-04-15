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

type SellProps = 
{
    params:{
        ticker: string
    }
    
}

const sell = ({params}) => {
    const [sidebarVisible,setSidebarVisible] = useState(false);
        function handleClick(){
        console.log("Clicked");
        setSidebarVisible(!sidebarVisible);
    }
    const {ticker} = React.use(params)
  return (
    <main className='w-256 flex items-center self-center py-30'>
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
            />
            <FieldDescription>
            Value of sold stocks
            </FieldDescription>
        </Field>
        <Field orientation="horizontal">
            <Button type="reset" variant="outline">
            Reset
            </Button>
            <Button type="submit">Submit</Button>
        </Field>
        </FieldGroup>
    </main>
  )
}

export default sell
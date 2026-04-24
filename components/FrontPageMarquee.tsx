import React, { useEffect, useState } from 'react'
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { fetchStocks } from '@/Models/StockModel';

type TickerList = {
  image?: string;
  lightimg?: string;
  name: string;
};

const FrontPageMarquee = () => {
  const [data,setData] = useState<any[]>([])
  const TickerList: TickerList[] = [
  ]
  useEffect(()=>
  {
    const run = async () =>
    {
      var proxy = []
        var stockData = await fetchStocks()
        stockData.map((arr,index)=>
        {
          proxy.push(
            {
              name:`${arr.ticker} : ${arr.history[arr.history.length-1][1]}`
            }
          )
        }
        )
        setData(proxy)
    }
    run()

  },[])
  {

  }
  return (
      <Marquee className="[--duration:20s] p-0 flex self-center align-self-center" pauseOnHover>
        {data.map((ticker, index) => (
          <div key={index}>
            {ticker.name}
          </div>
        ))}
      </Marquee>
  )
}

export default FrontPageMarquee
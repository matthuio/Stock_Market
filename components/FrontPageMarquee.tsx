import React from 'react'
import { Marquee } from "@/components/shadcn-space/animations/marquee";

type TickerList = {
  image?: string;
  lightimg?: string;
  name: string;
};

const FrontPageMarquee = () => {
  const TickerList: TickerList[] = [
      {
        name: "RCK:100",
      },
      {
        name: "RCK:200",
      },
      {
        name: "RCK:300",
      },
      {
        name: "RCK:400",
      },
      {
        name: "RCK:500",
      },
  ]
  return (
      <Marquee className="[--duration:20s] p-0 flex self-center align-self-center" pauseOnHover>
        {TickerList.map((ticker, index) => (
          <div key={index}>
            {ticker.name}
          </div>
        ))}
      </Marquee>
  )
}

export default FrontPageMarquee
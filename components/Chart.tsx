"use client"
import { useEffect,useState } from "react";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchStockHistory,fetchStockSpecific } from "@/Models/StockModel";
import Link from "next/link"
import { Button } from "./ui/button";
 type ChartProps =
 {
  ticker:string
 }

export default function Chart({ticker}:ChartProps) {
  const [stockHistory,setStockHistory] = useState <any[]>([])
  const [stockName,setStockName] = useState <string>('')
  const [stockDescription,setStockDescription] = useState <string>('')
  const [maximum,setMaximum] = useState(0)
  useEffect(()=>
  {

    const run = async()=>
    {
      var max = 0
      var name = await fetchStockSpecific(ticker)
      name = name[0]
      var data  = await fetchStockHistory(ticker)
      console.log(name)
      const proxy = data.map((holder) => (
        {
        price: holder[1],
        time: holder[0],
      }
      
    ));
    data.map((holder)=>
    {
      if(holder[1] > max)
        {
          max = holder[1]
        }
    })
      setMaximum(max)
      setStockHistory(proxy)
      setStockName(name.name)
      setStockDescription(name.desc)
    }
    run()
  },[]
  )


  return (
    <div className="w-full h-[300px] bg-black p-4 rounded-2xl">
      <h2 className="text-white text-lg mb-2 px-24">{ticker} - {stockDescription}</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={stockHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" yAxisId="episodes" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid #333",
            }}
              formatter={(value) => [`$${value}`, "Stock Price"]}
              labelFormatter={(label) => `Episode: ${label}`}  
            labelStyle={{ color: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00ff88"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
              <div>
            <p>
                Historical High: {maximum}
            </p>
        </div>
                <div>
            <Link href={`/purchase/${ticker}`}>
                    <Button>
                        Purchase
                    </Button>
            </Link>

        </div>
        <div>
            <Link href={`/sell/${ticker}`}>
                <Button>
                    Sell
                </Button>
            </Link>

        </div>
    </div>
  );
}

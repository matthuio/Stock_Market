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

// Generate fake stock data
const generateData = () => {
  let price = 100;
  return Array.from({ length: 50 }, (_, i) => {
    price += (Math.random() - 0.5) * 5; // random movement
    return {
      time: i,
      price: parseFloat(price.toFixed(2)),
    };
  });
};

const data = generateData();

export default function Chart({ ticker = "Stock Price" }) {
  return (
    <div className="w-full h-[300px] bg-black p-4 rounded-2xl">
      <h2 className="text-white text-lg mb-2">{ticker}</h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00ff88"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

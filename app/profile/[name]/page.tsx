"use client";
import * as React from "react";
import BurgerMenu from "@/components/BurgerMenu";
import HeroSection from "@/components/HeroSection";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import FrontPageMarquee from "@/components/FrontPageMarquee";
import ChartSection from "@/components/ChartSection";
import Chart from "@/components/Chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { fetchUserUsername } from "@/Models/UserModel";
import { data } from "react-router-dom";
import Link from "next/link";

type ProfileProps = {
  params: Promise<{
    name: string;
  }>;
};

const Profile = ({ params }: ProfileProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  function handleClick() {
    console.log("Clicked");
    setSidebarVisible(!sidebarVisible);
  }

  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<any>([]);
  const [value, setVal] = useState(0);
  const [stock, setStock] = useState<any[]>([]);
  const [bets, setBets] = useState<any[]>([]);
  const [history, setStockHistory] = useState<any[]>([]);
  const { name } = React.use(params);
  useEffect(() => {
    const run = async () => {
      const data = await fetchUserUsername(name);
      console.log(data);
      const fetchedUser = Array.isArray(data) ? data[0] : data;
      setUser(fetchedUser);
      setUsername(fetchedUser?.name ?? "");
      console.log(fetchedUser?.stock);
      var stockP = fetchedUser?.stock ?? [];
      stockP.sort((a, b) => a[0].localeCompare(b[0]));
      setStock(stockP);
      setStockHistory(data[0].tradeHistory);
      setBets(data[0].bets);
      console.log(bets);
      console.log(history)
      calculatePortfolio();
    };
    const calculatePortfolio = async () => {
      var val = 0;
      const arr =
        user.stock != null && user.stock.length() > 0 ? user.stock : [];
      if (arr.length > 0) {
        arr.map((list) => (val += list[3]));
      }
      setVal(val);
    };
    run();
  }, [name]);

  return (
    <div className="w-full h-screen flex items-center self-center py-30">
      <CiMenuBurger
        className="absolute text-4xl top-4 left-4 z-50 cursor-pointer"
        onClick={handleClick}
      />
      <BurgerMenu visible={sidebarVisible}></BurgerMenu>
      <ResizablePanelGroup
        orientation="horizontal"
        className="max-w-full rounded-lg border h-full"
      >
        <ResizablePanel defaultSize="50%">
          <div className="block h-[200px] items-center justify-center p-6">
            <p className="font-semibold">{name}&apos;s profile</p>
            <p className="font-semibold">
              {name}&apos;s Balance is:{user.balance}{" "}
            </p>
            <p className="font-semibold">
              {name}&apos;s total portfolio value is:{value}
            </p>
            <p className="font-semibold">You currently Hold:</p>
            {stock?.map((list, index) => (
              <li key={index}>
                <Link href={`/chart/${list[0]}`}>
                  {list[1]} {list[0]} at {list[2]}
                </Link>
              </li>
            ))}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="25%">
              <div className="block h-full items-center justify-center p-6">
                <p className="font-semibold">Active Bets:</p>
                {bets?.map((list, index) => (
                  <li key={index}>
                    <Link href={`/chart/${list[0]}`}>
                      {list.desc} {list.option} @{list.mult}x
                    </Link>
                  </li>
                ))}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="75%">
              <div className="block h-full items-center justify-center p-6">
                <p className="font-semibold"></p>
                {history?.map((arr, index) => (
                  <p className="font-semibold">
                    {Boolean(JSON.parse(arr[3])) ? "Purchased" : "Sold"} {arr[1]} {arr[0]} @ {arr[2]} each
                  </p>
                ))}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Profile;

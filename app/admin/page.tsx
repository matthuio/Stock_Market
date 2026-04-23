"use client";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  createBet,
  deleteBet,
  fetchBets,
  updateBetStatus,
} from "@/Models/BetModel";
import { fetchStocks, updateStocks } from "@/Models/StockModel";
import { toast, Toaster } from "sonner";
import { TOGGLE } from "../api/login/route";
const admin = () => {
  const [bets, setBets] = useState<any[]>([]);
  const [stocks, setStocks] = useState<any[]>([]);
  const [mult, setMult] = useState("");
  const [options, setOptions] = useState("");
  const [desc, setDesc] = useState("");
  const [marketOpen, setMarketOpen] = useState(false);
  const handleChangeStatus = async (e, uuid: string) => {
    await updateBetStatus(uuid);
  };
  const handleDelete = async (e, uuid: string) => {
    await deleteBet(uuid);
  };
  const handleSubmit = async (e) => {
    var opt = JSON.parse(options);
    var mul = JSON.parse(mult);
    if (desc.length != 0 && opt.length != 0 && mult.length != 0) {
      var res = await createBet(desc, opt, mul);
    } else {
      toast("Error");
    }
    if (Number(res) != 200) {
      toast("Error");
    } else {
      toast("Good job!");
    }
  };
  const handleUpdate = async (e) => {
    const updated = stocks.map((stock) => {
      const lastEntry = stock.history[stock.history.length - 1];
      const newEntry = [
        Number(lastEntry[0]) + 1,
        stock.newValue ?? lastEntry[1],
      ];
      return {
        uuid: stock.uuid,
        history: [...stock.history, newEntry],
      };
    });
    await updateStocks(updated);
  };
  const handleStockChange = (index: number, value: string) => {
    setStocks((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], newValue: value };
      return updated;
    });
  };
  const handleToggle = async () => {
    const newValue = !marketOpen;
    setMarketOpen(newValue);
    const res = await fetch("/api/login", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value:newValue })
    })
  };

  useEffect(() => {
    const run = async () => {
      const data = await fetchBets();
      const stockData = await fetchStocks();
      console.log(data);
      console.log(stockData);
      setBets(data);
      setStocks(stockData);
      console.log(stocks);
      console.log(bets);
    };
    run();
    const value = document.cookie
      .split("; ")
      .find((row) => row.startsWith("market-open="))
      ?.split("=")[1];
    setMarketOpen(value === "true");
  }, []);
  return (
    <div className="px-6 py-10">
      <Toaster></Toaster>
      <Switch id="airplane-mode" checked={marketOpen} onCheckedChange={handleToggle} />
      <Label htmlFor="airplane-mode">Stock Market Status</Label>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="bet">Bet Description</FieldLabel>
          <Input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            id="bet"
            type="text"
            placeholder="Enter Bet"
          />
          <FieldDescription>Add a bet or something</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="bet-options">Bet Options</FieldLabel>
          <Input
            onChange={(e) => setOptions(e.target.value)}
            value={options}
            id="bet-options"
            type="text"
            placeholder="Enter Bet Options"
          />
          <FieldDescription>Add bet options</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="bet-mults">Bet Multipliers</FieldLabel>
          <Input
            onChange={(e) => setMult(e.target.value)}
            value={mult}
            id="bet-mults"
            type="text"
            placeholder="Enter Bet mults"
          />
          <FieldDescription>
            You need to add the mults as an array and in the same order as the
            options
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button onClick={(e) => handleSubmit(e)} type="submit">
            Submit
          </Button>
        </Field>
      </FieldGroup>
      <FieldGroup className="flex">
        {stocks?.map((arr, index) => (
          <Field>
            <FieldLabel>{arr.name}</FieldLabel>
            <Input
              id={String(index)}
              defaultValue={arr.history[arr.history.length - 1][1]}
              onChange={(e) => handleStockChange(index, e.target.value)}
            />
          </Field>
        ))}
        <Button type="submit" onClick={(e) => handleUpdate(e)}>
          Update Stocks
        </Button>
      </FieldGroup>
      {bets?.map((arr, index) => (
        <div>
          <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
              <Button
                onClick={(e) => handleChangeStatus(e, arr.uuid)}
                className="text-white"
                variant="link"
              >
                {arr.desc}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-0.5">
              <div className="font-semibold">{arr.desc}</div>
              {arr.options.map((list, index) => (
                <div className="mt-1 text-xs text-muted-foreground">
                  {list} X{arr.mult[index]}
                </div>
              ))}
            </HoverCardContent>
          </HoverCard>
          <Button onClick={(e) => handleDelete(e, arr.uuid)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

export default admin;

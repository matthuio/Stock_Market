import { supabase } from "@/lib/supabase"

export async function fetchStocks() {
    const { data, error } = await supabase
    .from("stocks")
    .select("*")
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        return data
    }


}
export async function fetchStockHistory(ticker:string) {
    const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .eq("ticker",ticker)
    if (error)
    {
        console.log(error)
        throw new Error(error.message)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        var arr = data[0].history
        return arr
    }


}
export async function fetchStockSpecific(ticker:string) {
    const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .eq("ticker",ticker)
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        return data
    }
}
export async function deleteStock(uuid:string) {
    const { data, error } = await supabase
    .from("stocks")
    .delete()
    .eq("uuid",uuid)
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || (data as any[]).length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        return data
    }
}
export async function updateStockHistory(price:number,episode:number,uuid:string) {
    var test= await fetchStockHistory('380a63e2-4eb0-4689-b6f7-1d29ff885fcd')
    test.push([episode,price])
    const { data, error } = await supabase
    .from("stocks")
    .update({ history: test })
    .eq("uuid",uuid)
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || (data as any[]).length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        return data
    }
}
export async function createStock(ticker:string,desc:string,name:string,episode:number,price:number) {
    const { data, error } = await supabase
    .from("stocks")
    .insert({ ticker:ticker,
                desc:desc,
                name:name,
                history:[[episode,price]]
            })
    if (error)
    {
        throw new Error(error.message)
    }
}
export async function updateStocks(stocks: { uuid: string, history: any[] }[]) {
  const { error } = await supabase
    .from("stocks")
    .upsert(stocks, { onConflict: "uuid" })
  if (error) throw new Error(error.message)
  return "200"
}
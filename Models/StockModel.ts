import { supabase } from "@/lib/supabase"

export async function fetchStocks() {
    const { data, error } = await supabase
    .from("stocks")
    .select("*")
    if (error)
    {
        throw new Error(error.messsage)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        return data
    }


}
export async function fetchStockHistory(uuid:string) {
    const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .eq("uuid",uuid)
    if (error)
    {
        console.log(error)
        throw new Error(error.messsage)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        var arr = data[0].history
        arr = JSON.parse(arr)

        return arr
    }


}
export async function fetchStockSpecific(uuid:string) {
    const { data, error } = await supabase
    .from("stocks")
    .select("*")
    .eq("uuid",uuid)
    if (error)
    {
        throw new Error(error.messsage)
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
        throw new Error(error.messsage)
    }
    if (!data || data.length == 0)
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
        throw new Error(error.messsage)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        return data
    }
}
export async function createStock(ticker:string,desc:string,name:string) {
    const { data, error } = await supabase
    .from("stocks")
    .insert({ ticker:ticker,
                desc:desc,
                name:name
            })
    if (error)
    {
        throw new Error(error.messsage)
    }
}
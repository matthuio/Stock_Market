import { supabase } from "@/lib/supabase"

export async function fetchUsers() {
    const { data, error } = await supabase
    .from("users")
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
export async function fetchUser(uuid:string) {
    const { data, error } = await supabase
    .from("users")
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
export async function fetchUserUsername(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username",username)
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
export async function fetchUserStocks(uuid:string) {
    const { data, error } = await supabase
    .from("users")
    .select("stock")
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
        var arr = data[0].stock
        arr= JSON.parse(arr)
        return arr.stock
    }
        
}
export async function fetchUserBets(uuid:string) {
    const { data, error } = await supabase
    .from("users")
    .select("bets")
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
        var arr = data[0].bets
        arr= JSON.parse(arr)
        return arr.bets
    }
        
}
export async function updateUserStock(uuid:string,stockId:string,quant:number,epsiode:number) {
    var test = await fetchUserStocks(uuid)
    test.push(stockId,epsiode,quant)
    const { data, error } = await supabase
    .from("users")
    .update("stock",test)
    if (error)
    {
        throw new Error(error.messsage)
    }

}
export async function updateUserBets(uuid:string,betId:string,option:number,mult:number) {
    var test = await fetchUserBets(uuid)
    var obj = {
        betId : betId,
        option: option,
        mult : mult
    }
    test.push(obj)
    const { data, error } = await supabase
    .from("users")
    .update("stock",test)
    if (error)
    {
        throw new Error(error.messsage)
    }

}
export async function loginUser(username:string,password:string) {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password",password)
    if (error)
    {
        throw new Error(error.messsage)
    }
    if (data.length == 0 || !data)
    {
        return "404"
    }
    if(data.length != 0 && data.length == 1)
    {
        return "200"
    }

}
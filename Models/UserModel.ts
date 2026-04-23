import { supabase } from "@/lib/supabase"

export async function fetchUsers() {
    const { data, error } = await supabase
    .from("users")
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
export async function fetchUser(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username",username)
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
export async function fetchUserUsername(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username",username)
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
export async function fetchUserStocks(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("stock")
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        console.log(data)
        var arr = data[0].stock
        return arr
    }
        
}
export async function fetchUserTradeHistory(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("tradeHistory")
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        console.log(data)
        var arr = data[0].tradeHistory
        return arr
    }
        
}
export async function fetchUserBalance(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("balance")
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    if (!data || data.length == 0)
    {
        return `Data is empty:${data}`
    }
    else{
        var arr = data[0].balance
        return arr
    }
        
}
export async function fetchUserBets(username:string) {
    const { data, error } = await supabase
    .from("users")
    .select("bets")
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
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
export async function updateUserStock(username:string,ticker:string,quant:number,price:number) {
    var test = await fetchUserStocks(username)
    console.log(test)
    test.push([ticker,quant,price])
    const { data, error } = await supabase
    .from("users")
    .update({"stock":test})
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    else
    {
        return 200
    }

}
export async function processUserSellOrder(username:string,stock:Array<Array<any>>) {
    // var test = await fetchUserStocks(username)
    console.log(stock)
    const { data, error } = await supabase
    .from("users")
    .update({ "stock": stock })
    .eq("username",username)
    .select()
    if (error)
    {
        throw new Error(error.message)
    }
    else
    {
        console.log(data,error)
        return 200
    }

}
export async function updateUserTradeHistory(username:string,ticker:string,quant:number,price:number,action:boolean) {
    var test = await fetchUserTradeHistory(username)
    console.log(test)
    test.push([ticker,quant,price,action])
    const { data, error } = await supabase
    .from("users")
    .update({"tradeHistory":test})
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    else
    {
        return 200
    }

}
export async function updateUserBets(username:string,desc:string,betId:string,option:string,mult:number) {
    var test = await fetchUserBets(username)
    var obj = {
        desc:desc,
        betId : betId,
        option: option,
        mult : mult
    }
    test.push(obj)
    const { data, error } = await supabase
    .from("users")
    .update("bets",test)
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    else
    {
        return 200
    }

}
export async function updateUserBalance(username:string,price:number,balance:number,action:boolean) {
    console.log(balance,price)
    if (action == true)
    {
        var newBal= balance+price
    }
    else{
        var nweBal=balance-price
    }
    console.log(newBal,username)
    const { data, error } = await supabase
    .from("users")
    .update({"balance":newBal})
    .eq("username",username)
    if (error)
    {
        throw new Error(error.message)
    }
    else
    {
        return 200
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
        throw new Error(error.message)
    }
    if (data.length == 0 || !data)
    {
        return "404"
    }
    if(data.length != 0 && data.length == 1)
    {
        return data
    }

}
import { supabase } from "@/lib/supabase"

export async function fetchBets() {
    const { data, error } = await supabase
    .from("bets")
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
export async function fetchBet(uuid:string) {
    const { data, error } = await supabase
    .from("bets")
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
export async function deleteBet(uuid:string) {
    const { data, error } = await supabase
    .from("bets")
    .delete()
    .eq("uuid",uuid)
    if (error)
    {
        throw new Error(error.messsage)
    }
    return "200"


}
export async function createBet(desc?:string,options:string[],mult:number[]) {
    const { data, error } = await supabase
    .from("bets")
    .insert({
        "desc":desc,
        "options":options,
        "mult":mult
    })
    if (error)
    {
        throw new Error(error.messsage)
    }
    return "200"


}
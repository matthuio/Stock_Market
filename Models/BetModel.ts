import { supabase } from "@/lib/supabase"

export async function fetchBets() {
    const { data, error } = await supabase
    .from("bets")
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
export async function fetchBet(uuid:string) {
    const { data, error } = await supabase
    .from("bets")
    .select("*")
    .eq("uuid",uuid)
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
export async function fetchBetStatus(uuid:string) {
    const { data, error } = await supabase
    .from("bets")
    .select("status")
    .eq("uuid",uuid)
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
export async function deleteBet(uuid:string) {
    const { data, error } = await supabase
    .from("bets")
    .delete()
    .eq("uuid",uuid)
    if (error)
    {
        throw new Error(error.message)
    }
    return "200"


}
export async function createBet(desc:string,options:string[],mult:number[]) {
    const { data, error } = await supabase
    .from("bets")
    .insert({
        "desc":desc,
        "options":options,
        "mult":mult
    })
    if (error)
    {
        throw new Error(error.message)
    }
    return 200


}
export async function updateBetStatus(uuid: string) {
  const { data, error } = await supabase.rpc("toggle_boolean_column", {
    table_name: "bets",
    column_name: "status",
    target_uuid: uuid
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  console.log(data)
  return data
}
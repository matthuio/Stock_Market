import { supabase } from "@/lib/supabase"

export async function toggleMarket() {
  const { data, error } = await supabase.rpc("toggle_boolean_column", {
    table_name: "settings",
    column_name: "marketOpen",
    target_uuid: "dcdf88d4-e599-4612-9320-f6eb130df697"
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
  console.log(data)
  return data
}
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { InvItem } from "@/lib/types/inv-item"

export async function getInvItems(): Promise<InvItem[]> {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase
    .from("inv_items")
    .select("uuid, item, description, location, room, owner, image, quantity, notes")
    .order("item", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

import {
  isLakeNormanLocation,
  subLocationToDb,
  type InventoryLocation,
} from "@/lib/inventory/constants"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { uploadInventoryItemImage } from "@/lib/inventory/item-image"
import type { InvItemInput } from "@/lib/types/inv-item"

export async function createInvItem(
  input: InvItemInput,
  imageFile?: File | null,
) {
  const supabase = createSupabaseBrowserClient()

  const { data: inserted, error } = await supabase
    .from("inv_items")
    .insert({
      item: input.item.trim(),
      description: input.description?.trim() || null,
      location: input.location,
      room: input.room?.trim() || null,
      sub_location: isLakeNormanLocation(input.location)
        ? subLocationToDb(input.sub_location ?? "")
        : null,
      shelf: isLakeNormanLocation(input.location)
        ? input.shelf?.trim() || null
        : null,
      owner: input.owner,
      quantity: input.quantity,
      notes: input.notes?.trim() || null,
    })
    .select("uuid")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  if (imageFile) {
    const imageUrl = await uploadInventoryItemImage(inserted.uuid, imageFile)

    const { error: updateError } = await supabase
      .from("inv_items")
      .update({ image: imageUrl })
      .eq("uuid", inserted.uuid)

    if (updateError) {
      throw new Error(updateError.message)
    }
  }

  return inserted.uuid
}

export type { InventoryLocation }

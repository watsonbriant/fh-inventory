import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import {
  deleteInventoryItemImages,
  uploadInventoryItemImage,
} from "@/lib/inventory/item-image"
import type { InvItemInput } from "@/lib/types/inv-item"

type UpdateInvItemOptions = {
  uuid: string
  input: InvItemInput
  imageFile?: File | null
  removeImage?: boolean
}

export async function updateInvItem({
  uuid,
  input,
  imageFile,
  removeImage = false,
}: UpdateInvItemOptions) {
  const supabase = createSupabaseBrowserClient()
  let image: string | null | undefined

  if (imageFile) {
    image = await uploadInventoryItemImage(uuid, imageFile)
  } else if (removeImage) {
    await deleteInventoryItemImages(uuid)
    image = null
  }

  const payload = {
    item: input.item.trim(),
    description: input.description?.trim() || null,
    location: input.location,
    room: input.room?.trim() || null,
    owner: input.owner,
    quantity: input.quantity,
    notes: input.notes?.trim() || null,
    ...(image !== undefined ? { image } : {}),
  }

  const { error } = await supabase
    .from("inv_items")
    .update(payload)
    .eq("uuid", uuid)

  if (error) {
    throw new Error(error.message)
  }
}

export async function deleteInvItem(uuid: string) {
  const supabase = createSupabaseBrowserClient()

  await deleteInventoryItemImages(uuid)

  const { error } = await supabase.from("inv_items").delete().eq("uuid", uuid)

  if (error) {
    throw new Error(error.message)
  }
}

import { INVENTORY_ITEMS_BUCKET } from "@/lib/inventory/constants"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export function getImageExtension(file: File) {
  const fromName = file.name.split(".").pop()?.toLowerCase()

  if (fromName && ["jpg", "jpeg", "png", "webp", "gif", "heic"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName
  }

  if (file.type === "image/png") return "png"
  if (file.type === "image/webp") return "webp"
  if (file.type === "image/gif") return "gif"

  return "jpg"
}

export async function uploadInventoryItemImage(uuid: string, imageFile: File) {
  const supabase = createSupabaseBrowserClient()
  const extension = getImageExtension(imageFile)
  const path = `${uuid}/image.${extension}`

  const { error: uploadError } = await supabase.storage
    .from(INVENTORY_ITEMS_BUCKET)
    .upload(path, imageFile, {
      upsert: true,
      contentType: imageFile.type || undefined,
    })

  if (uploadError) {
    throw new Error(uploadError.message)
  }

  const { data: publicUrlData } = supabase.storage
    .from(INVENTORY_ITEMS_BUCKET)
    .getPublicUrl(path)

  return publicUrlData.publicUrl
}

export async function deleteInventoryItemImages(uuid: string) {
  const supabase = createSupabaseBrowserClient()
  const { data: files, error: listError } = await supabase.storage
    .from(INVENTORY_ITEMS_BUCKET)
    .list(uuid)

  if (listError) {
    throw new Error(listError.message)
  }

  if (!files?.length) {
    return
  }

  const paths = files.map((file) => `${uuid}/${file.name}`)
  const { error: removeError } = await supabase.storage
    .from(INVENTORY_ITEMS_BUCKET)
    .remove(paths)

  if (removeError) {
    throw new Error(removeError.message)
  }
}

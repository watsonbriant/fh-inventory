import { ImageIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type InventoryItemImageProps = {
  src: string | null
  alt: string
  className?: string
}

export function InventoryItemImage({
  src,
  alt,
  className,
}: InventoryItemImageProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "hover-lift size-10 rounded-md border object-cover",
          className,
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex size-10 items-center justify-center rounded-md border bg-muted text-muted-foreground",
        className,
      )}
      aria-label="No image available"
      role="img"
    >
      <ImageIcon className="size-4" strokeWidth={1.75} />
    </div>
  )
}

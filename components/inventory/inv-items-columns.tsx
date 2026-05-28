"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDownIcon } from "lucide-react"

import { InventoryItemImage } from "@/components/inventory/inventory-item-image"
import { Button } from "@/components/ui/button"
import type { InvItem } from "@/lib/types/inv-item"

const fieldColumnClassName = "w-[320px] min-w-[320px] max-w-[320px] shrink-0"

function formatCellValue(value: string | number | null) {
  if (value === null || value === "") {
    return <span className="text-muted-foreground">—</span>
  }

  return value
}

function TruncatedText({ value }: { value: string | null }) {
  if (!value) {
    return <span className="text-muted-foreground">—</span>
  }

  return (
    <div className="line-clamp-2 whitespace-pre-wrap break-words">{value}</div>
  )
}

export const invItemsColumns: ColumnDef<InvItem>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string | null

      return (
        <InventoryItemImage
          src={image}
          alt={`${row.original.item} image`}
        />
      )
    },
  },
  {
    accessorKey: "item",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="-ml-2"
        onClick={(event) => {
          event.stopPropagation()
          column.toggleSorting(column.getIsSorted() === "asc")
        }}
      >
        Item
        <ArrowUpDownIcon className="size-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="min-w-[140px] font-medium">{row.getValue("item")}</div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="w-full text-center">Quantity</div>,
    cell: ({ row }) => (
      <div className="w-full text-center tabular-nums">
        {row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => formatCellValue(row.getValue("location")),
  },
  {
    accessorKey: "description",
    header: () => (
      <div className={fieldColumnClassName}>Description</div>
    ),
    meta: { className: fieldColumnClassName },
    cell: ({ row }) => (
      <TruncatedText value={row.getValue("description") as string | null} />
    ),
  },
  {
    accessorKey: "notes",
    header: () => <div className={fieldColumnClassName}>Notes</div>,
    meta: { className: fieldColumnClassName },
    cell: ({ row }) => (
      <TruncatedText value={row.getValue("notes") as string | null} />
    ),
  },
]

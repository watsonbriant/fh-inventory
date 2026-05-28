import { AsteriskIcon } from "lucide-react"

import { FieldLabel } from "@/components/ui/field"

export function RequiredFieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <FieldLabel htmlFor={htmlFor} className="inline-flex items-center gap-1">
      {children}
      <AsteriskIcon className="size-3 text-destructive" aria-hidden="true" />
    </FieldLabel>
  )
}

export function validateInvItemForm({
  item,
  location,
  quantity,
}: {
  item: string
  location: string
  quantity: number
}) {
  const errors: {
    item?: string
    location?: string
    quantity?: string
  } = {}

  if (!item.trim()) {
    errors.item = "Item name is required."
  }

  if (!location) {
    errors.location = "Select a storage location."
  }

  if (quantity < 1) {
    errors.quantity = "Quantity must be at least 1."
  }

  return errors
}

import { AsteriskIcon } from "lucide-react"

import { FieldLabel } from "@/components/ui/field"
import { INVENTORY_OWNER_OTHER } from "@/lib/inventory/constants"
import type { FormErrors } from "@/lib/types/inv-item"

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
  owner,
  quantity,
  notes,
}: {
  item: string
  location: string
  owner: string
  quantity: number
  notes: string
}): FormErrors {
  const errors: FormErrors = {}

  if (!item.trim()) {
    errors.item = "Item name is required."
  }

  if (!location) {
    errors.location = "Select a storage location."
  }

  if (!owner) {
    errors.owner = "Select an owner."
  }

  if (quantity < 1) {
    errors.quantity = "Quantity must be at least 1."
  }

  if (owner === INVENTORY_OWNER_OTHER && !notes.trim()) {
    errors.notes = "Notes are required when owner is Other."
  }

  return errors
}

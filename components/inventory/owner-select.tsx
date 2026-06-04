"use client"

import { RequiredFieldLabel } from "@/components/inventory/inv-item-form-utils"
import { Field, FieldError } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { INVENTORY_OWNERS, type InventoryOwner } from "@/lib/inventory/constants"
import type { FormErrors } from "@/lib/types/inv-item"

type OwnerSelectProps = {
  id: string
  value: string
  onValueChange: (value: InventoryOwner) => void
  errors?: Pick<FormErrors, "owner">
}

export function OwnerSelect({
  id,
  value,
  onValueChange,
  errors,
}: OwnerSelectProps) {
  return (
    <Field data-invalid={!!errors?.owner}>
      <RequiredFieldLabel htmlFor={id}>Owner</RequiredFieldLabel>
      <Select
        value={value || undefined}
        onValueChange={(v) => onValueChange(v as InventoryOwner)}
      >
        <SelectTrigger
          id={id}
          className="w-full text-sm"
          aria-invalid={!!errors?.owner}
        >
          <SelectValue placeholder="Select an owner" />
        </SelectTrigger>
        <SelectContent>
          {INVENTORY_OWNERS.map((owner) => (
            <SelectItem key={owner} value={owner}>
              {owner}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors?.owner ? <FieldError>{errors.owner}</FieldError> : null}
    </Field>
  )
}

"use client"

import { RequiredFieldLabel } from "@/components/inventory/inv-item-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import {
  INVENTORY_NOTES_PLACEHOLDER_DEFAULT,
  INVENTORY_NOTES_PLACEHOLDER_OTHER_OWNER,
  INVENTORY_OWNER_OTHER,
} from "@/lib/inventory/constants"
import type { FormErrors } from "@/lib/types/inv-item"

type InvItemNotesFieldProps = {
  id: string
  value: string
  onChange: (value: string) => void
  owner: string
  errors?: Pick<FormErrors, "notes">
}

export function InvItemNotesField({
  id,
  value,
  onChange,
  owner,
  errors,
}: InvItemNotesFieldProps) {
  const isOtherOwner = owner === INVENTORY_OWNER_OTHER

  return (
    <Field data-invalid={!!errors?.notes}>
      {isOtherOwner ? (
        <RequiredFieldLabel htmlFor={id}>Notes</RequiredFieldLabel>
      ) : (
        <FieldLabel htmlFor={id}>Notes</FieldLabel>
      )}
      <Textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={
          isOtherOwner
            ? INVENTORY_NOTES_PLACEHOLDER_OTHER_OWNER
            : INVENTORY_NOTES_PLACEHOLDER_DEFAULT
        }
        className="text-sm"
        rows={4}
        aria-invalid={!!errors?.notes}
        required={isOtherOwner}
      />
      {errors?.notes ? <FieldError>{errors.notes}</FieldError> : null}
    </Field>
  )
}

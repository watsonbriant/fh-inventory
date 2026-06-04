"use client"

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { LKN_SUB_LOCATIONS } from "@/lib/inventory/constants"

type LknSubLocationFieldsProps = {
  subLocationId: string
  shelfId: string
  subLocation: string
  shelf: string
  onSubLocationChange: (value: string) => void
  onShelfChange: (value: string) => void
}

export function LknSubLocationFields({
  subLocationId,
  shelfId,
  subLocation,
  shelf,
  onSubLocationChange,
  onShelfChange,
}: LknSubLocationFieldsProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
      <Field className="md:min-w-0 md:flex-1">
        <FieldLabel htmlFor={subLocationId}>Outdoor location</FieldLabel>
        <Select value={subLocation} onValueChange={onSubLocationChange}>
          <SelectTrigger id={subLocationId} className="w-full text-sm">
            <SelectValue placeholder="Select sub-location" />
          </SelectTrigger>
          <SelectContent>
            {LKN_SUB_LOCATIONS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field className="md:w-28 md:shrink-0">
        <FieldLabel htmlFor={shelfId}>Shelf</FieldLabel>
        <Input
          id={shelfId}
          value={shelf}
          onChange={(event) => onShelfChange(event.target.value)}
          placeholder="#"
          className="text-sm"
          inputMode="numeric"
        />
      </Field>
    </div>
  )
}

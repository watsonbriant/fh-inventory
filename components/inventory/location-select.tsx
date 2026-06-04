"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { INVENTORY_LOCATION_GROUPS } from "@/lib/inventory/constants"
import { cn } from "@/lib/utils"

type LocationSelectProps = {
  id: string
  value: string
  onValueChange: (value: string) => void
  "aria-invalid"?: boolean
  className?: string
}

export function LocationSelect({
  id,
  value,
  onValueChange,
  "aria-invalid": ariaInvalid,
  className,
}: LocationSelectProps) {
  return (
    <Select
      value={value || undefined}
      onValueChange={onValueChange}
    >
      <SelectTrigger
        id={id}
        className={cn("w-full text-sm", className)}
        aria-invalid={ariaInvalid}
      >
        <SelectValue placeholder="Select a storage location" />
      </SelectTrigger>
      <SelectContent>
        {INVENTORY_LOCATION_GROUPS.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}

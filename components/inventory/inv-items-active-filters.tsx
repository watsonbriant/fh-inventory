"use client"

import { XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getActiveFilterChips,
  hasActiveInvItemFilters,
  type InvItemFilterField,
  type InvItemFilters,
} from "@/lib/inventory/inv-item-filters"

type InvItemsActiveFiltersProps = {
  filters: InvItemFilters
  onRemove: (field: InvItemFilterField, value: string) => void
  onClearAll: () => void
}

export function InvItemsActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: InvItemsActiveFiltersProps) {
  if (!hasActiveInvItemFilters(filters)) {
    return null
  }

  const chips = getActiveFilterChips(filters)

  return (
    <div className="flex flex-col gap-2 px-4 lg:px-6">
      <div className="flex flex-wrap items-center gap-2">
        {chips.map((chip) => (
          <Badge key={chip.id} variant="secondary" className="gap-1 pr-1">
            {chip.label}
            <button
              type="button"
              className="rounded-full p-0.5 hover:bg-muted-foreground/20"
              aria-label={`Remove ${chip.label} filter`}
              onClick={() => onRemove(chip.field, chip.value)}
            >
              <XIcon className="size-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Button
        type="button"
        variant="link"
        className="h-auto w-fit p-0 text-sm"
        onClick={onClearAll}
      >
        Clear all filters
      </Button>
    </div>
  )
}

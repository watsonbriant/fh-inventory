"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  EMPTY_INV_ITEM_FILTERS,
  FILTER_LOCATION_GROUPS,
  FILTER_OWNER_OPTIONS,
  toggleFilterValue,
  type InvItemFilters,
} from "@/lib/inventory/inv-item-filters"

type InvItemsFilterDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  appliedFilters: InvItemFilters
  onApply: (filters: InvItemFilters) => void
  roomOptions: string[]
}

function FilterOption({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <Label htmlFor={id} className="font-normal">
        {label}
      </Label>
    </div>
  )
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      <div className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-1">
        {children}
      </div>
    </div>
  )
}

export function InvItemsFilterDialog({
  open,
  onOpenChange,
  appliedFilters,
  onApply,
  roomOptions,
}: InvItemsFilterDialogProps) {
  const [draftFilters, setDraftFilters] =
    React.useState<InvItemFilters>(appliedFilters)

  React.useEffect(() => {
    if (open) {
      setDraftFilters(appliedFilters)
    }
  }, [open, appliedFilters])

  function handleApply() {
    onApply(draftFilters)
    onOpenChange(false)
  }

  function handleClearDraft() {
    setDraftFilters(EMPTY_INV_ITEM_FILTERS)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter items</DialogTitle>
          <DialogDescription>
            Select one or more options in each section. Filters combine across
            sections.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <FilterSection title="Location">
            {FILTER_LOCATION_GROUPS.map((group, groupIndex) => (
              <div key={group.label} className="flex flex-col gap-2">
                {groupIndex > 0 ? <Separator /> : null}
                <p className="text-xs text-muted-foreground">{group.label}</p>
                {group.options.map((location) => (
                  <FilterOption
                    key={location}
                    id={`filter-location-${location}`}
                    label={location}
                    checked={draftFilters.locations.includes(location)}
                    onCheckedChange={() =>
                      setDraftFilters((current) =>
                        toggleFilterValue(current, "locations", location),
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </FilterSection>

          <Separator />

          <FilterSection title="Room">
            {roomOptions.length ? (
              roomOptions.map((room) => (
                <FilterOption
                  key={room}
                  id={`filter-room-${room}`}
                  label={room}
                  checked={draftFilters.rooms.includes(room)}
                  onCheckedChange={() =>
                    setDraftFilters((current) =>
                      toggleFilterValue(current, "rooms", room),
                    )
                  }
                />
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No rooms in inventory yet.
              </p>
            )}
          </FilterSection>

          <Separator />

          <FilterSection title="Owner">
            {FILTER_OWNER_OPTIONS.map((owner) => (
              <FilterOption
                key={owner}
                id={`filter-owner-${owner}`}
                label={owner}
                checked={draftFilters.owners.includes(owner)}
                onCheckedChange={() =>
                  setDraftFilters((current) =>
                    toggleFilterValue(current, "owners", owner),
                  )
                }
              />
            ))}
          </FilterSection>
        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            className="hover-lift"
            onClick={handleClearDraft}
          >
            Clear selections
          </Button>
          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="button" className="hover-lift" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

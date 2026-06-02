import {
  INVENTORY_LOCATION_GROUPS,
  INVENTORY_OWNERS,
} from "@/lib/inventory/constants"
import type { InvItem } from "@/lib/types/inv-item"

export type InvItemFilters = {
  locations: string[]
  rooms: string[]
  owners: string[]
}

export type InvItemFilterField = keyof InvItemFilters

export type ActiveFilterChip = {
  id: string
  field: InvItemFilterField
  value: string
  label: string
}

export const EMPTY_INV_ITEM_FILTERS: InvItemFilters = {
  locations: [],
  rooms: [],
  owners: [],
}

export function hasActiveInvItemFilters(filters: InvItemFilters) {
  return (
    filters.locations.length > 0 ||
    filters.rooms.length > 0 ||
    filters.owners.length > 0
  )
}

export function matchesInvItemFilters(item: InvItem, filters: InvItemFilters) {
  if (
    filters.locations.length > 0 &&
    !filters.locations.includes(item.location)
  ) {
    return false
  }

  if (filters.owners.length > 0 && !filters.owners.includes(item.owner)) {
    return false
  }

  if (filters.rooms.length > 0) {
    const room = item.room?.trim()

    if (!room || !filters.rooms.includes(room)) {
      return false
    }
  }

  return true
}

export function getUniqueRoomsFromItems(items: InvItem[]) {
  const rooms = new Set<string>()

  for (const item of items) {
    const room = item.room?.trim()

    if (room) {
      rooms.add(room)
    }
  }

  return [...rooms].sort((a, b) => a.localeCompare(b))
}

export function getActiveFilterChips(filters: InvItemFilters): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = []

  for (const location of filters.locations) {
    chips.push({
      id: `location:${location}`,
      field: "locations",
      value: location,
      label: `Location: ${location}`,
    })
  }

  for (const room of filters.rooms) {
    chips.push({
      id: `room:${room}`,
      field: "rooms",
      value: room,
      label: `Room: ${room}`,
    })
  }

  for (const owner of filters.owners) {
    chips.push({
      id: `owner:${owner}`,
      field: "owners",
      value: owner,
      label: `Owner: ${owner}`,
    })
  }

  return chips
}

export function removeFilterValue(
  filters: InvItemFilters,
  field: InvItemFilterField,
  value: string,
): InvItemFilters {
  return {
    ...filters,
    [field]: filters[field].filter((entry) => entry !== value),
  }
}

export function toggleFilterValue(
  filters: InvItemFilters,
  field: InvItemFilterField,
  value: string,
): InvItemFilters {
  const selected = filters[field]

  return {
    ...filters,
    [field]: selected.includes(value)
      ? selected.filter((entry) => entry !== value)
      : [...selected, value],
  }
}

export const FILTER_LOCATION_GROUPS = INVENTORY_LOCATION_GROUPS
export const FILTER_OWNER_OPTIONS = INVENTORY_OWNERS

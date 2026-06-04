export const INVENTORY_LOCATION_GROUPS = [
  {
    label: "Campuses",
    options: [
      "Central Campus",
      "South End Campus",
      "Lake Norman Campus",
      "Ballantyne Campus",
    ],
  },
  {
    label: "Other",
    options: ["The House at Central Campus", "The Lodge"],
  },
] as const

export type InventoryLocation =
  (typeof INVENTORY_LOCATION_GROUPS)[number]["options"][number]

export const LAKE_NORMAN_CAMPUS = "Lake Norman Campus" as const

export const LKN_SUB_LOCATION_NA = "N/A" as const

export const LKN_SUB_LOCATIONS = [
  LKN_SUB_LOCATION_NA,
  "LKN Storage 1",
  "LKN Storage 2",
  "LKN Woodworking Shop",
] as const

export type LknSubLocation = (typeof LKN_SUB_LOCATIONS)[number]

export function isLakeNormanLocation(location: string) {
  return location === LAKE_NORMAN_CAMPUS
}

export function subLocationToDb(value: string) {
  const trimmed = value.trim()
  if (!trimmed || trimmed === LKN_SUB_LOCATION_NA) {
    return null
  }
  return trimmed
}

export function subLocationFromDb(value: string | null | undefined) {
  if (!value) {
    return LKN_SUB_LOCATION_NA
  }
  return value as LknSubLocation
}

export const INVENTORY_LOCATIONS: InventoryLocation[] =
  INVENTORY_LOCATION_GROUPS.flatMap((group) => [...group.options])

export const INVENTORY_OWNER_OTHER = "Other" as const

export const INVENTORY_OWNERS = [
  "Production",
  "Worship",
  "SALT",
  "Coffee Shoppe",
  "Facilities",
  "Creative",
  "Marketing",
  "Outreach",
  "Missions",
  "FHKids",
  "Vertical",
  "MVMNT",
  "Strong",
  "Authentic",
  "Ministries",
  "Events",
  "Hospitality",
  INVENTORY_OWNER_OTHER,
] as const

export type InventoryOwner = (typeof INVENTORY_OWNERS)[number]

export const INVENTORY_NOTES_PLACEHOLDER_DEFAULT =
  "Anything else notable about this item?"

export const INVENTORY_NOTES_PLACEHOLDER_OTHER_OWNER =
  "Who owns this item? Anything else notable about this item?"

export const INVENTORY_ITEMS_BUCKET = "inventory-items"

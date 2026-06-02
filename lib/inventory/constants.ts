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

export const INVENTORY_LOCATIONS: InventoryLocation[] =
  INVENTORY_LOCATION_GROUPS.flatMap((group) => [...group.options])

export const INVENTORY_OWNER_OTHER = "Other" as const

export const INVENTORY_OWNERS = [
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

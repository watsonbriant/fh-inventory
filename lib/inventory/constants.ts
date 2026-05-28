export const INVENTORY_LOCATIONS = [
  "Central Campus",
  "Lake Norman Campus",
] as const

export type InventoryLocation = (typeof INVENTORY_LOCATIONS)[number]

export const INVENTORY_ITEMS_BUCKET = "inventory-items"

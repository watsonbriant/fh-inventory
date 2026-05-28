export type InvItem = {
  uuid: string
  item: string
  description: string | null
  location: string
  image: string | null
  quantity: number
  notes: string | null
}

export type InvItemInput = {
  item: string
  description?: string
  location: string
  quantity: number
  notes?: string
}

export type FormErrors = {
  item?: string
  location?: string
  quantity?: string
}

export type InvItem = {
  uuid: string
  item: string
  description: string | null
  location: string
  room: string | null
  sub_location: string | null
  shelf: string | null
  owner: string
  image: string | null
  quantity: number
  notes: string | null
}

export type InvItemInput = {
  item: string
  description?: string
  location: string
  room?: string
  sub_location?: string
  shelf?: string
  owner: string
  quantity: number
  notes?: string
}

export type FormErrors = {
  item?: string
  location?: string
  quantity?: string
  owner?: string
  notes?: string
}

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { ImageUploadField } from "@/components/inventory/image-upload-field"
import {
  RequiredFieldLabel,
  validateInvItemForm,
} from "@/components/inventory/inv-item-form-utils"
import { InvItemNotesField } from "@/components/inventory/inv-item-notes-field"
import { LocationRoomFields } from "@/components/inventory/location-room-fields"
import { OwnerSelect } from "@/components/inventory/owner-select"
import { QuantityStepper } from "@/components/inventory/quantity-stepper"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { InventoryLocation, InventoryOwner } from "@/lib/inventory/constants"
import { createInvItem } from "@/lib/inventory/create-inv-item"
import type { FormErrors } from "@/lib/types/inv-item"

export function AddItemForm() {
  const router = useRouter()
  const [item, setItem] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [location, setLocation] = React.useState<InventoryLocation | "">("")
  const [room, setRoom] = React.useState("")
  const [owner, setOwner] = React.useState<InventoryOwner | "">("")
  const [quantity, setQuantity] = React.useState(1)
  const [notes, setNotes] = React.useState("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  function validateForm() {
    const nextErrors = validateInvItemForm({
      item,
      location,
      owner,
      quantity,
      notes,
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm() || !location || !owner) {
      return
    }

    setIsSubmitting(true)

    try {
      await createInvItem(
        {
          item,
          description,
          location,
          room,
          owner,
          quantity,
          notes,
        },
        imageFile,
      )

      toast.success("Item added to inventory.")
      router.push("/inventory")
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to add item.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl px-4 lg:px-6">
      <FieldSet>
        <FieldLegend>Add Item</FieldLegend>
        <FieldDescription>Create a new inventory record.</FieldDescription>

        <FieldGroup>
          <Field data-invalid={!!errors.item}>
            <RequiredFieldLabel htmlFor="item">Item</RequiredFieldLabel>
            <Input
              id="item"
              value={item}
              onChange={(event) => setItem(event.target.value)}
              placeholder="Hangers"
              aria-invalid={!!errors.item}
              className="text-sm"
              required
            />
            {errors.item ? <FieldError>{errors.item}</FieldError> : null}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Used for displaying merch in SALT Resources"
              className="text-sm"
              rows={4}
            />
          </Field>

          <LocationRoomFields
            locationId="location"
            roomId="room"
            location={location}
            room={room}
            onLocationChange={setLocation}
            onRoomChange={setRoom}
            errors={errors}
          />

          <OwnerSelect
            id="owner"
            value={owner}
            onValueChange={setOwner}
            errors={errors}
          />

          <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <ImageUploadField value={imageFile} onChange={setImageFile} />
          </Field>

          <Field data-invalid={!!errors.quantity}>
            <RequiredFieldLabel htmlFor="quantity">
              Quantity
            </RequiredFieldLabel>
            <QuantityStepper value={quantity} onChange={setQuantity} />
            {errors.quantity ? (
              <FieldError>{errors.quantity}</FieldError>
            ) : null}
          </Field>

          <InvItemNotesField
            id="notes"
            value={notes}
            onChange={setNotes}
            owner={owner}
            errors={errors}
          />
        </FieldGroup>
      </FieldSet>

      <div className="mt-6 flex flex-row flex-wrap gap-3">
        <Button
          type="submit"
          className="hover-lift flex-1 sm:flex-none sm:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Add Item"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="hover-lift flex-1 sm:flex-none sm:w-auto"
          disabled={isSubmitting}
          onClick={() => router.push("/inventory")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}

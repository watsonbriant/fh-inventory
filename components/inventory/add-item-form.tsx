"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { ImageUploadField } from "@/components/inventory/image-upload-field"
import {
  RequiredFieldLabel,
  validateInvItemForm,
} from "@/components/inventory/inv-item-form-utils"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  INVENTORY_LOCATIONS,
  type InventoryLocation,
} from "@/lib/inventory/constants"
import { createInvItem } from "@/lib/inventory/create-inv-item"
import type { FormErrors } from "@/lib/types/inv-item"

export function AddItemForm() {
  const router = useRouter()
  const [item, setItem] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [location, setLocation] = React.useState<InventoryLocation | "">("")
  const [quantity, setQuantity] = React.useState(1)
  const [notes, setNotes] = React.useState("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  function validateForm() {
    const nextErrors = validateInvItemForm({ item, location, quantity })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!validateForm() || !location) {
      return
    }

    setIsSubmitting(true)

    try {
      await createInvItem(
        {
          item,
          description,
          location,
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

          <Field data-invalid={!!errors.location}>
            <RequiredFieldLabel htmlFor="location">
              Location
            </RequiredFieldLabel>
            <Select
              value={location}
              onValueChange={(value) =>
                setLocation(value as InventoryLocation)
              }
            >
              <SelectTrigger
                id="location"
                className="w-full text-sm"
                aria-invalid={!!errors.location}
              >
                <SelectValue placeholder="Select a storage location" />
              </SelectTrigger>
              <SelectContent>
                {INVENTORY_LOCATIONS.map((campus) => (
                  <SelectItem key={campus} value={campus}>
                    {campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.location ? (
              <FieldError>{errors.location}</FieldError>
            ) : null}
          </Field>

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

          <Field>
            <FieldLabel htmlFor="notes">Notes</FieldLabel>
            <Textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Anything else notable about this item?"
              className="text-sm"
              rows={4}
            />
          </Field>
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

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
import { deleteInvItem, updateInvItem } from "@/lib/inventory/update-inv-item"
import type { FormErrors, InvItem } from "@/lib/types/inv-item"

type EditItemDialogProps = {
  item: InvItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditItemDialog({
  item,
  open,
  onOpenChange,
}: EditItemDialogProps) {
  const router = useRouter()
  const [itemName, setItemName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [location, setLocation] = React.useState<InventoryLocation | "">("")
  const [quantity, setQuantity] = React.useState(1)
  const [notes, setNotes] = React.useState("")
  const [imageFile, setImageFile] = React.useState<File | null>(null)
  const [existingImageRemoved, setExistingImageRemoved] = React.useState(false)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (!item) {
      return
    }

    setItemName(item.item)
    setDescription(item.description ?? "")
    setLocation(item.location as InventoryLocation)
    setQuantity(item.quantity)
    setNotes(item.notes ?? "")
    setImageFile(null)
    setExistingImageRemoved(false)
    setErrors({})
  }, [item])

  function validateForm() {
    const nextErrors = validateInvItemForm({
      item: itemName,
      location,
      quantity,
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!item || !validateForm() || !location) {
      return
    }

    setIsSubmitting(true)

    try {
      await updateInvItem({
        uuid: item.uuid,
        input: {
          item: itemName,
          description,
          location,
          quantity,
          notes,
        },
        imageFile,
        removeImage: existingImageRemoved && !imageFile,
      })

      toast.success("Item updated.")
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to update item.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!item) {
      return
    }

    setIsDeleting(true)

    try {
      await deleteInvItem(item.uuid)
      toast.success("Item deleted.")
      setDeleteDialogOpen(false)
      onOpenChange(false)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete item.",
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
            <DialogDescription>
              View and update this inventory record.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSave}>
            <FieldSet>
              <FieldGroup>
                <Field data-invalid={!!errors.item}>
                  <RequiredFieldLabel htmlFor="edit-item">
                    Item
                  </RequiredFieldLabel>
                  <Input
                    id="edit-item"
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    aria-invalid={!!errors.item}
                    className="text-sm"
                    required
                  />
                  {errors.item ? <FieldError>{errors.item}</FieldError> : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    id="edit-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className="text-sm"
                    rows={4}
                  />
                </Field>

                <Field data-invalid={!!errors.location}>
                  <RequiredFieldLabel htmlFor="edit-location">
                    Location
                  </RequiredFieldLabel>
                  <Select
                    value={location}
                    onValueChange={(value) =>
                      setLocation(value as InventoryLocation)
                    }
                  >
                    <SelectTrigger
                      id="edit-location"
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
                  <FieldLabel htmlFor="edit-image">Image</FieldLabel>
                  <ImageUploadField
                    value={imageFile}
                    onChange={setImageFile}
                    existingImageUrl={item?.image}
                    existingImageRemoved={existingImageRemoved}
                    onRemoveExisting={() => setExistingImageRemoved(true)}
                  />
                </Field>

                <Field data-invalid={!!errors.quantity}>
                  <RequiredFieldLabel htmlFor="edit-quantity">
                    Quantity
                  </RequiredFieldLabel>
                  <QuantityStepper value={quantity} onChange={setQuantity} />
                  {errors.quantity ? (
                    <FieldError>{errors.quantity}</FieldError>
                  ) : null}
                </Field>

                <Field>
                  <FieldLabel htmlFor="edit-notes">Notes</FieldLabel>
                  <Textarea
                    id="edit-notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className="text-sm"
                    rows={4}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>

            <DialogFooter className="mt-6 gap-3 sm:justify-between">
              <Button
                type="button"
                variant="destructive"
                className="hover-lift w-full sm:w-auto"
                disabled={isSubmitting || isDeleting}
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete
              </Button>
              <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="hover-lift"
                  disabled={isSubmitting}
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete item?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove{" "}
              <span className="font-medium text-foreground">
                {item?.item ?? "this item"}
              </span>{" "}
              from inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              className="hover-lift"
              disabled={isDeleting}
              onClick={(event) => {
                event.preventDefault()
                void handleDelete()
              }}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

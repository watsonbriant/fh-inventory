"use client"

import { LocationSelect } from "@/components/inventory/location-select"
import { RequiredFieldLabel } from "@/components/inventory/inv-item-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { LknSubLocationFields } from "@/components/inventory/lkn-sub-location-fields"
import {
  isLakeNormanLocation,
  LKN_SUB_LOCATION_NA,
  type InventoryLocation,
} from "@/lib/inventory/constants"
import type { FormErrors } from "@/lib/types/inv-item"

const ROOM_PLACEHOLDER =
  "(i.e. Ministries Shed, Arrows Classroom)"

type LocationRoomFieldsProps = {
  locationId: string
  roomId: string
  subLocationId: string
  shelfId: string
  location: string
  room: string
  subLocation: string
  shelf: string
  onLocationChange: (value: InventoryLocation) => void
  onRoomChange: (value: string) => void
  onSubLocationChange: (value: string) => void
  onShelfChange: (value: string) => void
  errors?: Pick<FormErrors, "location">
}

export function LocationRoomFields({
  locationId,
  roomId,
  subLocationId,
  shelfId,
  location,
  room,
  subLocation,
  shelf,
  onLocationChange,
  onRoomChange,
  onSubLocationChange,
  onShelfChange,
  errors,
}: LocationRoomFieldsProps) {
  function handleLocationChange(value: InventoryLocation) {
    onLocationChange(value)

    if (!isLakeNormanLocation(value)) {
      onSubLocationChange(LKN_SUB_LOCATION_NA)
      onShelfChange("")
    }
  }

  return (
    <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
      <Field className="md:min-w-0 md:flex-1" data-invalid={!!errors?.location}>
        <RequiredFieldLabel htmlFor={locationId}>Location</RequiredFieldLabel>
        <LocationSelect
          id={locationId}
          value={location}
          onValueChange={(value) =>
            handleLocationChange(value as InventoryLocation)
          }
          aria-invalid={!!errors?.location}
        />
        {errors?.location ? (
          <FieldError>{errors.location}</FieldError>
        ) : null}
      </Field>

      <Field className="md:min-w-0 md:flex-1">
        <FieldLabel htmlFor={roomId}>Room</FieldLabel>
        <Input
          id={roomId}
          value={room}
          onChange={(event) => onRoomChange(event.target.value)}
          placeholder={ROOM_PLACEHOLDER}
          className="text-sm"
        />
      </Field>
    </div>

    {isLakeNormanLocation(location) ? (
      <LknSubLocationFields
        subLocationId={subLocationId}
        shelfId={shelfId}
        subLocation={subLocation}
        shelf={shelf}
        onSubLocationChange={onSubLocationChange}
        onShelfChange={onShelfChange}
      />
    ) : null}
    </div>
  )
}

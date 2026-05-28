"use client"

import * as React from "react"
import { CameraIcon, ImageIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type ImageUploadFieldProps = {
  value: File | null
  onChange: (file: File | null) => void
  existingImageUrl?: string | null
  existingImageRemoved?: boolean
  onRemoveExisting?: () => void
}

export function ImageUploadField({
  value,
  onChange,
  existingImageUrl,
  existingImageRemoved = false,
  onRemoveExisting,
}: ImageUploadFieldProps) {
  const galleryInputRef = React.useRef<HTMLInputElement>(null)
  const cameraInputRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(value)
    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [value])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    onChange(file)
    event.target.value = ""
  }

  const showExistingImage =
    !value && existingImageUrl && !existingImageRemoved

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="hover-lift"
          onClick={() => galleryInputRef.current?.click()}
        >
          <ImageIcon className="size-4" />
          Choose image
        </Button>
        <Button
          type="button"
          variant="outline"
          className="hover-lift"
          onClick={() => cameraInputRef.current?.click()}
        >
          <CameraIcon className="size-4" />
          Take photo
        </Button>
      </div>

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={handleFileChange}
      />

      {previewUrl ? (
        <div className="flex items-start gap-3">
          <img
            src={previewUrl}
            alt="Selected item preview"
            className="hover-lift size-24 rounded-md border object-cover"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
          >
            <XIcon className="size-4" />
            Remove
          </Button>
        </div>
      ) : null}

      {showExistingImage ? (
        <div className="flex items-start gap-3">
          <img
            src={existingImageUrl}
            alt="Current item image"
            className="hover-lift size-24 rounded-md border object-cover"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemoveExisting}
          >
            <XIcon className="size-4" />
            Remove
          </Button>
        </div>
      ) : null}
    </div>
  )
}

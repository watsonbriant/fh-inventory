"use client"

import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
  min?: number
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
}: QuantityStepperProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="hover-lift shrink-0"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <MinusIcon className="size-4" />
      </Button>
      <Input
        type="number"
        min={min}
        value={value}
        readOnly
        aria-label="Quantity"
        className="w-16 px-0 text-center text-sm tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="hover-lift shrink-0"
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  )
}

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface NotificationToggleProps {
  label: string
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export function NotificationToggle({
  label,
  defaultChecked = false,
  onChange,
}: NotificationToggleProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)

  const handleToggle = () => {
    const newValue = !isChecked
    setIsChecked(newValue)
    onChange?.(newValue)
  }

  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-[#2E3A59]">{label}</span>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          isChecked ? "bg-[#2DD49F]" : "bg-gray-300"
        )}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            isChecked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  )
}

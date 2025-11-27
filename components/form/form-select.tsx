"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface FormSelectProps {
  label?: string
  error?: string
  helperText?: string
  containerClassName?: string
  labelClassName?: string
  placeholder?: string
  options: { value: string; label: string }[]
  value?: string
  onValueChange?: (value: string) => void
  required?: boolean
  id?: string
  name?: string
}

export const FormSelect = React.forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName,
      labelClassName,
      placeholder = "Selecione",
      options,
      value,
      onValueChange,
      required,
      id,
      name,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <Label
            htmlFor={id || name}
            className={cn(
              "block text-sm font-semibold text-gray-700 mb-2.5",
              error && "text-red-600",
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}

        {/* Select */}
        <Select value={value} onValueChange={onValueChange}>
          <SelectTrigger
            ref={ref}
            id={id || name}
            className={cn(
              "w-full h-12 rounded-xl border-2 px-4 text-base transition-all",
              "border-gray-200 hover:border-gray-300",
              "focus-visible:border-[#2DD49F] focus-visible:ring-[#2DD49F]/20 focus-visible:ring-[3px]",
              error &&
                "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500"
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${id || name}-error`
                : helperText
                  ? `${id || name}-helper`
                  : undefined
            }
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Error Message */}
        {error && (
          <p
            id={`${id || name}-error`}
            className="mt-2 text-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p id={`${id || name}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = "FormSelect"

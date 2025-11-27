"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
  labelClassName?: string
  showPasswordToggle?: boolean
}

/**
 * Componente de Input reutilizável integrado com shadcn/ui
 *
 * @example
 * ```tsx
 * <FormInput
 *   label="Email"
 *   type="email"
 *   placeholder="seu@email.com"
 *   leftIcon={<Mail className="h-4 w-4" />}
 *   error={errors.email?.message}
 * />
 * ```
 */
export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      containerClassName,
      labelClassName,
      className,
      type = "text",
      showPasswordToggle,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPasswordType = type === "password"
    const shouldShowPasswordToggle = showPasswordToggle ?? isPasswordType

    // Determina o tipo do input baseado no estado de visibilidade da senha
    const inputType = shouldShowPasswordToggle && showPassword ? "text" : type

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <Label
            htmlFor={props.id || props.name}
            className={cn(
              "block text-sm font-semibold text-gray-700 mb-2.5",
              error && "text-red-600",
              labelClassName
            )}
          >
            {label}
          </Label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </span>
          )}

          {/* Input */}
          <Input
            ref={ref}
            type={inputType}
            className={cn(
              "h-12 rounded-xl border-2 px-4 text-base transition-all",
              "border-gray-200 hover:border-gray-300",
              "focus-visible:border-[#2DD49F] focus-visible:ring-[#2DD49F]/20 focus-visible:ring-[3px]",
              "placeholder:text-gray-400",
              leftIcon && "pl-10",
              (rightIcon || shouldShowPasswordToggle) && "pr-10",
              error &&
              "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id || props.name}-error`
                : helperText
                  ? `${props.id || props.name}-helper`
                  : undefined
            }
            {...props}
          />

          {/* Right Icon or Password Toggle */}
          {(rightIcon || shouldShowPasswordToggle) && (
            <span className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {shouldShowPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              ) : (
                <span className="text-gray-400 pointer-events-none">
                  {rightIcon}
                </span>
              )}
            </span>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            id={`${props.id || props.name}-error`}
            className="mt-2 text-sm text-red-600 font-medium"
            role="alert"
          >
            {error}
          </p>
        )}

        {/* Helper Text */}
        {helperText && !error && (
          <p
            id={`${props.id || props.name}-helper`}
            className="mt-1.5 text-sm text-gray-500"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

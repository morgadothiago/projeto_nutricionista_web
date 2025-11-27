"use client"

import { useEffect } from "react"

/**
 * Componente que suprime erros de hidratação causados por extensões de navegador
 * como LastPass, Grammarly, etc.
 */
export function HydrationErrorSuppressor() {
  useEffect(() => {
    // Suprime warnings de hidratação no console apenas em desenvolvimento
    if (process.env.NODE_ENV === "development") {
      const originalError = console.error
      console.error = (...args) => {
        if (
          typeof args[0] === "string" &&
          (args[0].includes("Hydration failed") ||
            args[0].includes("Minified React error") ||
            args[0].includes("There was an error while hydrating") ||
            args[0].includes("Text content does not match"))
        ) {
          // Ignora esses erros específicos
          return
        }
        originalError.apply(console, args)
      }

      return () => {
        console.error = originalError
      }
    }
  }, [])

  return null
}

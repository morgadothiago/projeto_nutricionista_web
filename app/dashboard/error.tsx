"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Dashboard error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E6F9F0] to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#2E3A59]">
              Algo deu errado
            </h1>
            <p className="text-[#6B7280]">
              Ocorreu um erro inesperado. Por favor, tente novamente.
            </p>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="w-full p-4 bg-gray-50 rounded-lg text-left">
              <p className="text-xs text-gray-600 font-mono break-all">
                {error.message}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <Button
              onClick={reset}
              className="flex-1 bg-[#2DD49F] hover:bg-[#24b685] text-white"
            >
              Tentar novamente
            </Button>
            <Button
              onClick={() => window.location.href = "/"}
              variant="outline"
              className="flex-1"
            >
              Voltar ao início
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

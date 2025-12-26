"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Home } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to Sentry if enabled
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((Sentry) => {
        Sentry.captureException(error)
      })
    }
    console.error("Global application error:", error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-[#E6F9F0] to-white flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-8">
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Error Icon */}
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>

              {/* Error Message */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-[#2E3A59]">
                  Ops! Algo deu errado
                </h1>
                <p className="text-[#6B7280] text-lg">
                  Encontramos um erro inesperado. Nossa equipe já foi notificada e
                  estamos trabalhando para resolver.
                </p>
              </div>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === "development" && (
                <div className="w-full p-4 bg-gray-50 rounded-lg text-left space-y-2">
                  <p className="text-sm font-semibold text-gray-700">
                    Detalhes do erro:
                  </p>
                  <p className="text-xs text-gray-600 font-mono break-all">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-gray-500">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full">
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
                  <Home className="w-4 h-4 mr-2" />
                  Ir para home
                </Button>
              </div>

              {/* Support Info */}
              <p className="text-sm text-gray-500">
                Se o problema persistir, entre em contato com o suporte.
              </p>
            </div>
          </Card>
        </div>
      </body>
    </html>
  )
}

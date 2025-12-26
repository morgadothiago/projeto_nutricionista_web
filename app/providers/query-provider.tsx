"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Configurações padrão para queries
            staleTime: 60 * 1000, // 1 minuto
            gcTime: 5 * 60 * 1000, // 5 minutos (anteriormente cacheTime)
            retry: 1, // Tenta 1 vez em caso de erro
            refetchOnWindowFocus: false, // Não refetch ao focar janela
            refetchOnReconnect: true, // Refetch ao reconectar
          },
          mutations: {
            // Configurações padrão para mutations
            retry: 0, // Não retenta mutations por padrão
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools apenas em desenvolvimento */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  )
}

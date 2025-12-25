import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/app/components/providers/session-provider"
import { AuthProvider } from "@/app/contexts/auth-context"
import { Toaster } from "sonner"
import { HydrationErrorSuppressor } from "./components/HydrationErrorSuppressor"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zap Nutre - Nutrição Personalizada",
  description:
    "Cuidar da sua alimentação pode ser mais leve. Planos nutricionais personalizados que se adaptam a você.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suprime erros de hidratação causados por extensões do navegador
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  if (
                    args[0] &&
                    typeof args[0] === 'string' &&
                    (args[0].includes('Hydration') ||
                     args[0].includes('hydrating') ||
                     args[0].includes('Minified React error'))
                  ) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-poppins antialiased bg-background scroll-smooth`}
        suppressHydrationWarning
      >
        <HydrationErrorSuppressor />
        <SessionProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/app/components/providers/session-provider"
import { Toaster } from "sonner"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zap Nutre - Nutrição Personalizada",
  description: "Cuidar da sua alimentação pode ser mais leve. Planos nutricionais personalizados que se adaptam a você.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} font-poppins antialiased bg-[#F0FFF4] scroll-smooth`}
      >
        <SessionProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </SessionProvider>
      </body>
    </html>
  )
}

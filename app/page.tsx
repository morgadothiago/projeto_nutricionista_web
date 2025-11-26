"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/app/contexts/auth-context"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading } = useAuthContext()

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (!isLoading && isAuthenticated && userRole) {
      // Redireciona baseado na role
      if (userRole === "nutricionista") {
        router.push("/dashboard/nutricionista")
      } else if (userRole === "paciente") {
        router.push("/dashboard/paciente")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isLoading, isAuthenticated, userRole, router])
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F0FFF4] via-[#E6F9F0] to-[#D1F5E4]">
      <div className="flex flex-col items-center justify-between min-h-screen mx-auto px-8 py-16 max-w-sm">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/Logo.svg"
            alt="Zap Nutre Logo"
            width={100}
            height={50}
            className="w-20"
            priority
          />
        </div>

        {/* Conteúdo central */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          {/* Texto principal */}
          <div className="text-center mb-10">
            <h1 className="text-[24px] font-bold text-[#2E3A59] leading-snug mb-4 px-2">
              Cuidar da sua alimentação pode ser mais leve.
            </h1>
            <p className="text-[15px] text-[#4B5563] leading-relaxed px-4  font-medium">
              <span className="text-[20px]">
                Aqui, o plano se adapta a você
              </span>{" "}
              <span className="text-[20px]"> e não o contrário.</span>
            </p>
          </div>

          {/* Botão Criar nova conta */}
          <div className="w-full mb-5 px-4">
            <Link href="/cadastro" className="block w-full">
              <Button className="bg-[#2DD49F] hover:bg-[#24b685] w-full h-12 text-[15px] rounded-xl shadow-sm transition-all duration-300 font-medium text-white border-0">
                Criar nova conta
              </Button>
            </Link>
          </div>

          {/* Link Já tenho uma conta */}
          <div className="mb-8">
            <Link href="/login" className="inline-block">
              <span className="text-[#2E3A59] text-[13px] font-normal hover:text-[#2DD49F] transition-colors duration-300 underline">
                Já tenho uma conta
              </span>
            </Link>
          </div>
        </div>

        {/* Imagem do nutricionista */}
        <div className="flex justify-center mb-8">
          <Image
            src="/doctorImg.png"
            alt="Nutricionista"
            width={160}
            height={160}
            className="w-36"
            priority
          />
        </div>
      </div>
    </div>
  )
}

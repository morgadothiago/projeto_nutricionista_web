"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decorativo com gradientes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FFF4] via-[#E6F9F0] to-[#D1F5E4] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center min-h-screen mx-auto px-6 py-12 max-w-md">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/Logo.svg"
            alt="Zap Nutre Logo"
            width={100}
            height={50}
            className="w-24"
            priority
          />
        </div>

        {/* Texto principal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E3A59] leading-tight mb-4">
            Cuidar da sua alimentação pode ser mais leve.
          </h1>
          <p className="text-base text-[#4B5563] leading-relaxed">
            Aqui, o plano se adapta a você e não o contrário.
          </p>
        </div>

        {/* Botão Criar nova conta */}
        <div className="w-full mb-4">
          <Link href="/cadastro" className="block w-full">
            <Button className="bg-[#2DD49F] hover:bg-[#24b685] w-full py-6 text-base rounded-xl shadow-md transition-all duration-300 font-semibold text-white border-0">
              Criar nova conta
            </Button>
          </Link>
        </div>

        {/* Link Já tenho uma conta */}
        <div className="mb-12">
          <Link href="/login" className="inline-block">
            <span className="text-[#22403C] text-sm font-medium hover:text-[#2DD49F] transition-colors duration-300 underline">
              Já tenho uma conta
            </span>
          </Link>
        </div>

        {/* Imagem do nutricionista */}
        <div className="flex justify-center">
          <Image
            src="/doctorImg.png"
            alt="Nutricionista"
            width={180}
            height={180}
            className="w-40"
            priority
          />
        </div>
      </div>
    </div>
  )
}

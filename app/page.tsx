import Image from "next/image"
import Link from "next/link"
import LoginPage from "./login/page"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center h-screen max-w-[431px] mx-auto justify-center space-y-8">
      {/* Logo */}
      <div className="flex flex-col items-center">
        <Image
          src="/Logo.svg"
          alt="Zap Nutre Logo"
          width={100}
          height={50}
          className="w-24 md:w-auto"
          priority
        />
      </div>
      {/* Textos */}
      <div className="text-center max-w-[320px] md:max-w-md lg:max-w-lg">
        <h1 className="text-4xl md:text-4xl w-full bv lg:text-5xl font-bold text-[#2E3A59] leading-tight ">
          Cuidar da sua alimentação pode
          <br />
          ser mais leve.
        </h1>
        <p className="mt-4 text-xl lg:text-xl font-medium text-[#4B5563]">
          Aqui, o plano se adapta a você e não o contrário.
        </p>
      </div>

      {/* Botões */}
      <div className="text-center">
        <Link href="/cadastro">
          <Button className="bg-[#2DD49F] hover:bg-[#24b685] w-full py-6 text-base lg:text-lg rounded-xl shadow-md mb-7">
            Criar nova conta
          </Button>
        </Link>

        <Link href="/login" className="mt-8">
          <span className="text-[#22403C] text-sm lg:text-base hover:opacity-70 cursor-pointer  ">
            Já tenho uma conta
          </span>
        </Link>
      </div>

      {/* Ilustração */}
      <div className="flex justify-center w-full">
        <Image
          src="/doctorImg.png"
          alt="Nutricionista"
          width={180}
          height={180}
          className="w-36 md:w-56 lg:w-64"
          priority
        />
      </div>
    </div>
  )
}

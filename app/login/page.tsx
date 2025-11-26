"use client"

import { FormEvent, useState, useEffect } from "react"
import Link from "next/link"
import { Mail, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import { FormInput } from "@/components/form"
import { TEST_USERS_DISPLAY } from "@/mocks"
import { useAuthContext } from "@/app/contexts/auth-context"
import { useRouter } from "next/navigation"

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true"

export default function LoginPage() {
  const { login, isLoading, isAuthenticated, userRole } = useAuthContext()
  const [showTestUsers, setShowTestUsers] = useState(false)
  const router = useRouter()

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await login({ email, password })

      toast.success("Login realizado com sucesso!", {
        description: "Redirecionando para o dashboard...",
      })
    } catch (error) {
      console.error("Erro no login:", error)
      toast.error("Erro ao fazer login", {
        description: "Email ou senha incorretos. Tente novamente.",
      })
    }
  }

  const quickLogin = async (email: string, password: string) => {
    try {
      await login({ email, password })

      toast.success("Login realizado com sucesso!")
    } catch (error) {
      console.error("Erro no login:", error)
      toast.error("Erro ao fazer login rápido")
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">
      {/* Background decorativo com gradientes - igual à home */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FFF4] via-[#E6F9F0] to-[#D1F5E4] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2DD49F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#24b685]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 px-12">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2DD49F] to-[#24b685] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">N</span>
              </div>
              <span className="text-3xl font-bold text-[#2E3A59]">
                Zap Nutre
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#2E3A59] leading-tight">
              Transforme vidas através da{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD49F] to-[#24b685]">
                nutrição
              </span>
            </h1>
            <p className="text-lg text-[#4B5563]">
              Plataforma completa para gestão nutricional profissional
            </p>
          </div>

          <div className="space-y-4 pt-8">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#2DD49F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-[#2DD49F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#2E3A59]">
                  Gestão Completa
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Gerencie pacientes, consultas e planos alimentares
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#2DD49F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-[#2DD49F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#2E3A59]">
                  Acompanhamento em Tempo Real
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Monitore a evolução dos seus pacientes
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#2DD49F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-[#2DD49F]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#2E3A59]">
                  Dashboard Intuitivo
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Interface moderna e fácil de usar
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center mb-6 space-y-2">
              <div className="inline-flex items-center space-x-3 flex-col items-center justify-center">
                <Image
                  src="/Logo.svg"
                  alt="Zap Nutre Logo"
                  width={30}
                  height={30}
                  className="w-30 h-30"
                  priority
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#2E3A59] mb-2">
                Bem-vindo de volta!
              </h2>
              <p className="text-[#4B5563]">
                Entre com suas credenciais para continuar
              </p>
              {IS_MOCK_MODE && (
                <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  🔧 Modo de Teste Ativo
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <FormInput
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                required
                leftIcon={<Mail className="h-5 w-5" />}
                placeholder="seu@email.com"
                className="py-3 rounded-xl"
              />

              {/* Password Input */}
              <FormInput
                id="password"
                name="password"
                type="password"
                label="Senha"
                autoComplete="current-password"
                required
                leftIcon={<Lock className="h-5 w-5" />}
                placeholder="••••••••"
                showPasswordToggle
                className="py-3 rounded-xl"
              />

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#2DD49F] border-gray-300 rounded focus:ring-[#2DD49F]"
                  />
                  <span className="ml-2 text-gray-600">Lembrar-me</span>
                </label>
                <Link
                  href="/esqueci-senha"
                  className="text-[#2DD49F] hover:text-[#24b685] font-medium transition-colors duration-300"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#2DD49F] to-[#24b685] text-white rounded-xl font-semibold hover:from-[#24b685] hover:to-[#1fa573] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2DD49F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Não tem uma conta?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <Link
              href="/cadastro"
              className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-[#2DD49F] hover:text-[#2DD49F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2DD49F] transition-all duration-300"
            >
              Criar conta gratuita
            </Link>
          </div>

          {/* Test Users - Only in Mock Mode */}
        </div>
      </div>
    </div>
  )
}

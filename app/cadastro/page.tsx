"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, User, Eye, EyeOff, Loader2, Phone } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function CadastroPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<"nutricionista" | "paciente">(
    "paciente"
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validações
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      toast.error("A senha deve ter no mínimo 6 caracteres")
      setLoading(false)
      return
    }

    try {
      // Aqui você faria a chamada para sua API de cadastro
      // Por enquanto, vamos simular um cadastro bem-sucedido

      toast.success("Cadastro realizado com sucesso!", {
        description: "Você será redirecionado para o login.",
      })

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      console.error("Erro no cadastro:", error)
      toast.error("Erro ao criar conta", {
        description: "Tente novamente mais tarde.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background decorativo com gradientes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0FFF4] via-[#E6F9F0] to-[#D1F5E4] pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center min-h-screen mx-auto px-6 py-12 max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/">
            <Image
              src="/Logo.svg"
              alt="Zap Nutre Logo"
              width={100}
              height={50}
              className="w-24"
              priority
            />
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#2E3A59] mb-2">Bem vindo!</h1>
          <p className="text-sm text-[#4B5563]">
            Me fala algumas informações sobre você para que a gente posssa
            começar!
          </p>
        </div>

        {/* Formulário */}
        <div className="w-full">
          {/* User Type Selection */}

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#2E3A59] mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-[#2DD49F] transition-all duration-300 text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#2E3A59] mb-1.5"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-[#2DD49F] transition-all duration-300 text-sm"
                  placeholder="Mínimo 6 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-[#2E3A59] mb-1.5"
              >
                Confirmar senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2DD49F] focus:border-[#2DD49F] transition-all duration-300 text-sm"
                  placeholder="Digite a senha novamente"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-1">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-[#2DD49F] border-gray-300 rounded focus:ring-[#2DD49F] mt-0.5"
              />
              <label className="ml-2 text-xs text-[#4B5563]">
                Eu concordo com os{" "}
                <Link
                  href="/termos"
                  className="text-[#2DD49F] hover:text-[#24b685] font-medium transition-colors duration-300"
                >
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link
                  href="/privacidade"
                  className="text-[#2DD49F] hover:text-[#24b685] font-medium transition-colors duration-300"
                >
                  Política de Privacidade
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2DD49F] hover:bg-[#24b685] py-6 text-base rounded-xl shadow-md transition-all duration-300 font-semibold text-white border-0 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-4 text-center text-sm text-[#4B5563]">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-[#2DD49F] hover:text-[#24b685] font-medium transition-colors duration-300 underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

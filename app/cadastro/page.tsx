"use client"

import { FormEvent, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, Loader2, User, Phone } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form"
import { api, Register } from "../services/api"
import { useAuthContext } from "@/app/contexts/auth-context"

import { RegisterFormData, UserRole } from "@/types"
import { RegisterFormErrors } from "@/types/register"

export default function CadastroPage() {
  const router = useRouter()
  const { isAuthenticated, userRole, isLoading: authLoading } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [userType, setUserType] = useState<UserRole>("paciente")
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (!authLoading && isAuthenticated && userRole) {
      // Redireciona baseado na role
      if (userRole === "nutricionista") {
        router.push("/dashboard/nutricionista")
      } else if (userRole === "paciente") {
        router.push("/dashboard/paciente")
      } else {
        router.push("/dashboard")
      }
    }
  }, [authLoading, isAuthenticated, userRole, router])

  const formatPhone = (value: string): string => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "")

    // Aplica a máscara
    if (numbers.length <= 10) {
      // Formato: (00) 0000-0000
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2")
    } else {
      // Formato: (00) 00000-0000
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)

    // Valida se as senhas coincidem (apenas se confirmPassword já foi preenchido)
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordError("As senhas não são iguais")
    } else {
      setPasswordError("")
    }
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)

    // Valida se as senhas coincidem
    if (password && newConfirmPassword !== password) {
      setPasswordError("As senhas não são iguais")
    } else {
      setPasswordError("")
    }
  }

  const formatPhoneToInternational = (phone: string): string => {
    // Remove tudo que não é número
    const numbers = phone.replace(/\D/g, "")

    // Se já começa com 55, retorna com +
    if (numbers.startsWith("55")) {
      return `+${numbers}`
    }

    // Caso contrário, adiciona +55 (código do Brasil)
    return `+55${numbers}`
  }

  const validateForm = (data: RegisterFormData): RegisterFormErrors => {
    const newErrors: RegisterFormErrors = {}

    // Validação de nome
    if (!data.name || data.name.trim().length < 2) {
      newErrors.name = "Nome deve ter no mínimo 2 caracteres"
    }

    // Validação de telefone
    // const phoneRegex = /^[\d\s\(\)\-\+]+$/
    // if (!data.phone || data.phone.trim().length < 10) {
    //   newErrors.phone = "Telefone inválido"
    // } else if (!phoneRegex.test(data.phone)) {
    //   newErrors.phone = "Telefone deve conter apenas números"
    // }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Email inválido"
    }

    // Validação de senha
    if (data.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres"
    }

    // Validação de confirmação de senha
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem"
    }
    return newErrors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)

    const registerData: RegisterFormData = {
      name: formData.get("name") as string,
      whatsappNumber: formData.get("whatsappNumber") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      role: "paciente",

    }

    console.log(registerData)

    // Validações
    const validationErrors = validateForm(registerData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      // Mostra a primeira mensagem de erro
      const firstError = Object.values(validationErrors)[0]
      toast.error(firstError as string)

      setLoading(false)
      return
    }

    setLoading(false)

    try {
      const response = await api.post("/auth/register", {
        name: registerData.name,
        whatsappNumber: formatPhoneToInternational(registerData.whatsappNumber || phone),
        email: registerData.email,
        password: registerData.password,
        roles: ["paciente"],
      })

      toast.success("Cadastro realizado com sucesso!", {
        description: "Você será redirecionado para o login.",
      })

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error)
      toast.error("Erro ao registrar usuário", {
        description: "Por favor, tente novamente mais tarde.",
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
            {/* Nome */}
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Nome completo"
              required
              leftIcon={<User className="h-4 w-4" />}
              placeholder="Digite seu nome completo"
              className="py-2.5 rounded-xl text-sm bg-white"
              labelClassName="text-xs text-[#2E3A59]"
            />

            {/* Telefone */}
            <FormInput
              id="phone"
              name="whatsappNumber"
              type="tel"
              label="Telefone"
              required
              leftIcon={<Phone className="h-4 w-4" />}
              placeholder="(00) 00000-0000"
              className="py-2.5 rounded-xl text-sm bg-white"
              labelClassName="text-xs text-[#2E3A59]"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={15}
            />

            {/* Email */}
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              required
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="seu@email.com"
              className="py-2.5 rounded-xl text-sm bg-white"
              labelClassName="text-xs text-[#2E3A59]"
            />

            {/* Senha */}
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Senha"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="Mínimo 6 caracteres"
              showPasswordToggle
              className="py-2.5 rounded-xl text-sm bg-white"
              labelClassName="text-xs text-[#2E3A59]"
              helperText={
                !passwordError
                  ? "A senha deve ter no mínimo 6 caracteres"
                  : undefined
              }
              value={password}
              onChange={handlePasswordChange}
              error={passwordError}
            />

            {/* Confirmar Senha */}
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirmar senha"
              required
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="Digite a senha novamente"
              showPasswordToggle
              className="py-2.5 rounded-xl text-sm bg-white"
              labelClassName="text-xs text-[#2E3A59]"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordError}
            />

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

          {/* Link para cadastro de nutricionista */}
          <p className="mt-2 text-center text-sm text-[#4B5563]">
            É nutricionista?{" "}
            <Link
              href="/cadastroDoctor"
              className="text-[#2DD49F] hover:text-[#24b685] font-medium transition-colors duration-300 underline"
            >
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

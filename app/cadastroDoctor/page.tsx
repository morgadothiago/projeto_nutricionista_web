"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Mail,
  Lock,
  Loader2,
  User,
  Phone,
  FileText,
  Briefcase,
} from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form"
import { api } from "../services/api"
import { DoctorRegisterFormData, DoctorRegisterFormErrors } from "@/types"

export default function CadastroDoctorPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<DoctorRegisterFormErrors>({})
  const [phone, setPhone] = useState<string>("")
  const [crn, setCrn] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

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

  const formatCRN = (value: string): string => {
    // Remove tudo que não é número ou letra
    const cleaned = value.replace(/[^0-9A-Za-z]/g, "").toUpperCase()

    // Formato: CRN-X 00000
    if (cleaned.length <= 4) {
      return cleaned
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
    } else {
      return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 9)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  const handleCRNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCRN(e.target.value)
    setCrn(formatted)
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

  const validateForm = (
    data: DoctorRegisterFormData
  ): DoctorRegisterFormErrors => {
    const newErrors: DoctorRegisterFormErrors = {}

    // Validação de nome
    if (!data.name || data.name.trim().length < 2) {
      newErrors.name = "Nome deve ter no mínimo 2 caracteres"
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      newErrors.email = "Email inválido"
    }

    // Validação de telefone
    const phoneRegex = /^[\d\s\(\)\-\+]+$/
    if (!data.phone || data.phone.trim().length < 10) {
      newErrors.phone = "Telefone inválido"
    } else if (!phoneRegex.test(data.phone)) {
      newErrors.phone = "Telefone deve conter apenas números"
    }

    // Validação de CRN
    if (!data.crn || data.crn.trim().length < 5) {
      newErrors.crn = "CRN inválido (formato: CRN-X 00000)"
    }

    // Validação de especialidade
    if (!data.especialidade || data.especialidade.trim().length < 3) {
      newErrors.especialidade = "Especialidade deve ter no mínimo 3 caracteres"
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

    const registerData: DoctorRegisterFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      crn: formData.get("crn") as string,
      especialidade: formData.get("especialidade") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }

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

    try {
      const response = await api.post(
        "/auth/register-doctor",
        {
          name: registerData.name,
          email: registerData.email,
          phone: registerData.phone,
          crn: registerData.crn,
          especialidade: registerData.especialidade,
          password: registerData.password,
          role: "nutricionista",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      toast.success("Cadastro realizado com sucesso!", {
        description: "Você será redirecionado para o login.",
      })

      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      let errorMessage = "Erro ao criar conta. Tente novamente mais tarde."

      // Captura mensagens de erro da API
      if (error.response) {
        // Tenta extrair a mensagem de erro da resposta
        errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          error.response.data?.errors?.[0]?.message ||
          `Erro ${error.response.status}: ${error.response.statusText}`
      } else if (error.request) {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão."
      } else {
        errorMessage = error.message || errorMessage
      }

      setErrors({ general: errorMessage })

      toast.error("Erro ao criar conta", {
        description: errorMessage,
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
          <h1 className="text-2xl font-bold text-[#2E3A59] mb-2">
            Cadastro de Nutricionista
          </h1>
          <p className="text-sm text-[#4B5563]">
            Preencha os dados abaixo para criar sua conta profissional
          </p>
        </div>

        {/* Formulário */}
        <div className="w-full">
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

            {/* Telefone */}
            <FormInput
              id="phone"
              name="phone"
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

            {/* CRN */}
            <FormInput
              id="crn"
              name="crn"
              type="text"
              label="CRN (Conselho Regional de Nutricionistas)"
              required
              leftIcon={<FileText className="h-4 w-4" />}
              placeholder="CRN-3 12345"
              className="py-2.5 rounded-xl text-sm bg-white"
              labelClassName="text-xs text-[#2E3A59]"
              value={crn}
              onChange={handleCRNChange}
              maxLength={11}
              helperText="Formato: CRN-X 00000"
            />

            {/* Especialidade */}
            <FormInput
              id="especialidade"
              name="especialidade"
              type="text"
              label="Especialidade"
              required
              leftIcon={<Briefcase className="h-4 w-4" />}
              placeholder="Ex: Nutrição Clínica, Esportiva, etc."
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
                "Criar conta profissional"
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

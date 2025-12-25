import { DoctorRegisterPayload, RegisterFormData } from "@/types"
import type { AnamneseFormData } from "@/types/anamnese"
import Axios from "axios"


export const api = Axios.create({
  baseURL: "https://back-st1k.onrender.com",
})


/**
 * Realiza o login do usuário
 * @param login - Credenciais de email e senha
 * @returns Promise com a resposta da API contendo user e token
 */
export async function SignIn(login: { email: string; password: string }) {
  return await api.post("/auth/login", {
    email: login.email,
    password: login.password,
  })
}

/**
 * Registra um novo paciente
 * @param register - Dados do formulário de registro
 * @returns Promise com a resposta da API
 */
export async function Register(register: RegisterFormData) {
  // Remove formatação do telefone
  const phoneNumbers = (register.phone || register.whatsappNumber || '').replace(/\D/g, "")
  const internationalPhone = phoneNumbers.startsWith("55")
    ? `+${phoneNumbers}`
    : `+55${phoneNumbers}`

  return await api.post("/auth/register", {
    name: register.name,
    email: register.email,
    password: register.password,
    whatsappNumber: internationalPhone,
    roles: ["paciente"],
  })
}

/**
 * Registra um novo nutricionista
 * @param doctor - Dados do formulário de registro do nutricionista
 * @returns Promise com a resposta da API
 */
export async function RegisterDoctor(doctor: DoctorRegisterPayload) {
  // Remove formatação do telefone
  const phoneNumbers = (doctor.whatsappNumber || '').replace(/\D/g, "")
  const internationalPhone = phoneNumbers.startsWith("55")
    ? `+${phoneNumbers}`
    : `+55${phoneNumbers}`

  return await api.post("/auth/register", {
    name: doctor.name,
    email: doctor.email,
    whatsappNumber: internationalPhone,
    password: doctor.password,
    roles: ["nutricionista"],
  })
}

export async function SubmitAnamnese(data: AnamneseFormData) {
  return await api.post("/anamnese", data)
}

export async function SubmitAnamnesePublic(data: AnamneseFormData) {
  return await api.post("/anamnese/public", data)
}

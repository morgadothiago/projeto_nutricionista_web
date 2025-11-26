import { DoctorRegisterPayload, RegisterFormData } from "@/types"
import Axios from "axios"

// Usa a variável de ambiente ou fallback para localhost:3000
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export const api = Axios.create({
  baseURL: API_URL,
})

// Log para debug
console.log("🔗 API configurada para:", API_URL)

export async function SignIn(login: { email: string; password: string }) {
  await api.post("/auth/login", {
    email: login.email,
    password: login.password,
  })
}

export async function Register(register: RegisterFormData) {
  await api.post("/auth/register", {
    name: register.name,
    email: register.email,
    password: register.password,
    whatsappNumber: register.phone,
  })
}

export async function RegisterDoctor(doctor: DoctorRegisterPayload) {
  await api.post("/auth/register-doctor", {
    name: doctor.name,
    email: doctor.email,
    phone: doctor.phone,
    crn: doctor.crn,
    especialidade: doctor.especialidade,
    password: doctor.password,
    role: "nutricionista",
  })
}

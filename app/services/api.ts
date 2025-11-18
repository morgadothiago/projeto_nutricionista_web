import RegisterFormData from "@/types/register"
import { DoctorRegisterPayload } from "@/types"
import Axios from "axios"

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export async function SignIn(login: { email: string; password: string }) {
  await api.post("/auth/sign-in", {
    email: login.email,
    password: login.password,
  })
}

export async function Register(register: RegisterFormData) {
  await api.post("/auth/sign-up", {
    email: register.email,
    password: register.password,
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

import { DoctorRegisterPayload, RegisterFormData } from "@/types"
import Axios from "axios"


export const api = Axios.create({
  baseURL: "https://back-st1k.onrender.com",
})


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

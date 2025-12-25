/**
 * Tipos relacionados ao cadastro de nutricionistas/doctors
 */

/**
 * Interface para os dados do formulário de cadastro de nutricionista
 */
export interface DoctorRegisterFormData {
  name: string
  email: string
  phone: string
  crn: string // Registro no Conselho Regional de Nutricionistas
  especialidade: string
  password: string
  confirmPassword: string
}

/**
 * Interface para validação do formulário de cadastro de nutricionista
 */
export interface DoctorRegisterFormErrors {
  name?: string
  email?: string
  phone?: string
  crn?: string
  especialidade?: string
  password?: string
  confirmPassword?: string
  general?: string
}

/**
 * Interface para o payload de cadastro de nutricionista enviado à API
 * Nota: O endpoint /auth/register-doctor não existe, usar /auth/register com role
 */
export interface DoctorRegisterPayload {
  name: string
  email: string
  whatsappNumber: string
  crn: string
  especialidade: string
  password: string
  role: "nutricionista"
}

/**
 * Interface para a resposta de cadastro de nutricionista da API
 */
export interface DoctorRegisterResponse {
  id: string
  email: string
  name: string
  phone: string
  crn: string
  especialidade: string
  role: "nutricionista"
  message?: string
  createdAt?: string
}

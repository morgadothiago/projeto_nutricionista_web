import { UserRole } from "./NewAccounts"

/**
 * Interface para os dados do formulário de cadastro
 */
export interface RegisterFormData {
  name: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  role?: UserRole
  whatsappNumber?: string
  crn?: string
  especialidade?: string
}

/**
 * Interface para validação do formulário de cadastro
 */
export interface RegisterFormErrors {
  name?: string
  phone?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

/**
 * Interface para o payload de cadastro enviado à API
 */
export interface RegisterPayload {
  name: string
  phone: string
  email: string
  password: string
  role?: UserRole
  whatsappNumber?: string
  crn?: string
  especialidade?: string
}

/**
 * Interface para a resposta de cadastro da API
 */
export interface RegisterResponse {
  id: string
  email: string
  name?: string
  role: UserRole
  message?: string
}

/**
 * Interface para o estado do formulário de cadastro
 */
export interface RegisterFormState {
  formData: RegisterFormData
  errors: RegisterFormErrors
  isLoading: boolean
  isSubmitted: boolean
}

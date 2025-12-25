/**
 * Tipo que define os papéis de usuário no sistema
 */
export type UserRole = "nutricionista" | "paciente" | "admin";

/**
 * Interface para os dados do formulário de cadastro
 */
export interface RegisterFormData {
  name: string

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
 * Baseado na especificação real da API em /auth/register
 */
export interface RegisterPayload {
  name: string
  email: string
  password: string
  whatsappNumber: string
  roles: UserRole[]  // Array de roles conforme esperado pela API
  crn?: string
  especialidade?: string
}

/**
 * Interface para a resposta de cadastro da API
 */
export interface RegisterResponse {
  id: string
  email: string
  name: string
  numero_whatsapp?: string
  role?: UserRole
  message?: string
  createdAt?: string
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

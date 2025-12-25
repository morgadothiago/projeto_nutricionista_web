import { UserRole } from "./NewAccounts"

/**
 * Interface para os dados de login
 */
interface ILogin {
  email: string
  password: string
}

/**
 * Interface para a resposta de login da API
 * Estrutura real retornada pelo endpoint /auth/login
 */
export interface LoginResponse {
  user: {
    id: string | number
    email: string
    name: string
    role?: UserRole
    roles?: UserRole[] | string
    numero_whatsapp?: string
    createdAt?: string
  }
  access_token?: string
  token?: string
  message?: string
}

/**
 * Interface para erro de login
 */
export interface LoginError {
  message: string
  code?: string
  statusCode?: number
}

export default ILogin

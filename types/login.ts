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
 */
export interface LoginResponse {
  id: string
  email: string
  name: string
  role: UserRole
  token?: string
  accessToken?: string
  refreshToken?: string
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

/**
 * Arquivo central de tipos do projeto
 * Exporta todos os tipos usados no projeto
 */

// Re-exporta tipos do dashboard
export type { MenuItem, MenuSection } from "./dashboard";

// Re-exporta tipos de cadastro (NewAccounts)
export type {
  UserRole,
  RegisterFormData,
  RegisterFormErrors,
  RegisterPayload,
  RegisterResponse,
  RegisterFormState,
} from "./NewAccounts";

// Re-exporta tipos de login
export type { default as ILogin, LoginResponse, LoginError } from "./login";

// Re-exporta tipos de cadastro de doctor/nutricionista
export type {
  DoctorRegisterFormData,
  DoctorRegisterFormErrors,
  DoctorRegisterPayload,
  DoctorRegisterResponse,
} from "./doctorRegister";

// Tipos de usuário
import type { UserRole } from "./NewAccounts";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Tipos de autenticação
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

// Tipos de formulários
export interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

// Tipos de componentes
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export interface InputProps extends BaseComponentProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
}

// Tipos de API
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

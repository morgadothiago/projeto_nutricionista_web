/**
 * Arquivo central de tipos do projeto
 * Exporta todos os tipos usados no projeto
 */

// Re-exporta tipos do dashboard
export type { MenuItem, MenuSection, UserRole } from "./dashboard";
import type { UserRole } from "./dashboard";

// Tipos de usuário
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

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userType: UserRole;
  terms: boolean;
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

"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import type { Session } from "next-auth"
import type { UserRole } from "@/types"

/**
 * Interface do contexto de autenticação
 */
interface AuthContextType {
  // Estado de autenticação
  session: Session | null
  user: Session["user"] | null
  isAuthenticated: boolean
  isLoading: boolean

  // Informações do usuário
  userRole: UserRole | null
  userName: string | null
  userEmail: string | null
  userId: string | null

  // Métodos de autenticação
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>

  // Verificações de permissão
  hasRole: (role: UserRole) => boolean
  isNutricionista: boolean
  isPaciente: boolean

  // Navegação protegida
  redirectIfNotAuthenticated: (redirectTo?: string) => void
  redirectIfNotRole: (requiredRole: UserRole, redirectTo?: string) => void
}

/**
 * Contexto de autenticação
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Props do Provider
 */
interface AuthProviderProps {
  children: React.ReactNode
}

/**
 * Provider de autenticação
 * Envolve a aplicação e fornece o contexto de autenticação
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Atualiza loading state quando a sessão carrega
  useEffect(() => {
    setIsLoading(status === "loading")
  }, [status])

  // Informações derivadas da sessão
  const isAuthenticated = !!session
  const user = session?.user || null
  const userRole = (user?.role as UserRole) || null
  const userName = user?.name || null
  const userEmail = user?.email || null
  const userId = user?.id || null

  const isNutricionista = userRole === "nutricionista"
  const isPaciente = userRole === "paciente"

  /**
   * Realiza login
   */
  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      if (result?.ok) {
        // Login bem-sucedido - força reload completo para atualizar a sessão
        window.location.reload()
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Realiza logout
   */
  const logout = async () => {
    setIsLoading(true)
    try {
      // SignOut do NextAuth sem redirect automático
      await signOut({ redirect: false })

      // Força redirecionamento para login
      router.push("/login")
      router.refresh()
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Verifica se o usuário tem uma role específica
   */
  const hasRole = (role: UserRole): boolean => {
    return userRole === role
  }

  /**
   * Redireciona se não estiver autenticado
   */
  const redirectIfNotAuthenticated = (redirectTo: string = "/login") => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo)
    }
  }

  /**
   * Redireciona se não tiver a role necessária
   */
  const redirectIfNotRole = (
    requiredRole: UserRole,
    redirectTo: string = "/unauthorized"
  ) => {
    if (!isLoading && isAuthenticated && !hasRole(requiredRole)) {
      router.push(redirectTo)
    }
  }

  // Valor do contexto
  const value: AuthContextType = {
    // Estado
    session,
    user,
    isAuthenticated,
    isLoading,

    // Informações do usuário
    userRole,
    userName,
    userEmail,
    userId,

    // Métodos
    login,
    logout,

    // Verificações
    hasRole,
    isNutricionista,
    isPaciente,

    // Navegação
    redirectIfNotAuthenticated,
    redirectIfNotRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Hook para usar o contexto de autenticação
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isAuthenticated, user, logout } = useAuthContext();
 *
 *   if (!isAuthenticated) {
 *     return <div>Por favor, faça login</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <p>Olá, {user?.name}</p>
 *       <button onClick={logout}>Sair</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAuthContext() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider")
  }

  return context
}

/**
 * Hook para proteger componentes que requerem autenticação
 *
 * @example
 * ```tsx
 * function ProtectedComponent() {
 *   const { user } = useRequireAuth();
 *
 *   return <div>Conteúdo protegido para {user.name}</div>;
 * }
 * ```
 */
export function useRequireAuth(options?: {
  redirectTo?: string
  requiredRole?: UserRole
}) {
  const auth = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (auth.isLoading) return

    // Redireciona se não autenticado
    if (!auth.isAuthenticated) {
      router.push(options?.redirectTo || "/login")
      return
    }

    // Redireciona se não tiver a role necessária
    if (options?.requiredRole && !auth.hasRole(options.requiredRole)) {
      router.push("/unauthorized")
    }
  }, [
    auth.isAuthenticated,
    auth.isLoading,
    auth.userRole,
    options?.redirectTo,
    options?.requiredRole,
    router,
  ])

  return auth
}

/**
 * Hook para proteger componentes que requerem role de nutricionista
 */
export function useRequireNutricionista() {
  return useRequireAuth({ requiredRole: "nutricionista" })
}

/**
 * Hook para proteger componentes que requerem role de paciente
 */
export function useRequirePaciente() {
  return useRequireAuth({ requiredRole: "paciente" })
}

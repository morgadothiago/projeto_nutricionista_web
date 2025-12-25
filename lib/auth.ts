import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import type { UserRole } from "@/types"
import { api } from "@/app/services/api"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "seu@email.com",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios")
        }

        try {
          const response = await api.post(
            "/auth/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )

          const { user } = response.data

          if (user && user.id) {
            let role: UserRole = "paciente" // default

            // Tenta extrair a role de diferentes formatos
            if (user.roles) {
              try {
                // Se roles for uma string JSON, faz parse
                if (typeof user.roles === 'string') {
                  const rolesArray = JSON.parse(user.roles)
                  if (Array.isArray(rolesArray) && rolesArray.length > 0) {
                    role = rolesArray[0] as UserRole
                  }
                }
                // Se roles já for um array
                else if (Array.isArray(user.roles) && user.roles.length > 0) {
                  role = user.roles[0] as UserRole
                }
              } catch (e) {
                console.error("Error parsing roles:", e)
              }
            }

            // Se houver um campo role direto (fallback)
            if (user.role) {
              role = user.role as UserRole
            }

            return {
              id: String(user.id),
              email: user.email,
              name: user.name || user.email.split('@')[0],
              role: role,
            }
          }

          // Se a resposta não tiver a estrutura esperada, loga e retorna null
          console.error("Invalid response structure from /auth/login:", response.data)
          return null
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Erro de conexão (backend não está rodando)
            if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
              throw new Error(
                `Não foi possível conectar ao servidor de autenticação. Verifique sua conexão.`
              )
            }

            // Trata mensagens de erro da API
            const errorMessage = error.response?.data?.message
            const errorDetail = error.response?.data?.error
            const statusCode = error.response?.status

            if (statusCode === 401) {
              throw new Error("Email ou senha incorretos")
            }

            if (statusCode === 400) {
              throw new Error(errorMessage || "Dados inválidos")
            }

            if (statusCode === 500) {
              throw new Error("Erro no servidor. Tente novamente mais tarde.")
            }

            throw new Error(errorMessage || errorDetail || "Erro ao fazer login")
          }

          console.error("Unexpected error during login:", error)
          throw new Error("Erro ao conectar com o servidor de autenticação")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user info in the token
      if (user) {
        token.id = user.id as string
        token.email = user.email as string
        token.name = user.name as string
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // Página customizada de login
    error: "/login", // Página de erro
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
}

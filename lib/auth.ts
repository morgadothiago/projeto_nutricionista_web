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
                // Silently handle parse error
              }
            }

            // Se houver um campo role direto (fallback)
            if (user.role) {
              role = user.role as UserRole
            }

            return {
              id: String(user.id),
              email: user.email,
              name: user.name,
              role: role,
            }
          }

          // Se falhar, retorne null
          return null
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Erro de conexão (backend não está rodando)
            if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
              throw new Error(
                `Não foi possível conectar ao servidor de autenticação em ${api.defaults.baseURL}. Verifique se o backend está rodando.`
              )
            }

            const message =
              error.response?.data?.message ||
              error.response?.data?.error ||
              "Credenciais inválidas"
            throw new Error(message)
          }

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

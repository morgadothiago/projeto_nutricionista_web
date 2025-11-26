import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"
import { mockLogin } from "@/mocks"
import type { UserRole } from "@/types"

// Verifica se está em modo local (mock) ou API
const USE_MOCK_AUTH = process.env.USE_MOCK_AUTH === "true"

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
          // MODO LOCAL (MOCK) - Para desenvolvimento e testes
          if (USE_MOCK_AUTH) {
            console.log("🔧 Usando autenticação MOCK (local)")

            const user = await mockLogin(
              credentials.email,
              credentials.password
            )

            if (!user) {
              throw new Error("Credenciais inválidas")
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            }
          }

          // MODO API - Para produção
          console.log("🌐 Usando autenticação via API")
          console.log(
            "📍 URL:",
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`
          )
          console.log("📦 Payload:", {
            email: credentials.email,
            password: "[OCULTA]",
          })

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
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

          console.log("✅ Resposta da API:", response.data)

          const { user } = response.data

          // Se a autenticação for bem-sucedida, retorne o usuário
          if (user && user.id) {
            // A API retorna roles como string JSON: '["paciente"]' ou '["nutricionista"]'
            // Precisamos parsear e pegar o primeiro role
            let role: UserRole = "paciente" // default
            try {
              const rolesArray = JSON.parse(user.roles)
              if (rolesArray && rolesArray.length > 0) {
                role = rolesArray[0] as UserRole
              }
            } catch (e) {
              console.error("Erro ao parsear roles:", e)
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
          console.error("❌ Erro na autenticação:", error)

          if (axios.isAxiosError(error)) {
            console.error("📊 Status:", error.response?.status)
            console.error("📄 Dados do erro:", error.response?.data)
            console.error("🔧 Headers:", error.response?.headers)

            const message =
              error.response?.data?.message ||
              error.response?.data?.error ||
              "Credenciais inválidas"
            throw new Error(message)
          }

          throw new Error("Credenciais inválidas")
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

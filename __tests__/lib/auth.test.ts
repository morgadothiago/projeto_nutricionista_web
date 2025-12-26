/**
 * Tests for authentication utilities
 */

import { loginUser } from "@/lib/auth"

// Mock da API
jest.mock("@/app/services/api", () => ({
  SignIn: jest.fn(),
}))

import { SignIn } from "@/app/services/api"

describe("Auth Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("loginUser", () => {
    it("deve fazer login com credenciais válidas", async () => {
      const mockResponse = {
        data: {
          user: {
            id: "1",
            name: "Test User",
            email: "test@example.com",
            role: "paciente",
          },
          token: "mock-token",
        },
      }

      ;(SignIn as jest.Mock).mockResolvedValue(mockResponse)

      const credentials = {
        email: "test@example.com",
        password: "password123",
      }

      const result = await loginUser(credentials, () => {})

      expect(SignIn).toHaveBeenCalledWith(credentials)
      expect(result).toEqual(mockResponse.data.user)
    })

    it("deve lançar erro com credenciais inválidas", async () => {
      ;(SignIn as jest.Mock).mockRejectedValue({
        response: {
          status: 401,
          data: { message: "Invalid credentials" },
        },
      })

      const credentials = {
        email: "wrong@example.com",
        password: "wrongpassword",
      }

      await expect(loginUser(credentials, () => {})).rejects.toThrow()
    })

    it("deve lançar erro quando email não está verificado", async () => {
      ;(SignIn as jest.Mock).mockRejectedValue({
        response: {
          status: 403,
          data: { message: "Email not verified" },
        },
      })

      const credentials = {
        email: "unverified@example.com",
        password: "password123",
      }

      await expect(loginUser(credentials, () => {})).rejects.toThrow(
        "Email não verificado"
      )
    })
  })
})

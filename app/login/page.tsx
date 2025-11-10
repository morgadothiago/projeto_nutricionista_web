"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const IS_MOCK_MODE = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showTestUsers, setShowTestUsers] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas. Tente novamente.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const testUsers = [
    { email: "nutricionista@nutri.com", password: "nutri123", role: "Nutricionista", name: "Dra. Ana Silva" },
    { email: "nutri2@nutri.com", password: "nutri123", role: "Nutricionista", name: "Dr. Carlos Santos" },
    { email: "paciente@email.com", password: "paciente123", role: "Paciente", name: "João Oliveira" },
    { email: "maria@email.com", password: "paciente123", role: "Paciente", name: "Maria Costa" },
  ];

  const quickLogin = async (email: string, password: string) => {
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciais inválidas. Tente novamente.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Faça login na sua conta
            </h2>
            {IS_MOCK_MODE && (
              <div className="mt-2 text-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  🔧 Modo de Teste (Mock)
                </span>
              </div>
            )}
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
        </div>

        {/* Usuários de Teste - Apenas em modo mock */}
        {IS_MOCK_MODE && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <button
              onClick={() => setShowTestUsers(!showTestUsers)}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                👥 Usuários de Teste
              </h3>
              <span className="text-gray-500">
                {showTestUsers ? "▼" : "▶"}
              </span>
            </button>

            {showTestUsers && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600 mb-3">
                  Clique em um usuário para fazer login automaticamente:
                </p>
                {testUsers.map((user, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 text-sm">
                        <p className="font-bold text-gray-900 mb-1">{user.name}</p>
                        <p className="text-gray-700 mb-1">{user.email}</p>
                        <p className="text-gray-500 mb-2">Senha: {user.password}</p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === "Nutricionista"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <button
                        onClick={() => quickLogin(user.email, user.password)}
                        disabled={loading}
                        className="px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                      >
                        Login Rápido
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    💡 <strong>Dica:</strong> Esta seção só aparece em modo de teste.
                    Para usar sua API real, altere <code className="bg-yellow-100 px-1 py-0.5 rounded">USE_MOCK_AUTH=false</code> no arquivo .env
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { RoleGuard } from "@/components/auth";
import { signOut } from "next-auth/react";

/**
 * Página de exemplos de uso do NextAuth
 * Esta página demonstra diferentes formas de usar a autenticação
 */
export default function ExamplesPage() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Exemplos de Autenticação
          </h1>
          <p className="text-gray-600">
            Esta página demonstra diferentes formas de usar o NextAuth no seu projeto.
          </p>
        </div>

        {/* Exemplo 1: Status de Autenticação */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">1. Status de Autenticação</h2>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  isAuthenticated
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isAuthenticated ? "Autenticado" : "Não Autenticado"}
              </span>
            </p>
            {isAuthenticated && user && (
              <>
                <p className="text-gray-700">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700">
                  <strong>Nome:</strong> {user.name}
                </p>
                <p className="text-gray-700">
                  <strong>ID:</strong> {user.id}
                </p>
                {user.role && (
                  <p className="text-gray-700">
                    <strong>Role:</strong> {user.role}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Exemplo 2: Conteúdo Condicional */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">
            2. Conteúdo Baseado em Autenticação
          </h2>
          {isAuthenticated ? (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-800">
                ✅ Este conteúdo só é visível para usuários autenticados!
              </p>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Fazer Logout
              </button>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-yellow-800">
                ⚠️ Faça login para ver o conteúdo exclusivo
              </p>
            </div>
          )}
        </div>

        {/* Exemplo 3: RoleGuard */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">3. Controle por Role</h2>

          <div className="space-y-3">
            <RoleGuard
              allowedRoles={["admin"]}
              fallback={
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <p className="text-gray-600">
                    🔒 Conteúdo exclusivo para administradores
                  </p>
                </div>
              }
            >
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-blue-800">
                  👑 Você é um administrador! Este conteúdo é exclusivo.
                </p>
              </div>
            </RoleGuard>

            <RoleGuard
              allowedRoles={["admin", "user"]}
              fallback={
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <p className="text-gray-600">🔒 Conteúdo para usuários registrados</p>
                </div>
              }
            >
              <div className="bg-purple-50 border border-purple-200 rounded p-4">
                <p className="text-purple-800">
                  ✨ Você tem acesso a este conteúdo!
                </p>
              </div>
            </RoleGuard>
          </div>
        </div>

        {/* Exemplo 4: Código de Uso */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3">4. Exemplo de Código</h2>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
            {`import { useAuth } from "@/lib/hooks/use-auth";

export default function MyComponent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Faça login</div>;
  }

  return (
    <div>
      Olá, {user.name}!
    </div>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

"use client";

/**
 * Componente de exemplo mostrando como usar o AuthContext
 * Este arquivo serve como referência para implementação
 */

import { useAuthContext, useRequireAuth } from "@/contexts/auth-context";

/**
 * Exemplo 1: Usando o contexto básico
 */
export function BasicAuthExample() {
  const {
    isAuthenticated,
    isLoading,
    user,
    userRole,
    isNutricionista,
    isPaciente,
    logout,
  } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
        <span className="ml-3 text-gray-600">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          Você precisa estar autenticado para ver este conteúdo
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Informações do Usuário</h2>

      <div className="space-y-3">
        <div>
          <span className="font-semibold">Nome:</span> {user?.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user?.email}
        </div>
        <div>
          <span className="font-semibold">Role:</span>{" "}
          <span className="capitalize">{userRole}</span>
        </div>

        {isNutricionista && (
          <div className="p-3 bg-emerald-50 rounded-lg">
            <p className="text-emerald-700 font-medium">
              ✅ Você é um nutricionista
            </p>
          </div>
        )}

        {isPaciente && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-700 font-medium">✅ Você é um paciente</p>
          </div>
        )}
      </div>

      <button
        onClick={logout}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Sair
      </button>
    </div>
  );
}

/**
 * Exemplo 2: Componente protegido
 */
export function ProtectedExample() {
  // Este hook automaticamente redireciona para /login se não estiver autenticado
  const { user, isLoading } = useRequireAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-6 bg-emerald-50 rounded-lg">
      <h2 className="text-xl font-bold text-emerald-900 mb-2">
        Área Protegida
      </h2>
      <p className="text-emerald-700">
        Bem-vindo, {user?.name}! Este conteúdo só é visível para usuários
        autenticados.
      </p>
    </div>
  );
}

/**
 * Exemplo 3: Componente que requer role específica
 */
export function NutricionistaOnlyExample() {
  const { user, isLoading } = useRequireAuth({
    requiredRole: "nutricionista",
  });

  if (isLoading) {
    return <div>Verificando permissões...</div>;
  }

  return (
    <div className="p-6 bg-purple-50 rounded-lg">
      <h2 className="text-xl font-bold text-purple-900 mb-2">
        Área do Nutricionista
      </h2>
      <p className="text-purple-700">
        Olá, Dr(a). {user?.name}! Este conteúdo é exclusivo para
        nutricionistas.
      </p>
    </div>
  );
}

/**
 * Exemplo 4: Renderização condicional baseada em role
 */
export function ConditionalRenderExample() {
  const { isNutricionista, isPaciente, hasRole, userName } = useAuthContext();

  return (
    <div className="p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Dashboard - Olá, {userName}!</h2>

      {isNutricionista && (
        <div className="mb-4 p-4 bg-emerald-100 rounded-lg">
          <h3 className="font-semibold text-emerald-900">
            📊 Painel do Nutricionista
          </h3>
          <ul className="mt-2 space-y-1 text-emerald-700">
            <li>• Gerenciar pacientes</li>
            <li>• Criar planos alimentares</li>
            <li>• Agendar consultas</li>
          </ul>
        </div>
      )}

      {isPaciente && (
        <div className="mb-4 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-blue-900">
            📱 Painel do Paciente
          </h3>
          <ul className="mt-2 space-y-1 text-blue-700">
            <li>• Ver meu plano alimentar</li>
            <li>• Registrar refeições</li>
            <li>• Acompanhar evolução</li>
          </ul>
        </div>
      )}

      {/* Exemplo usando hasRole */}
      {hasRole("nutricionista") && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            💡 Dica: Use hasRole() para verificações customizadas
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Exemplo 5: Componente com loading state
 */
export function LoadingStateExample() {
  const { isLoading, isAuthenticated, user } = useAuthContext();

  // Estado de loading
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mb-4" />
        <p className="text-gray-600 font-medium">Verificando autenticação...</p>
        <p className="text-gray-400 text-sm mt-1">Aguarde um momento</p>
      </div>
    );
  }

  // Não autenticado
  if (!isAuthenticated) {
    return (
      <div className="p-8 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-800 font-semibold mb-2">🔒 Acesso Negado</p>
        <p className="text-red-600 text-sm">
          Você precisa estar autenticado para acessar este conteúdo
        </p>
      </div>
    );
  }

  // Autenticado - mostra conteúdo
  return (
    <div className="p-8 bg-green-50 border border-green-200 rounded-lg text-center">
      <p className="text-green-800 font-semibold mb-2">✅ Acesso Permitido</p>
      <p className="text-green-600">Bem-vindo, {user?.name}!</p>
    </div>
  );
}

"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  fallback?: ReactNode;
}

/**
 * Componente para proteger rotas e verificar permissões
 * @example
 * <ProtectedRoute requiredRole="admin">
 *   <AdminPanel />
 * </ProtectedRoute>
 */
export function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { isLoading, isAuthenticated, user } = useAuth(true);

  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Carregando...</div>
        </div>
      )
    );
  }

  if (!isAuthenticated) {
    return null; // O hook useAuth já redireciona
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Acesso Restrito
          </h2>
          <p className="text-gray-600">
            Você precisa ser {requiredRole} para acessar esta área.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

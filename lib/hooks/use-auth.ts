"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook customizado para autenticação
 * Retorna dados da sessão e utilitários
 */
export function useAuth(requireAuth: boolean = false) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === "loading";
  const isAuthenticated = !!session;

  useEffect(() => {
    if (requireAuth && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [requireAuth, isLoading, isAuthenticated, router]);

  return {
    session,
    user: session?.user,
    status,
    isLoading,
    isAuthenticated,
  };
}

/**
 * Hook para verificar roles/permissões
 */
export function useRequireAuth(options?: {
  redirectTo?: string;
  requiredRole?: string;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push(options?.redirectTo || "/login");
      return;
    }

    if (options?.requiredRole && session.user?.role !== options.requiredRole) {
      router.push("/unauthorized");
    }
  }, [session, status, router, options]);

  return {
    session,
    user: session?.user,
    isLoading: status === "loading",
  };
}

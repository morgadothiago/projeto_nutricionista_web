"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  fallback?: ReactNode;
}

/**
 * Componente para mostrar conteúdo baseado em roles
 * @example
 * <RoleGuard allowedRoles={["admin", "moderator"]}>
 *   <AdminButton />
 * </RoleGuard>
 */
export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { data: session } = useSession();

  if (!session?.user?.role) {
    return <>{fallback || null}</>;
  }

  if (!allowedRoles.includes(session.user.role)) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
}

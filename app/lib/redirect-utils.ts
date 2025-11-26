import { UserRole } from "@/types"

/**
 * Retorna a URL do dashboard apropriado baseado na role do usuário
 *
 * @param role - Role do usuário (nutricionista ou paciente)
 * @returns URL do dashboard específico
 */
export function getDashboardUrl(role: UserRole | null): string {
  if (role === "nutricionista") {
    return "/dashboard/nutricionista"
  } else if (role === "paciente") {
    return "/dashboard/paciente"
  }
  return "/dashboard"
}

import { LucideIcon } from "lucide-react";
import { UserRole } from "./NewAccounts";

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: UserRole[]; // Roles que podem ver este item
  badge?: string | number; // Badge opcional (ex: contador)
}

export interface MenuSection {
  title?: string; // Título da seção (opcional)
  items: MenuItem[];
}

// Re-exporta UserRole para compatibilidade
export type { UserRole };

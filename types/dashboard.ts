import { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles: string[]; // Roles que podem ver este item
  badge?: string | number; // Badge opcional (ex: contador)
}

export interface MenuSection {
  title?: string; // Título da seção (opcional)
  items: MenuItem[];
}

export type UserRole = "nutricionista" | "paciente";

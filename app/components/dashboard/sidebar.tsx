"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight } from "lucide-react";
import { getMenuForRole } from "@/lib/menu-config";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types";

interface SidebarProps {
  userRole: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ userRole, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const menuSections = getMenuForRole(userRole);

  // Define a URL do dashboard baseado na role
  const dashboardUrl = userRole === "nutricionista"
    ? "/dashboard/nutricionista"
    : "/dashboard/paciente";

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header do Sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <Link href={dashboardUrl} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              NutriWeb
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item: MenuItem) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-200"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-white" : "text-gray-400"
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-white" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer do Sidebar - Informação da Role */}
        <div className="p-4 border-t border-gray-200">
          <div className="px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
            <p className="text-xs font-medium text-gray-600">Você está como:</p>
            <p className="text-sm font-bold text-emerald-700 capitalize">
              {userRole}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

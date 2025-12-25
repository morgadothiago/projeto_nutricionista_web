"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
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

  const dashboardUrl = userRole === "nutricionista"
    ? "/dashboard/nutricionista"
    : "/dashboard/paciente";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-border">
          <Link href={dashboardUrl} className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="font-semibold text-lg text-foreground font-poppins">
              ZapNutre
            </span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-poppins">
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
                        "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 font-poppins",
                        isActive
                          ? "gradient-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-destructive text-destructive-foreground rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer - Role Badge */}
        <div className="p-4 border-t border-border">
          <div className="px-4 py-3 bg-accent/20 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground font-poppins">Você está como:</p>
            <p className="text-sm font-bold text-foreground capitalize font-poppins">
              {userRole}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

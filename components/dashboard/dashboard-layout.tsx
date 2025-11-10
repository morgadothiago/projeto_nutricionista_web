"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userName: string;
  userRole: string;
}

export function DashboardLayout({
  children,
  userName,
  userRole,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          userName={userName}
          userRole={userRole}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 lg:px-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

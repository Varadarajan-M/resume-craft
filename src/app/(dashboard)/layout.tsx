import React from "react";

import ThemeSwitch from "@/shared/components/common/ThemeSwitcher";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

import { DashboardSidebar } from "@/features/dashboard-page/components";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex gap-1 items-center justify-between border-b px-6 py-2 mb-4">
          <SidebarTrigger />
          <ThemeSwitch />
        </div>
        <div className="p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

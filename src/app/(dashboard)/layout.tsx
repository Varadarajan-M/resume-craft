import React from "react";

import ThemeSwitch from "@/components/common/theme-switcher";
import { DashboardSidebar } from "@/features/dashboard/components/sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex gap-1 items-center justify-between border-b px-4 py-2 mb-4">
          <SidebarTrigger />
          <ThemeSwitch />
        </div>
        <div className="px-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

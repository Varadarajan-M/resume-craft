import { Files, Grid, LayoutDashboard } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButtonWithActiveIndicator,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ResumeCraftBrand from "@/components/common/brand";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },

  {
    title: "My Documents",
    url: "/documents",
    icon: Files,
  },
  {
    title: "Templates",
    url: "/templates",
    icon: Grid,
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar className="px-3 py-1">
      <SidebarHeader className="p-3">
        <ResumeCraftBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="-ml-0.5">
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButtonWithActiveIndicator path={item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButtonWithActiveIndicator>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* <ThemeSwitch /> */}</SidebarFooter>
    </Sidebar>
  );
}

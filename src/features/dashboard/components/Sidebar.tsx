import { Files, Grid, LayoutDashboard } from "lucide-react";

import FadeInChildren, { FadeIn } from "@/shared/components/animated/FadeIn";
import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";
import UserButton from "@/shared/components/common/UserButton";
import { Button } from "@/shared/components/ui/button";
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
} from "@/shared/components/ui/sidebar";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
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

export default function DashboardSidebar() {
  return (
    <Sidebar className="px-3 py-1">
      <SidebarHeader className="p-3">
        <ResumeCraftBrand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="-ml-0.5">
          <SidebarGroupContent>
            <SidebarMenu>
              <FadeInChildren className="gap-4">
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
              </FadeInChildren>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SignedOut>
          <FadeIn transition={{ delay: 0.2 }}>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </FadeIn>
        </SignedOut>
        <SignedIn>
          <UserButton></UserButton>
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  );
}

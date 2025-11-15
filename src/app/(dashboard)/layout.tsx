import React from 'react';

import { DashboardSidebar } from '@/features/dashboard';
import { FadeIn } from '@/shared/components/animated/FadeIn';
import AuthGuard from '@/shared/components/common/AuthGuard';
import PrefetchRSC from '@/shared/components/common/PrefetchRSC';
import { ThemeSwitch } from '@/shared/components/common/ThemeSwitcher';
import { Button } from '@/shared/components/ui/button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <FadeIn className="flex flex-row gap-1 items-center justify-between border-b px-6 py-2 mb-4 sticky top-0 z-10 bg-background">
          <SidebarTrigger />

          <div className="flex gap-6 items-center">
            <div className="sm:hidden flex">
              <AuthGuard
                signedInContent={<UserButton />}
                signedOutContent={<Button>Sign In</Button>}
              />{' '}
            </div>

            <ThemeSwitch />
          </div>
        </FadeIn>
        <div className="p-6">{children}</div>
      </SidebarInset>
      {/* Client side navigation to builder to prefetch the RSC */}
      <PrefetchRSC path="/builder" />
    </SidebarProvider>
  );
}

"use client";

import FadeInChildren from "@/shared/components/animated/FadeIn";
import ResumeCraftBrand from "@/shared/components/common/ResumeCraftBrand";
import { ThemeSwitch } from "@/shared/components/common/ThemeSwitcher";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MotionNav } from "./MotionComponents";

export function Navigation() {
  return (
    <MotionNav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <ResumeCraftBrand className="text-xl" />
          </div>

          <FadeInChildren
            asProp="div"
            className="flex flex-row items-center gap-4"
          >
            <ThemeSwitch />

            <div className="flex gap-8 items-center">
              <Link href="#templates" className="hidden sm:inline-flex text-sm">
                Templates
              </Link>
              <Link href="#pricing" className="hidden sm:inline-flex text-sm">
                Pricing
              </Link>
              <SignedOut>
                <SignInButton forceRedirectUrl="/" mode="modal">
                  <span className="cursor-pointer bg-foreground text-background hover:bg-foreground/90 p-2 px-4 rounded-md text-sm font-medium transition-colors">
                    Get Started
                  </span>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </FadeInChildren>
        </div>
      </div>
    </MotionNav>
  );
}

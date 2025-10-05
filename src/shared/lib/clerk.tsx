"use client";

import { ClerkProvider as ClProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

interface ClerkProviderProps {
  children: React.ReactNode;
}

const ClerkProvider = ({ children }: ClerkProviderProps) => {
  const { theme } = useTheme();

  return (
    <ClProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
      }}
    >
      {children}
    </ClProvider>
  );
};

export default ClerkProvider;

"use client";

import useLocalStorageState from "@/shared/hooks/useLocalStorageState";
import { safeJsonParse } from "@/shared/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "../ui/button";

type Preferences = {
  theme: "light" | "dark";
};

export const getLocalStorageTheme = () => {
  if (typeof window === "undefined") return null;
  const preferences: { theme: string } | null = localStorage.getItem(
    "preferences"
  )
    ? safeJsonParse(localStorage.getItem("preferences") || "{}")
    : null;

  return preferences?.theme || null;
};

export const ThemeSwitch = () => {
  const { setTheme } = useTheme();
  const [preferences, setPreferences] = useLocalStorageState<Preferences>(
    { theme: "light" },
    "preferences"
  );

  const theme = preferences.theme || "light";

  useEffect(() => {
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
    document.body.classList.add(theme);

    document.documentElement.classList.toggle("dark", theme === "dark");

    setTheme(theme);
  }, [theme, setTheme]);

  if (typeof window == "undefined") return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        setPreferences((prev) => ({
          ...prev,
          theme: prev.theme === "dark" ? "light" : "dark",
        }))
      }
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

"use client";

import useLocalStorageState from "@/shared/hooks/useLocalStorageState";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "../ui/button";

type Preferences = {
  theme: "light" | "dark";
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

    setTheme(theme);
  }, [theme]);

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

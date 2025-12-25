"use client";

import useLocalStorageState from "@/shared/hooks/useLocalStorageState";
import { usePosthog } from "@/shared/hooks/usePosthog";
import { POSTHOG_EVENTS } from "@/shared/lib/constants";
import { safeJsonParse } from "@/shared/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";

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

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { setTheme } = useTheme();
  const { captureEvent } = usePosthog();
  const [preferences, setPreferences] = useLocalStorageState<Preferences>(
    { theme: "light" },
    "resume-craft:preferences"
  );

  const theme = preferences.theme || "light";

  useEffect(() => {
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
    document.body.classList.add(theme);

    document.documentElement.classList.toggle("dark", theme === "dark");

    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <span
      className={className}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setPreferences((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark",
          }));

          captureEvent(POSTHOG_EVENTS.THEME_SWITCHED, {
            newTheme: theme === "dark" ? "light" : "dark",
          });
        }
      }}
      onClick={() => {
        setPreferences((prev) => ({
          ...prev,
          theme: prev.theme === "dark" ? "light" : "dark",
        }));

        captureEvent(POSTHOG_EVENTS.THEME_SWITCHED, {
          newTheme: theme === "dark" ? "light" : "dark",
        });
      }}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 hover:text-foreground/60" />
      ) : (
        <Moon className="h-4 w-4 hover:text-foreground/60" />
      )}
    </span>
  );
};

"use client";

import { Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

export const ThemeSwitch = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedPreferences = JSON.parse(
        localStorage.getItem("preferences") || "{}"
      );
      return storedPreferences.theme || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
    document.body.classList.add(theme);

    const updatedPreferences = {
      ...JSON.parse(localStorage.getItem("preferences") || "{}"),
      theme,
    };
    localStorage.setItem("preferences", JSON.stringify(updatedPreferences));
  }, [theme]);

  if (typeof window == "undefined") return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
};

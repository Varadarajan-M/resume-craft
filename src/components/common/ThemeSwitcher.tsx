"use client";

import { Moon, Sun } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../ui/button";

const ThemeSwitch = () => {
  const [theme, setTheme] = React.useState("light");

  useEffect(() => {
    const currentTheme = document.body.classList.contains("dark")
      ? "dark"
      : "light";

    if (currentTheme !== theme) {
      document.body.classList.remove(currentTheme);
      document.body.classList.add(theme);
    }
  }, [theme]);

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

export default ThemeSwitch;

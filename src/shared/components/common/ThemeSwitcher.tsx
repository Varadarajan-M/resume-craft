'use client';

import useLocalStorageState from '@/shared/hooks/useLocalStorageState';
import { safeJsonParse } from '@/shared/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

type Preferences = {
  theme: 'light' | 'dark';
};

export const getLocalStorageTheme = () => {
  if (typeof window === 'undefined') return null;
  const preferences: { theme: string } | null = localStorage.getItem(
    'preferences'
  )
    ? safeJsonParse(localStorage.getItem('preferences') || '{}')
    : null;

  return preferences?.theme || null;
};

export const ThemeSwitch = ({ className }: { className?: string }) => {
  const { setTheme } = useTheme();
  const [preferences, setPreferences] = useLocalStorageState<Preferences>(
    { theme: 'light' },
    'preferences'
  );

  const theme = preferences.theme || 'light';

  useEffect(() => {
    document.body.classList.remove(theme === 'dark' ? 'light' : 'dark');
    document.body.classList.add(theme);

    document.documentElement.classList.toggle('dark', theme === 'dark');

    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <span
      className={className}
      role="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={() =>
        setPreferences((prev) => ({
          ...prev,
          theme: prev.theme === 'dark' ? 'light' : 'dark',
        }))
      }
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 hover:text-foreground/60" />
      ) : (
        <Moon className="h-4 w-4 hover:text-foreground/60" />
      )}
    </span>
  );
};

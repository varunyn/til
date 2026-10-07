"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange={false}
      enableSystem
      storageKey="theme"
      suppressHydrationWarning
    >
      {children}
    </ThemeProvider>
  );
}

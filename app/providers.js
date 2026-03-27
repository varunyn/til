"use client";

import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";

export function Providers({ children }) {
  return (
    <ViewTransitions>
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
    </ViewTransitions>
  );
}

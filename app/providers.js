"use client";

import { ThemeProvider } from "next-themes";
import { ViewTransitions } from "next-view-transitions";

export function Providers({ children }) {
  return (
    <ViewTransitions>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange={false}
        enableSystem={false}
        storageKey="theme"
        suppressHydrationWarning
      >
        {children}
      </ThemeProvider>
    </ViewTransitions>
  );
}

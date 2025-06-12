'use client';

import { ThemeProvider } from 'next-themes';
import { ViewTransitions } from 'next-view-transitions';

export function Providers({ children }) {
  return (
    <ViewTransitions>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
        storageKey="theme"
        suppressHydrationWarning
      >
        {children}
      </ThemeProvider>
    </ViewTransitions>
  );
}

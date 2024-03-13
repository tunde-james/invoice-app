"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}

export default ThemeProvider;

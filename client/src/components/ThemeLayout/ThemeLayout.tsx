"use client";

import { ReactNode, useEffect } from "react";
import { useTheme } from "@/hooks/contexts/useTheme";

export default function ThemeLayout({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <>{children}</>;
}

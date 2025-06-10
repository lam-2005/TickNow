"use client";
import React from "react";
import { ThemeProvider } from "./useTheme";
import { StageProvider } from "./useStage";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <StageProvider>{children}</StageProvider>
    </ThemeProvider>
  );
};

export default AppProvider;

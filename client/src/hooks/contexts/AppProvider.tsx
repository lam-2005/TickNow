"use client";
import React from "react";
import { ThemeProvider } from "./useTheme";
import { StageProvider } from "./useStage";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <StageProvider>{children}</StageProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProvider;

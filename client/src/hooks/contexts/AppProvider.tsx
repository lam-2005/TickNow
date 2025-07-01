"use client";
import React from "react";
import { ThemeProvider } from "./useTheme";
import { StageProvider } from "./useStage";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";
import { ToastProvider } from "./useToast";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ToastProvider>
        <ThemeProvider>
          <StageProvider>{children}</StageProvider>
        </ThemeProvider>
      </ToastProvider>
    </Provider>
  );
};

export default AppProvider;

"use client";
import React from "react";
import { ThemeProvider } from "./useTheme";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";
import { AuthProvider } from "./useAuth";

const AppProvider = ({
  children,
  initToken,
}: {
  children: React.ReactNode;
  initToken?: string;
}) => {
  return (
    <Provider store={store}>
      <AuthProvider initToken={initToken}>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AppProvider;

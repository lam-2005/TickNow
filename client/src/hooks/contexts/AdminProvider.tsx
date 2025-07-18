"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";
import { ToggleNavProvider } from "./ToggleNavContext";
import { AuthProvider } from "./useAuth";

const AdminProvider = ({
  children,
  initAdminToken,
}: {
  children: React.ReactNode;
  initAdminToken?: string;
}) => {
  return (
    <Provider store={store}>
      <AuthProvider initAdminToken={initAdminToken}>
        <ToggleNavProvider>{children}</ToggleNavProvider>
      </AuthProvider>
    </Provider>
  );
};

export default AdminProvider;

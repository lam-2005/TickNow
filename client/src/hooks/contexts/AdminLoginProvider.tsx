"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";
import { AuthProvider } from "./useAuth";

const AdminLoginProvider = ({
  children,
  initAdminToken,
}: {
  children: React.ReactNode;
  initAdminToken?: string;
}) => {
  return (
    <Provider store={store}>
      <AuthProvider initAdminToken={initAdminToken}>{children}</AuthProvider>
    </Provider>
  );
};

export default AdminLoginProvider;

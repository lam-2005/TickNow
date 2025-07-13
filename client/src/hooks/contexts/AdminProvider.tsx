"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";
import { ToggleNavProvider } from "./ToggleNavContext";

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ToggleNavProvider>{children}</ToggleNavProvider>
    </Provider>
  );
};

export default AdminProvider;

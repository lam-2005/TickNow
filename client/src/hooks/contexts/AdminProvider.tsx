"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "@/utils/redux/store";

const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AdminProvider;

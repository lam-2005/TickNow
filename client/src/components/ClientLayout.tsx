// components/ClientLayout.tsx
"use client";
import { ReactNode } from "react";
import Navbar from "@/admin_components/Navbar/Navbar";
import Header from "@/admin_components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      <main className="w-full">
        <Header />
        {children}
      </main>
    </Provider>
  );
}

import type { Metadata } from "next";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/admin_components/Navbar/Navbar";
import Header from "@/admin_components/Header/Header";
import AdminProvider from "@/hooks/contexts/AdminProvider";
import { ToastContainer } from "react-toastify";
import { cookies } from "next/headers";

const beVietNamPro = Be_Vietnam_Pro({
  weight: ["300", "700"],
  variable: "--font-be-vietnam-pro-sans",
  subsets: ["latin", "vietnamese"],
});

const oswald = Oswald({
  weight: ["200", "700"],
  variable: "--font-oswald-sans",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "TickNow - Website đặt vé xem phim",
  description: "Website đặt vé xem phim",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const tokenAdmin = (await cookieStore).get("tokenAdmin")?.value;
  return (
    <html lang="vi">
      <body
        className={`${beVietNamPro.variable} ${oswald.variable} antialiased `}
      >
        <AdminProvider initAdminToken={tokenAdmin}>
          <ToastContainer />
          <Navbar />

          <main className="w-full">
            <Header />
            {children}
          </main>
        </AdminProvider>
      </body>
    </html>
  );
}

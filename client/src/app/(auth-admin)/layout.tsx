import type { Metadata } from "next";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import "@/app/(admin)/globals.css";
import { cookies } from "next/headers";
import AdminLoginProvider from "@/hooks/contexts/AdminLoginProvider";
import { ToastContainer } from "react-toastify";
import NextTopLoader from "nextjs-toploader";
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
  title: "Đăng nhập vào trang quản trị",
  description: "Đăng nhập vào trang quản trị",
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
        <AdminLoginProvider initAdminToken={tokenAdmin}>
          <NextTopLoader showSpinner={false} />
          <ToastContainer />
          <main className="w-full flex-center">{children}</main>
        </AdminLoginProvider>
      </body>
    </html>
  );
}

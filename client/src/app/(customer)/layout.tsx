import type { Metadata } from "next";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import "@/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ThemeLayout from "@/components/ThemeLayout/ThemeLayout";
import AppProvider from "@/hooks/contexts/AppProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ToastContainer } from "react-toastify";
import ClearTicketOnRouteChange from "@/components/CLearRouterChange/ClearRouterChange";
import { cookies } from "next/headers";
import GoToTopButton from "@/components/Button/GoToTopBtn";
import ChatbotBtn from "@/components/Button/ChatbotBtn";
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
  title: {
    default: "TickNow - Website đặt vé xem phim",
    template: "%s | TickNow",
  },
  description:
    "TickNow là nền tảng đặt vé xem phim trực tuyến hiện đại, cho phép bạn dễ dàng tìm kiếm, chọn rạp và đặt vé nhanh chóng.",
  keywords: [
    "TickNow",
    "đặt vé phim",
    "mua vé xem phim",
    "rạp chiếu phim",
    "phim đang chiếu",
    "phim sắp chiếu",
    "lịch chiếu phim",
  ],
  authors: [{ name: "TickNow Team" }],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  return (
    <html lang="vi">
      <body
        className={`${beVietNamPro.variable} ${oswald.variable} antialiased`}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <AppProvider initToken={token}>
            <ThemeLayout>
              <ToastContainer theme="dark" />
              <ClearTicketOnRouteChange />
              <Header />
              <ChatbotBtn />
              <GoToTopButton />
              <main className="">{children}</main>
              <Footer />
            </ThemeLayout>
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

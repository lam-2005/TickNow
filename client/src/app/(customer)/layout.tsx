import type { Metadata } from "next";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import "@/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import AOSConfig from "@/configs/aos.config";
import ThemeLayout from "@/components/ThemeLayout/ThemeLayout";
import AppProvider from "@/hooks/contexts/AppProvider";
// import { usePathname } from "next/navigation";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${beVietNamPro.variable} ${oswald.variable} antialiased`}
      >
        <AppProvider>
          <ThemeLayout>
            <AOSConfig />
            <Header />
            <main className="">{children}</main>
            <Footer />
          </ThemeLayout>
        </AppProvider>
      </body>
    </html>
  );
}

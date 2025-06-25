import type { Metadata } from "next";
import { Be_Vietnam_Pro, Oswald } from "next/font/google";
import "@/app/(admin)/globals.css";

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
        className={`${beVietNamPro.variable} ${oswald.variable} antialiased `}
      >
        <main className="w-full flex-center">{children}</main>
      </body>
    </html>
  );
}

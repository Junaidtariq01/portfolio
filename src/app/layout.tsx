import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const local = LocalFont({
  src: [
    {
      path: "../../public/fonts/light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/extrabold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-local",
});
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Aasif's Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={local.className}>
      <body>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

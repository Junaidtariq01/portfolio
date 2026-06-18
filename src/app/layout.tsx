import LocalFont from "next/font/local";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import "./globals.css";


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


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Junaid Tariq's - Portfolio",
  icons:{
    icon: "/logo2.png ",
  },
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

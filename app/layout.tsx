import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "../public/fonts/Fraunces-600.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Fraunces-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
});

const generalSans = localFont({
  variable: "--font-general-sans",
  src: [
    { path: "../public/fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LarkAI",
  description: "Real-time AI interview copilot",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${generalSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

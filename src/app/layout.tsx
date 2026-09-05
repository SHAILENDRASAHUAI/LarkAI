import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const generalSans = localFont({
  src: [{ path: "../../public/fonts/GeneralSans-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-general-sans",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const fraunces = localFont({
  src: [
    { path: "../../public/fonts/Fraunces-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Fraunces-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://larkai.app"),
  title: "LarkAI — Real-time interview confidence, grounded in your resume",
  description:
    "LarkAI listens during your live interview and privately suggests answers based on your resume. Try it free.",
  openGraph: {
    title: "LarkAI — Real-time interview confidence, grounded in your resume",
    description:
      "LarkAI listens during your live interview and privately suggests answers based on your resume. Try it free.",
    images: [
      {
        url: "/og/larkai-og.svg",
        width: 1200,
        height: 630,
        alt: "LarkAI dawn gradient hero with lark silhouette and wordmark",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${generalSans.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { GlobalClickSound } from "@/components/global-click-sound";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meecanico — Mechanical Keyboard Sounds for Mac",
  description:
    "Free macOS menu bar app. 19 switch profiles, spatial audio, zero keystroke logging.",
  metadataBase: new URL("https://getmeecanico.com"),
  openGraph: {
    title: "Meecanico — Mechanical Keyboard Sounds for Mac",
    description:
      "Free macOS menu bar app. 19 switch profiles, spatial audio, zero keystroke logging.",
    url: "https://getmeecanico.com",
    siteName: "Meecanico",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#24B4FC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <GlobalClickSound />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

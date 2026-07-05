import type { Metadata, Viewport } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meecanico — Mechanical Keyboard Sounds for Mac",
  description:
    "Native macOS menu bar app. 19 switch profiles, 3D spatial audio, optional WPM HUD. Key codes only — never your typed text. Free download.",
  metadataBase: new URL("https://getmeecanico.com"),
  openGraph: {
    title: "Meecanico — Mechanical Keyboard Sounds for Mac",
    description:
      "Native macOS menu bar app. 19 switch profiles, 3D spatial audio, optional WPM HUD. Key codes only — never your typed text.",
    url: "https://getmeecanico.com",
    siteName: "Meecanico",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E60FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${figtree.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

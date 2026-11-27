import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Playfair_Display, Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Grain from "./components/Grain";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: "400",
  style: "italic",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bintang Anandhiya — Portfolio",
  description: "Designer-Engineer. Building bridges between design & execution.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Bintang Anandhiya",
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Grain />
      </body>
    </html>
  );
}

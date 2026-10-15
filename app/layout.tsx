import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Al Monte | Luxury Real Estate Dubai",
  description: "Curated portfolio of prime Dubai residences, penthouses, and private beachfront villas. Ideal for living and investing.",
  keywords: ["Dubai Real Estate", "Luxury Penthouses Dubai", "Palm Jumeirah Villas", "Al Monte Real Estate", "Dubai Golden Visa Investment"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#121212] selection:bg-[#121212] selection:text-white">
        {children}
      </body>
    </html>
  );
}

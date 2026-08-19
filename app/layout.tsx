import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FF6B00", // Primary brand accent color
};

export const metadata: Metadata = {
  title: {
    default: "Chef's Zone | Culinary Discovery & Homemade Recipes",
    template: "%s | Chef's Zone",
  },
  description:
    "Discover, curate, and share authentic homemade recipes from African, Intercontinental, and Dessert cuisines around the world.",
  keywords: [
    "recipes",
    "cooking",
    "homemade meals",
    "African food",
    "Nigerian recipes",
    "intercontinental dishes",
    "desserts",
    "Chef's Zone",
  ],
  authors: [{ name: "Chef's Zone Team" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar user={user} />
        {children}
      </body>
    </html>
  );
}
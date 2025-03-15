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
  title: "berkod.dev | Creative Portfolio",
  description: "A creative portfolio showcasing projects and skills with an artistic flair.",
  keywords: ["portfolio", "creative", "3D", "web development", "design"],
  authors: [{ name: "Berk Logun" }],
  creator: "berkod.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        {children}
      </body>
    </html>
  );
}

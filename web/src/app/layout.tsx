import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "../config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pictionary Proof",
  description:
    "Pick, draw, guess, and have fun in groups of any size! - Using Zero Knowledge Proof to ensure fairness and privacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header title={metadata.title?.toString()} />
      <body className={inter.className}>{children}</body>
    </html>
  );
}

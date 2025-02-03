"use client";

import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-950`}
      >
        <QueryClientProvider client={queryClient}>
          <div className="w-full h-screen ">
            <Header />
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import React from "react";
import { AuthProvider } from "/src/app/authContext";
import AuthGuard from "/src/app/authGuard";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Protek",
  description: "Protek is a vehicle management system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Protek</title>
      </Head>
      <body className={`bg-white min-h-screen ${inter.className}`}>
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Protek",
  description: "Protek is a vehicle management system.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.ico" sizes="any" />
        <title>Protek</title>
      </head>
      <body className={`bg-white min-h-screen ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}

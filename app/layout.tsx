import { Josefin_Sans } from "next/font/google";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";

const josefin_sans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InSpace Community App",
  description: "Connect Local Businesses with Students for Internship",
};

export default function RootLayout({ children }) {
  return (
    <NuqsAdapter>
      <Providers>
        <html lang="en">
          <body className={`${josefin_sans.variable} antialiased`}>
            <nav className="flex gap-2 justify-end items-center h-18 px-5">
              <Link href="/">Home</Link>
              <Link href="/catalog">Catalog</Link>
              <Link href="/auth/login">Login</Link>
            </nav>
            {children}
          </body>
        </html>
      </Providers>
    </NuqsAdapter>
  );
}

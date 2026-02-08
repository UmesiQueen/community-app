import { Inter } from "next/font/google";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserAvatar,
} from "@clerk/nextjs";
import type { Metadata } from "next";
import Providers from "./providers";

const baseFont = Inter({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Community App",
  description: "Connect Local Businesses with Students for Internship",
};

export default function RootLayout({ children }) {
  return (
    <NuqsAdapter>
      <Providers>
        <html lang="en">
          <body className={`${baseFont.variable} antialiased`}>
            <nav className="flex gap-2 justify-end items-center h-18 px-5">
              <Link href="/">Home</Link>
              <Link href="/catalog">Catalog</Link>
              <SignedOut>
                <SignInButton />
                <SignUpButton>
                  <button
                    type="button"
                    className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer"
                  >
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <Link href={"/dashboard"}>
                  <UserAvatar />
                </Link>
              </SignedIn>
            </nav>
            {children}
          </body>
        </html>
      </Providers>
    </NuqsAdapter>
  );
}

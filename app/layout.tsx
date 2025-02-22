import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from '@/components/AuthProvider'
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth.config'
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getSession() {
  const session = await getServerSession(authOptions)
  return session
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession()

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

        <Script src="https://pro.fontawesome.com/releases/v5.15.0/js/all.js" />
      </head>
      <body className="bg-[#1e2124] text-white text-[.9rem]">
        <AuthProvider session={session}>
          <Navbar />
            <div className="container max-w-6xl mx-auto">
              <div className="relative flex flex-col px-6 lg:px-0 bg-transparent w-full min-h-screen">
                <div className="relative pt-[50px]">
                  {children}
                </div>
              </div>
            </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

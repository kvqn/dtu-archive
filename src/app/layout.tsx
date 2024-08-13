import { Footer } from "@/components/Footer"
import { SmallGridBackground } from "@/components/GridBackground"
import { Navbar } from "@/components/navbar"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import "@/styles/globals.css"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Toaster } from "react-hot-toast"

import ContextProvider from "./providers"

type LayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "DTU Archive",
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <html
      className={`${GeistSans.variable} ${GeistMono.variable} font-geist-sans`}
    >
      <head />
      <body className="flex h-screen flex-col">
        <SmallGridBackground></SmallGridBackground>
        <ContextProvider session={session}>
          <Navbar />
          {children}
        </ContextProvider>
        <Toaster />
      </body>
    </html>
  )
}

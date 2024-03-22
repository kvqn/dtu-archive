import { Footer } from "@/components/Footer"
import { SmallGridBackground } from "@/components/GridBackground"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { getServerSession } from "next-auth"
import { Toaster } from "react-hot-toast"

import ContextProvider from "./providers"

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <html className={`${GeistSans.variable}`}>
      <head />
      <body>
        <SmallGridBackground></SmallGridBackground>
        <ContextProvider session={session}>{children}</ContextProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  )
}

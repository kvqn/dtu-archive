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
        <ContextProvider session={session}>
          <main>{children}</main>
        </ContextProvider>
        <Toaster />
      </body>
    </html>
  )
}

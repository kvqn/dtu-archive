import { authOptions } from "@/pages/api/auth/[...nextauth]"
import "@/styles/globals.css"
import { getServerSession } from "next-auth"
import { Toaster } from "react-hot-toast"

import SessionProvider from "./SessionProvider"

type LayoutProps = {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions)
  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          <main>{children}</main>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}

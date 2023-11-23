"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

export default function ContextProvider({ children, session }: any) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </SessionProvider>
  )
}

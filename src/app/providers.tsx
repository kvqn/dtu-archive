"use client"

import { SessionProvider } from "next-auth/react"
import NextAdapterApp from "next-query-params/app"
import { ThemeProvider } from "next-themes"
import { QueryParamProvider } from "use-query-params"

export default function ContextProvider({ children, session }: any) {
  return (
    <SessionProvider session={session}>
      {/* @ts-ignore */}
      <ThemeProvider defaultTheme="light" attribute="class">
        <QueryParamProvider adapter={NextAdapterApp}>
          {children}
        </QueryParamProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

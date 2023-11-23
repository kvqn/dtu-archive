import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

import "../styles/globals.css"

config.autoAddCss = false

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="h-screen">
      <SessionProvider session={pageProps.session}>
        <ThemeProvider defaultTheme={"light"}>
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </div>
  )
}

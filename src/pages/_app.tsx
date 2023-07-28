import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"

import "../styles/globals.css"

config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <ThemeProvider defaultTheme={"light"}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  )
}

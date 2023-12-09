import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { useRouter } from "next/router"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { useEffect } from "react"

import { env } from "../env.mjs"
import "../styles/globals.css"

config.autoAddCss = false

if (typeof window !== "undefined") {
  posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (env.NODE_ENV === "development") posthog.debug()
    },
  })
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview")
    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  return (
    <div className="h-screen">
      <SessionProvider session={pageProps.session}>
        <ThemeProvider defaultTheme={"light"}>
          <PostHogProvider client={posthog}>
            <Component {...pageProps} />
          </PostHogProvider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  )
}

import { AppProps } from "next/app"
import { GoogleAnalytics } from "nextjs-google-analytics"
import "../styles/globals.css"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <Component {...pageProps} />
      <GoogleAnalytics />
    </div>
  )
}

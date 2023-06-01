import "../styles/globals.css"
import { AppProps } from "next/app"
import Navbar from "@/components/Navbar"

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <Component {...pageProps} />
  </>
  )
}

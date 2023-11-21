import { Toaster } from "react-hot-toast"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head />
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

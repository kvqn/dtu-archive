import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar left={[<NavbarItem name="Admin Console" key={1} />]} />
      {children}
    </div>
  )
}

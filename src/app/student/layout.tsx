import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Navbar
        left={[<NavbarItem key="/student" name="Student" href="/student" />]}
      />
      {children}
    </div>
  )
}

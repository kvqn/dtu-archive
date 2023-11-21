import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import prisma from "@/prisma"

export default async function Page() {
  const pyqs = await prisma.pyq.findMany()
  return (
    <>
      <Navbar left={[<NavbarItem name="PYQs" href="/pyqs" key="/pyqs" />]} />
      {JSON.stringify(pyqs)}
    </>
  )
}

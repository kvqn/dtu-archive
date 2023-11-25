import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { useServerSession } from "@/lib/utils"
import prisma from "@/prisma"
import { isAllowedToUpload } from "@/server/isAllowedToUpload"

import { PDFSelector } from "./PYQSelector"

export default async function Page() {
  const PYQs = await prisma.pyq.findMany({
    include: {
      uploadedBy: true,
    },
  })

  const session = await useServerSession()
  const show_upload = await isAllowedToUpload(session)

  return (
    <>
      <Navbar left={[<NavbarItem name="PYQs" href="/pyqs" key="/pyqs" />]} />
      <PDFSelector PYQs={PYQs} show_upload={show_upload} />
    </>
  )
}

import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { useServerSession } from "@/lib/utils"
import prisma from "@/prisma"
import { isAllowedToUpload } from "@/server/isAllowedToUpload"
import { useSession } from "next-auth/react"
import Link from "next/link"

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
      <div className="flex justify-end">
        {show_upload && (
          <Link
            href="/pyqs/upload"
            className="mx-8 my-4 px-3 py-2 text-xl border rounded-xl bg-green-300 hover:bg-green-400 transition-colors cursor-pointer"
          >
            Upload
          </Link>
        )}
      </div>
      <PDFSelector PYQs={PYQs} />
    </>
  )
}

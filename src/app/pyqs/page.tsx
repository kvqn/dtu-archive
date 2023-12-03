import { Navbar, NavbarItem } from "@/components/Navbar/Navbar"
import { useServerSession } from "@/lib/utils"
import prisma from "@/prisma"
import { isAllowedToUpload } from "@/server/isAllowedToUpload"
import { Metadata } from "next"
import Head from "next/head"

import { PDFSelector } from "./PYQSelector"

export const metadata: Metadata = {
  title: "Previous Year Papers",
}

export default async function Page() {
  let PYQs = await prisma.pyq.findMany({
    include: {
      uploadedBy: true,
      file: {
        select: {
          _count: {
            select: {
              FileHearts: true,
              FileViews: true,
            },
          },
          id: true,
          createdAt: true,
          type: true,
        },
      },
    },
  })

  PYQs = PYQs.sort((a, b) => b.file._count.FileViews - a.file._count.FileViews)

  const session = await useServerSession()
  const show_upload = await isAllowedToUpload(session)

  let userHeartsIds: number[] = []
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (user) {
      const userHearts = await prisma.fileHearts.findMany({
        where: {
          userId: user.id,
        },
        select: {
          fileId: true,
        },
      })
      userHeartsIds = userHearts.map((userHeart) => userHeart.fileId)
    }
  }

  return (
    <>
      <Navbar left={[<NavbarItem name="PYQs" href="/pyqs" key="/pyqs" />]} />
      <PDFSelector
        PYQs={PYQs}
        show_upload={show_upload}
        userHeartsIds={userHeartsIds}
      />
    </>
  )
}

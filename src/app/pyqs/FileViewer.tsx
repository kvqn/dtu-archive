"use client"

import { PDFViewer } from "@/components/PDFViewer"
import prisma from "@/prisma"
import { getFile } from "@/server/getFile"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"

export function FileViewer({ id }: { id: number }) {
  const [file, setFile] = useState<Prisma.fileGetPayload<{}> | null>()
  useEffect(() => {
    async function _() {
      console.log("bkfdjbjfdb")
      setFile(await getFile(id))
    }
    _()
  }, [])

  if (!file)
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>File not found</p>
      </div>
    )

  if (file.type === "PDF") {
    return <PDFViewer url={`/api/pyq/${id}`} />
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={`/api/pyq/${id}`}
          alt="Image"
          // style={{
          //   height: "100%",
          //   width: "100%"
          // }}
          layout="fill"
          objectFit="contain"
        />
      </div>
    )
  }
}

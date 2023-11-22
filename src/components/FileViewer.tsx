"use client"

import { PDFViewer } from "@/components/PDFViewer"
import prisma from "@/prisma"
import { getFile } from "@/server/getFile"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"

export function FileViewer({ id }: { id: number }) {
  console.log("id", id)
  const [file, setFile] = useState<Prisma.fileGetPayload<{}> | null>()
  const [loading, setLoading] = useState(true)

  async function fetchFile() {
    console.log(`id ${id}`)
    setLoading(true)
    setFile(await getFile(id))
    setLoading(false)
  }

  useEffect(() => {
    fetchFile()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p>Loading</p>
      </div>
    )
  }

  console.log("file", file)

  if (!file)
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div>File not found</div>
        <button onClick={() => fetchFile()} className="hover:underline">
          Retry?
        </button>
      </div>
    )

  if (file.type === "PDF") {
    return <PDFViewer url={`/api/pyq/${id}`} />
  } else {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img
          src={`/api/pyq/${id}`}
          alt="Image"
          style={{
            height: "100%",
            width: "100%"
          }}
        />
      </div>
    )
  }
}

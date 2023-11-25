"use client"

import { PDFViewer } from "@/components/PDFViewer"
import prisma from "@/prisma"
import { getFile } from "@/server/getFile"
import { Prisma } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"

export function FileViewer({ url, type }: { url: string; type: string }) {
  console.log(type, url)
  if (type === "PDF") {
    return (
      <div className="relative h-full w-full overflow-auto">
        <PDFViewer url={url} />
      </div>
    )
  } else {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src={url}
          alt="Image"
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </div>
    )
  }
}

export function FileViewerUsingId({ id }: { id: number }) {
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
      <div className="flex h-full w-full items-center justify-center">
        <p>Loading</p>
      </div>
    )
  }

  console.log("file", file)

  if (!file)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div>File not found</div>
        <button onClick={() => fetchFile()} className="hover:underline">
          Retry?
        </button>
      </div>
    )

  const url = `/api/pyq/${id}`
  const type = file.type

  return <FileViewer url={url} type={type} />
}

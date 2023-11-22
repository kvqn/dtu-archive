"use client"

import { Prisma } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"

import { FileViewer } from "./FileViewer"

function displayType(type: string): string {
  if (type === "MID_TERM_QUESTIONS") return "Mid Term Questions"
  if (type === "END_TERM_QUESTIONS") return "End Term Questions"
  if (type === "MID_TERM_ANSWERS") return "Mid Term Answers"
  if (type === "END_TERM_ANSWERS") return "End Term Answers"
  else return ""
}
export function PDFSelector({
  PYQs
}: {
  PYQs: Prisma.pyqGetPayload<{ include: { uploadedBy: true } }>[]
}) {
  const [pyq, setPYQ] = useState<number | null>(null)

  return (
    <div className="flex">
      <div className="mt-40 w-full ml-[5%] mr-[5%]">
        {PYQs.map((pyq, index) => (
          <div
            // href={`/api/pyq/${pyq.fileId}`}
            // target="_blank"
            key={index}
            className="border flex justify-between p-4 cursor-pointer"
            onClick={() => {
              console.log(index)
              setPYQ(index)
            }}
          >
            <div>
              <div className="flex gap-4">
                <div>{pyq.subject_code}</div>
                <div>{pyq.subject_name}</div>
              </div>
              <div>Uploaded by {pyq.uploadedBy.name}</div>
            </div>
            <div className="text-right">
              <div>{pyq.year}</div>
              <div> {displayType(pyq.type)} </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border w-full ml-[5%] mr-[5%] h-[80vh] relative overflow-auto">
        {pyq != null && PYQs[pyq] ? (
          <FileViewer id={PYQs[pyq].fileId} />
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <p>select a PYQ</p>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { Prisma } from "@prisma/client"
import Link from "next/link"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

import { FileViewerUsingId } from "../../components/FileViewer"

function displayType(type: string): string {
  if (type === "MID_TERM_QUESTIONS") return "Mid Term Questions"
  if (type === "END_TERM_QUESTIONS") return "End Term Questions"
  if (type === "MID_TERM_ANSWERS") return "Mid Term Answers"
  if (type === "END_TERM_ANSWERS") return "End Term Answers"
  if (type === "SUPPLEMENTARY_QUESTIONS") return "Supplementary Questions"
  else return ""
}
export function PDFSelector({
  PYQs,
}: {
  PYQs: Prisma.pyqGetPayload<{ include: { uploadedBy: true } }>[]
}) {
  const [activePyq, setActivePyq] = useState<number | null>(null)
  const [activeFileId, setActiveFileId] = useState<number | null>(null)

  return (
    <div className="flex w-screen p-4 px-[5%] justify-between gap-[5%]">
      <div className="w-full flex flex-col gap-2 overflow-y-auto h-[80vh]">
        {PYQs.map((pyq, index) => (
          <div
            // href={`/api/pyq/${pyq.fileId}`}
            // target="_blank"
            key={index}
            className={twMerge(
              "border flex justify-between p-4 cursor-pointer transition-colors",
              index === activePyq
                ? "bg-gray-200 border-black"
                : "hover:bg-gray-200"
            )}
            onClick={() => {
              console.log(index)
              setActivePyq(index)
              setActiveFileId(pyq.fileId)
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
      <div className="border w-full relative overflow-auto">
        {activeFileId != null ? (
          <FileViewerUsingId id={activeFileId} />
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <p>select a PYQ</p>
          </div>
        )}
      </div>
    </div>
  )
}

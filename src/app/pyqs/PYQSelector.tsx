"use client"

import { Prisma } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
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
  show_upload,
}: {
  PYQs: Prisma.pyqGetPayload<{ include: { uploadedBy: true } }>[]
  show_upload: boolean
}) {
  const [activeFileId, setActiveFileId] = useState<number | null>(null)

  const [filteredPYQs, setFilteredPYQs] = useState(PYQs)

  const [filter_subjectCode, setFilter_subjectCode] = useState<string>("")
  const [filter_subjectName, setFilter_subjectName] = useState<string>("")
  const [filter_year, setFilter_year] = useState<number | null>(null)
  const [filter_type, setFilter_type] = useState<string>("ALL")

  useEffect(() => {
    console.log(
      filter_subjectCode,
      filter_subjectName,
      filter_year,
      filter_type
    )
    const filtered = PYQs.filter((pyq) => {
      return (
        pyq.subject_code
          .toLowerCase()
          .includes(filter_subjectCode.toLowerCase()) &&
        pyq.subject_name
          .toLowerCase()
          .includes(filter_subjectName.toLowerCase()) &&
        (filter_year === null || pyq.year === filter_year) &&
        (filter_type == "ALL" || pyq.type === filter_type)
      )
    })
    setFilteredPYQs(filtered)
  }, [filter_subjectCode, filter_subjectName, filter_year, filter_type])

  return (
    <div className="px-[5%]">
      <div className="flex justify-between items-center mt-4">
        <div className="flex flex-col items-center">
          <div className="text-lg">Subject Code</div>
          <input
            type="text"
            className="border rounded-lg h-10 hover:border-slate-300 text-center"
            onChange={(e) => {
              setFilter_subjectCode(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg">Subject Name</div>
          <input
            type="text"
            className="border rounded-lg h-10 hover:border-slate-300 text-center"
            onChange={(e) => {
              setFilter_subjectName(e.target.value)
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg">Year</div>
          <input
            type="number"
            className="border rounded-lg h-10 hover:border-slate-300 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => {
              const year = e.target.value ? parseInt(e.target.value) : null
              setFilter_year(year)
            }}
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-lg">Type</div>
          <select
            className="rounded-lg h-10 text-center"
            onChange={(e) => {
              setFilter_type(e.target.value)
            }}
          >
            <option value="ALL">All</option>
            <option value="MID_TERM_QUESTIONS">Mid Term Questions</option>
            <option value="END_TERM_QUESTIONS">End Term Questions</option>
            <option value="MID_TERM_ANSWERS">Mid Term Answers</option>
            <option value="END_TERM_ANSWERS">End Term Answers</option>
            <option value="SUPPLEMENTARY_QUESTIONS">
              Supplementary Questions
            </option>
          </select>
        </div>
        <div className="mx-8 my-4 px-3 py-2 text-xl border rounded-xl bg-green-300 hover:bg-green-400 transition-colors cursor-pointer">
          {show_upload && <Link href="/pyqs/upload">Upload</Link>}
        </div>
      </div>
      <div className="flex py-4 justify-between gap-[5%]">
        <div className="w-full flex flex-col gap-2 overflow-y-auto h-[80vh] pr-2">
          {filteredPYQs.map((pyq, index) => (
            <div
              // href={`/api/pyq/${pyq.fileId}`}
              // target="_blank"
              key={index}
              className={twMerge(
                "border flex justify-between p-4 cursor-pointer transition-colors",
                pyq.fileId === activeFileId
                  ? "bg-gray-200 border-black"
                  : "hover:bg-gray-200"
              )}
              onClick={() => {
                console.log(index)
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
    </div>
  )
}

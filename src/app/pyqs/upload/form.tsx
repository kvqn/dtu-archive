"use client"

import { FileViewer } from "@/components/FileViewer"
import uploadPYQ from "@/server/uploadPyq"
import { useSession } from "next-auth/react"
import { useRef, useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import toast from "react-hot-toast"
import { twMerge } from "tailwind-merge"

const fileTypes = ["PDF"]

export default function Form() {
  const { data: session } = useSession()
  let formRef = useRef<HTMLFormElement>(null)

  const [file, setFile] = useState<File | null>(null)

  const [uploading, setUploading] = useState(false)

  const handleFileChange = (file: File) => {
    setFile(file)
  }

  async function upload(data: FormData) {
    setUploading(true)
    data.append("user_email", session?.user?.email || "")
    data.append("file", file as File)
    const resp = await uploadPYQ(data)
    if (resp.error) toast.error(resp.error)
    if (resp.pyq) toast.success(`Uploaded PYQ #${resp.pyq.fileId}`)
    setUploading(false)
  }

  return (
    <div className="flex">
      <div className="my-40 ml-[7.5%] mr-[2.5%] w-[40%] rounded-xl border bg-slate-100 px-8 pb-4 pt-8">
        <div className="flex justify-center p-4 text-xl">Upload PYQ</div>
        <form
          action={upload}
          className="flex flex-col items-center gap-2"
          ref={formRef}
        >
          <FileUploader
            handleChange={handleFileChange}
            types={["PDF", "JPEG"]}
            classes="w-full"
          >
            <div className="flex h-20 w-full items-center justify-center rounded-xl border bg-white">
              {file == null ? (
                <div>
                  <span className="underline">Choose File</span> or Drag and
                  Drop
                </div>
              ) : (
                <div>{file.name}</div>
              )}
            </div>
          </FileUploader>
          <input
            className="w-full rounded-xl border p-4 transition-all hover:border-slate-500"
            type="text"
            name="subject_code"
            placeholder="Subject Code"
          />
          <input
            className="w-full rounded-xl border p-4 transition-all hover:border-slate-500"
            type="text"
            name="subject_name"
            placeholder="Subject Name"
          />
          <input
            className="w-full rounded-xl border p-4 transition-all hover:border-slate-500"
            type="number"
            name="year"
            placeholder="Year"
          />
          <select
            name="type"
            className="w-full rounded-xl border p-4 transition-all hover:border-slate-500"
          >
            <option value="MID_TERM_QUESTIONS">Mid Term Questions</option>
            <option value="END_TERM_QUESTIONS">End Term Questions</option>
            <option value="MID_TERM_ANSWERS">Mid Term Answers</option>
            <option value="END_TERM_ANSWERS">End Term Answers</option>
            <option value="SUPPLEMENTARY_QUESTIONS">
              Supplementary Questions
            </option>
          </select>
          <button
            className={twMerge(
              "w-fit rounded-xl border bg-blue-200 px-4 py-2 transition-colors hover:bg-blue-300",
              uploading ? "cursor-not-allowed bg-blue-400" : "cursor-pointer"
            )}
            // type="submit"
            onClick={() => {
              setUploading(true)
              formRef.current?.requestSubmit()
            }}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
        <div className="flex justify-center">
          <div
            className="cursor-pointer text-slate-100 hover:text-black hover:underline"
            onClick={() => {
              formRef.current?.reset()
              setFile(null)
            }}
          >
            Clear
          </div>
        </div>
      </div>
      <div className="ml-[2.5%] mr-[7.5%] w-[40%]">
        <div className="m-4 flex w-full justify-center font-bold">Preview</div>
        {file == null ? (
          <div className="flex h-full w-full items-center justify-center">
            {" "}
            File preview will show here.{" "}
          </div>
        ) : (
          <FileViewer
            url={URL.createObjectURL(file)}
            type={file.type.split("/")[1].toUpperCase()}
          />
        )}
      </div>
    </div>
  )
}

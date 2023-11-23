"use client"

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
    console.log(file)
    data.append("user_email", session?.user?.email || "")
    data.append("file", file as File)
    const resp = await uploadPYQ(data)
    if (resp.error) toast.error(resp.error)
    if (resp.pyq) toast.success(`Uploaded PYQ #${resp.pyq.fileId}`)
    setUploading(false)
  }

  return (
    <div className="mx-[25%] my-40 border pt-8 px-8 pb-4">
      <div className="flex justify-center text-xl p-4">Upload PYQ</div>
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
          <div className="border w-full h-20 rounded-xl flex justify-center items-center">
            {file == null ? (
              <div>
                <span className="underline">Choose File</span> or Drag and Drop
              </div>
            ) : (
              <div>{file.name}</div>
            )}
          </div>
        </FileUploader>
        <input
          className="border p-4 transition-all hover:border-slate-500 rounded-xl w-full"
          type="text"
          name="subject_code"
          placeholder="Subject Code"
        />
        <input
          className="border p-4 transition-all hover:border-slate-500 rounded-xl w-full"
          type="text"
          name="subject_name"
          placeholder="Subject Name"
        />
        <input
          className="border p-4 transition-all hover:border-slate-500 rounded-xl w-full"
          type="number"
          name="year"
          placeholder="Year"
        />
        <select
          name="type"
          className="p-4 rounded-xl border hover:border-slate-500 transition-all w-full"
        >
          <option value="MID_TERM_QUESTIONS">Mid Term Questions</option>
          <option value="END_TERM_QUESTIONS">End Term Questions</option>
          <option value="MID_TERM_ANSWERS">Mid Term Answers</option>
          <option value="END_TERM_ANSWERS">End Term Answers</option>
        </select>
        <button
          className={twMerge(
            "border py-2 px-4 w-fit rounded-xl bg-blue-200 hover:bg-blue-300 transition-colors",
            uploading ? "cursor-not-allowed bg-blue-400" : "cursor-pointer"
          )}
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <div className="flex justify-center">
        <div
          className="text-white hover:text-black cursor-pointer hover:underline"
          onClick={() => {
            console.log(formRef)
            formRef.current?.reset()
            setFile(null)
          }}
        >
          Clear
        </div>
      </div>
    </div>
  )
}

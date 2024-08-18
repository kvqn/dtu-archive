"use client"

import { getFile } from "@/app/admin/files/_lib/actions/file-get"
import { ALLOWED_FILE_TYPES } from "@/lib/consts"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { getFiles } from "../../../lib/actions/get-files"
import { Dropzone } from "./_components/dropzone"
import { FileCard, UploadingFileCard } from "./_components/file-card"
import { EditTags } from "./_components/tags-manage"
import { uploadFile } from "./_lib/actions/file-upload"

export default function ClientPage() {
  const [files, setFiles] = useState<Awaited<ReturnType<typeof getFiles>>>([])
  const [uploadingFiles, setUploadingFiles] = useState<
    { key: string; name: string }[]
  >([])

  function refetchFiles() {
    getFiles().then((files) => {
      setFiles(files)
    })
  }

  useEffect(() => {
    refetchFiles()
  }, [])

  function tryToUploadFile(file: File) {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error(file.name, {
        description: "Invalid file type",
        duration: 5000,
      })
      return
    }

    const formData = new FormData()
    formData.set("file", file)
    setUploadingFiles((prev) => [
      { key: file.webkitRelativePath, name: file.name },
      ...prev,
    ])
    uploadFile(formData)
      .then((resp) => {
        if (resp.status == "error") {
          toast.error(file.name, {
            description: resp.error,
            duration: 5000,
          })
        } else {
          toast.success(file.name, {
            description: `File uploaded with id ${resp.fileId}`,
            duration: 5000,
          })
          getFile(resp.fileId).then((file) => {
            if (file) setFiles((prev) => [file, ...prev])
          })
        }
      })
      .finally(() => {
        setUploadingFiles((prev) =>
          prev.filter((f) => f.key !== file.webkitRelativePath)
        )
      })
  }

  return (
    <div className="mx-auto flex max-w-[600px] flex-col items-center gap-8 px-4 pt-16">
      <h1 className="text-xl font-bold">Manage Files</h1>
      <Dropzone
        className="w-full"
        onDrop={(files) => {
          files.forEach((file) => {
            tryToUploadFile(file)
          })
        }}
      />
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Files</h1>
        <EditTags />
      </div>
      <div className="flex w-full flex-col gap-2">
        {uploadingFiles.map((file) => (
          <UploadingFileCard key={file.key} fileName={file.name} />
        ))}
        {files.map((file) => (
          <FileCard key={file.id} file={file} onFileEdit={refetchFiles} />
        ))}
      </div>
    </div>
  )
}

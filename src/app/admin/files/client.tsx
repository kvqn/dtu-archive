"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { deleteFile } from "@/server/actions/deleteFile"
// import { deleteTag } from "@/server/actions/deleteTag"
import { getFile } from "@/server/actions/getFile"
import { getFiles } from "@/server/actions/getFiles"
import { getTags } from "@/server/actions/getTags"
import { updateFile } from "@/server/actions/updateFile"
import { uploadFile } from "@/server/actions/uploadFile"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { DialogClose } from "@radix-ui/react-dialog"
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { format, set } from "date-fns"
import { Loader2 } from "lucide-react"
// import StaticGenerationSearchParamsBailoutProvider from "next/dist/client/components/static-generation-searchparams-bailout-provider"
import { useEffect, useState } from "react"
import { DropzoneOptions, useDropzone } from "react-dropzone"
import { toast } from "sonner"

// import { string } from "zod"

export function ClientPage({
  tags,
}: {
  tags: Awaited<ReturnType<typeof getTags>>
}) {
  let file: File | undefined = undefined
  const [files, setFiles] = useState<Awaited<ReturnType<typeof getFiles>>>([])
  const [uploadingFiles, setUploadingFiles] = useState<
    { key: string; name: string }[]
  >([])

  async function refetchFiles() {
    setFiles(await getFiles())
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
      ...prev,
      { key: file.webkitRelativePath, name: file.name },
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
    <div className="mx-auto flex w-[600px] flex-col items-center gap-8 pt-16">
      <h1 className="text-xl font-bold">Manage Files</h1>
      <Dropzone
        className="w-full"
        onDrop={(files) => {
          files.forEach((file) => {
            tryToUploadFile(file)
          })
        }}
      />
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

function UploadingFileCard({ fileName }: { fileName: string }) {
  return (
    <div className="flex flex-col rounded-md border border-blue-400 p-4">
      <div>
        <h1>{fileName}</h1>
      </div>
      <div>
        <p>Uploading ...</p>
      </div>
    </div>
  )
}

function FileCard({
  file,
  onFileEdit,
}: {
  file: Awaited<ReturnType<typeof getFiles>>[0]
  onFileEdit?: () => void
}) {
  return (
    <div className="group relative flex flex-col rounded-md border p-4">
      <div className="absolute right-0 top-0 hidden items-center rounded-bl-md rounded-tr-md border bg-background p-2 group-hover:flex">
        <EditFile fileId={file.id} onSave={onFileEdit} />
        <DeleteFile fileId={file.id} onDelete={onFileEdit} />
      </div>
      <div className="flex justify-between">
        <h1>{file.name}</h1>
        <p>{format(file.createdAt, "yyyy-MM-dd")}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{file.type}</Badge>
          <div className="flex items-center gap-2">
            <Avatar className="h-4 w-4">
              <AvatarImage src={file.uploadedBy.image ?? undefined} />
              <AvatarFallback>{file.uploadedBy.name}</AvatarFallback>
            </Avatar>
            <p>{file.uploadedBy.name}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {file.tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"]

function Dropzone({
  onDrop,
  className,
}: {
  onDrop?: DropzoneOptions["onDrop"]
  className?: string
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-20 items-center justify-center rounded-xl border border-dashed",
        className
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  )
}

function EditFile({ fileId, onSave }: { fileId: number; onSave?: () => void }) {
  const [tags, setTags] = useState<Awaited<ReturnType<typeof getTags>>>([])
  const [file, setFile] = useState<Awaited<ReturnType<typeof getFile>>>(null)
  const [fileName, setFileName] = useState("")
  const [activeTags, setActiveTags] = useState<number[]>([])
  const [open, setOpen] = useState(false)

  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getFile(fileId).then((file) => {
      if (!file) return
      setFile(file)
      setFileName(file.name)
      setActiveTags(file.tags.map((tag) => tag.id))
    })

    getTags().then((tags) => {
      setTags(tags)
    })
  }, [fileId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil1Icon className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit File</DialogTitle>
          <DialogDescription>Make changes to the file</DialogDescription>
        </DialogHeader>
        {file ? (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <p className="mb-4 text-sm text-muted-foreground">
                File name should be unique
              </p>
              <Input defaultValue={file.name} id="name" />
            </div>
            <div>
              <label htmlFor="type" className="font-semibold">
                Tags
              </label>
              <p className="mb-4 text-sm text-muted-foreground">
                Click to toggle the tags for this file
              </p>
              <div className="flex gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={
                      activeTags.includes(tag.id) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => {
                      if (activeTags.includes(tag.id)) {
                        setActiveTags((prev) =>
                          prev.filter((t) => t !== tag.id)
                        )
                      } else {
                        setActiveTags((prev) => [...prev, tag.id])
                      }
                    }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div>Loading ...</div>
        )}
        <div className="flex gap-2">
          <DialogClose asChild>
            <Button variant="secondary" className="flex-grow">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="flex-grow"
            disabled={saving}
            onClick={async () => {
              setSaving(true)
              const resp = await updateFile(fileId, fileName, activeTags)
              if (resp.status === "error") {
                toast.error("Failed to save file", {
                  description: resp.error,
                })
              } else {
                toast.success("File saved")
                setSaving(false)
                setOpen(false)
                if (onSave) onSave()
              }
            }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DeleteFile({
  fileId,
  onDelete,
}: {
  fileId: number
  onDelete?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="h-6 w-6 text-red-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this file?
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <Button
          onClick={async () => {
            setDeleting(true)
            const resp = await deleteFile(fileId)
            if (resp.status === "error") {
              toast.error("Failed to delete file", {
                description: resp.error,
              })
            } else {
              toast.success("File deleted")
              setOpen(false)
              if (onDelete) onDelete()
            }
            setDeleting(false)
          }}
          disabled={deleting}
        >
          {deleting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Deleting
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

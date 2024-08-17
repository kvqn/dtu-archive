"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getFile } from "@/server/actions/getFile"
import { getTags } from "@/server/actions/getTags"
import { updateFile } from "@/server/actions/updateFile"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

import { DeleteFile } from "./file-delete"

export function EditFile({
  fileId,
  onSave,
  trigger,
}: {
  fileId: number
  onSave?: () => void
  trigger: React.ReactNode
}) {
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
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
        <DeleteFile fileId={fileId} onDelete={onSave} />
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

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
import { createTag } from "@/server/actions/createTag"
import { deleteTag } from "@/server/actions/deleteTag"
import { getTags } from "@/server/actions/getTags"
import { TrashIcon } from "@radix-ui/react-icons"
import { revalidatePath } from "next/cache"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function Page() {
  const [tagName, setTagName] = useState("")
  const [creating, setCreating] = useState(false)

  const [tags, setTags] = useState<Awaited<ReturnType<typeof getTags>>>([])

  async function updateTags() {
    setTags(await getTags())
  }

  useEffect(() => {
    updateTags()
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Edit Tags</h1>
      <p className="text-muted-foreground">Edit tags to categorize the files</p>

      <div className="flex flex-col gap-2">
        <h1 className="font-semibold">Tags</h1>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="relative">
              <p>{tag.name}</p>
              <p className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-white opacity-0 transition-opacity hover:opacity-100 ">
                <DeleteTag tagId={tag.id} onDelete={updateTags} />
              </p>
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold">Create Tag</h1>

        <div className="flex w-80 gap-2">
          <Input
            placeholder="Tag name"
            onChange={(e) => setTagName(e.target.value)}
            value={tagName}
          />
          <Button
            onClick={async () => {
              if (creating) return
              setCreating(true)
              const resp = await createTag(tagName)
              if (resp.status === "error") {
                toast.error("Error while creating tag", {
                  description: resp.error,
                })
              } else {
                updateTags()
                toast.success(`Tag created with id ${resp.tag.id}`)
                setTagName("")
              }
              setCreating(false)
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

function DeleteTag({
  tagId,
  onDelete,
}: {
  tagId: number
  onDelete?: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="h-4 w-4 text-red-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Tag</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tag?
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"} className="flex-grow">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="flex-grow"
            onClick={async () => {
              await deleteTag(tagId)
              setOpen(false)
              toast.success("Tag deleted")
              if (onDelete) onDelete()
            }}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

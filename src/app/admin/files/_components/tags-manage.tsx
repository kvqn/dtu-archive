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
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function EditTags() {
  const [open, setOpen] = useState(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Manage Tags</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
          <DialogDescription>
            Edit tags to categorize the files
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Tags</h1>
            <div className="flex justify-center gap-2">
              {tags.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="relative">
                  <p>{tag.name}</p>
                  <p className="absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-background opacity-0 transition-opacity hover:opacity-100 ">
                    <DeleteTag tag={tag} onDelete={updateTags} />
                  </p>
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Create Tag</h1>

            <div className="flex w-full gap-2">
              <Input
                className="flex-grow"
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
      </DialogContent>
    </Dialog>
  )
}

function DeleteTag({
  tag,
  onDelete,
}: {
  tag: { id: number; name: string }
  onDelete?: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TrashIcon className="h-4 w-4 text-foreground" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Tag</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tag?
          </DialogDescription>
        </DialogHeader>
        <Badge variant="secondary" className="mx-auto">
          {tag.name}
        </Badge>
        <div className="flex w-full gap-2">
          <DialogClose asChild>
            <Button variant={"secondary"} className="flex-grow">
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="flex-grow"
            onClick={async () => {
              await deleteTag(tag.id)
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

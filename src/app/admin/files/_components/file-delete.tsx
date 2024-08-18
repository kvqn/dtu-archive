"use client"

import { deleteFile } from "@/app/admin/files/_lib/actions/file-delete"
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
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function DeleteFile({
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
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
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

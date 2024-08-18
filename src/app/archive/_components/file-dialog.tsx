"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getFiles } from "@/lib/actions/get-files"
import Link from "next/link"

export function FileDialog({
  file,
  open,
  setOpen,
}: {
  file?: Awaited<ReturnType<typeof getFiles>>[0]
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const url = encodeURI(`/api/file/${file?.name}`)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{file?.name}</DialogTitle>
          <div>
            <Badge variant="secondary">{file?.type}</Badge>
            {file?.tags.map((tag) => (
              <Badge key={tag.id}>{tag.name}</Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            View or download the file
          </div>
          <div className="flex gap-4">
            <Link href={url} className="flex-1 flex-grow" target="_blank">
              <Button variant={"secondary"} className="w-full">
                View in new Tab
              </Button>
            </Link>
            <a href={url} download className="flex-1 flex-grow">
              <Button className="w-full">Download</Button>
            </a>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

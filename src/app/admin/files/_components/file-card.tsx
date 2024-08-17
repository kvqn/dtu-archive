import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { getFiles } from "@/server/actions/getFiles"
import { format } from "date-fns"

import { EditFile } from "./file-edit"

export function UploadingFileCard({ fileName }: { fileName: string }) {
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

export function FileCard({
  file,
  onFileEdit,
}: {
  file: Awaited<ReturnType<typeof getFiles>>[0]
  onFileEdit?: () => void
}) {
  return (
    <EditFile
      fileId={file.id}
      onSave={onFileEdit}
      trigger={
        <div className="group relative flex cursor-pointer flex-col rounded-md border p-4 transition-colors hover:bg-muted">
          <div className="flex justify-between">
            <h1>{file.name}</h1>
            <p className="whitespace-nowrap">
              {format(file.createdAt, "yyyy-MM-dd")}
            </p>
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
      }
    />
  )
}

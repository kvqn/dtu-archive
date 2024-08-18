import { Badge } from "@/components/ui/badge"
import { getFiles } from "@/lib/actions/get-files"
import { cn } from "@/lib/utils"
import { EyeOpenIcon } from "@radix-ui/react-icons"
import { formatDistanceToNow } from "date-fns"

export function FileCard({
  file,
  onClick,
  selected,
}: {
  file: Awaited<ReturnType<typeof getFiles>>[0]
  onClick?: () => void
  selected: boolean
}) {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col gap-2 rounded-md border bg-secondary p-4 text-sm transition-colors hover:bg-neutral-200 lg:text-base",
        selected && "bg-neutral-300 dark:bg-neutral-700"
      )}
      onClick={() => {
        if (onClick) onClick()
      }}
    >
      <div className="flex justify-between">
        <div className="text-nowrap overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
          {file.name}
        </div>
        <Badge
          className="flex items-center gap-2 bg-background"
          variant="outline"
        >
          <EyeOpenIcon className="h-4 w-4" />
          <p>{file.views}</p>
        </Badge>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {file.tags.map((tag) => (
            <Badge key={tag.id}>{tag.name}</Badge>
          ))}
        </div>
        <div className="text-xs text-muted-foreground lg:text-sm">
          Uploaded {formatDistanceToNow(file.createdAt, { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}

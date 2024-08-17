"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getTags } from "@/server/actions/getTags"

export function TagSelect({
  tags,
  activeTags,
  setActiveTags,
}: {
  tags: Awaited<ReturnType<typeof getTags>>
  activeTags: number[]
  setActiveTags: (tags: number[]) => void
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="whitespace-nowrap">Filter by Tag</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              className="cursor-pointer"
              variant={activeTags.includes(tag.id) ? "default" : "secondary"}
              onClick={() => {
                if (activeTags.includes(tag.id)) {
                  setActiveTags(activeTags.filter((id) => id !== tag.id))
                } else {
                  setActiveTags([...activeTags, tag.id])
                }
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

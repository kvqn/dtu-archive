"use client"

import { getTags } from "@/app/admin/files/_lib/actions/tags-get"
import { FileViewer } from "@/components/file-viewer"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useScreen } from "@/lib/hooks/screen"
import { useEffect, useState } from "react"

import { getFiles } from "../../lib/actions/get-files"
import { FileCard } from "./_components/file-card"
import { FileDialog } from "./_components/file-dialog"
import { TagSelect } from "./_components/tag-select"

export default function ClientPage() {
  const [files, setFiles] = useState<Awaited<ReturnType<typeof getFiles>>>([])
  const [tags, setTags] = useState<Awaited<ReturnType<typeof getTags>>>([])
  const [activeTags, setActiveTags] = useState<number[]>([])
  const [activeFile, setActiveFile] = useState<(typeof files)[0] | undefined>()
  const [filteredFiles, setFilteredFiles] = useState<typeof files>([])
  const { isLarge } = useScreen()

  const [filter, setFilter] = useState("")

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    void (async () => {
      setFiles(await getFiles())
      setTags(await getTags())
    })()
  }, [])

  useEffect(() => {
    setFilteredFiles(
      files.filter((file) => {
        if (!file.name.toLowerCase().includes(filter.toLowerCase()))
          return false
        if (
          activeTags.length != 0 &&
          !file.tags.some((tag) => activeTags.includes(tag.id))
        )
          return false
        return true
      })
    )
  }, [files, activeTags, filter])

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <FileDialog open={dialogOpen} setOpen={setDialogOpen} file={activeFile} />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex flex-col lg:pr-4">
            <div className="mb-2 flex gap-4">
              <Input
                placeholder="Search"
                className="flex-grow"
                onChange={(e) => setFilter(e.target.value)}
              />
              <TagSelect
                tags={tags}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
              />
            </div>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredFiles.length} of {files.length} files
            </div>
            <ScrollArea className="h-[80vh]">
              <div className="flex flex-col gap-4 overflow-y-auto">
                {filteredFiles.map((file) => (
                  <FileCard
                    key={file.id}
                    file={file}
                    onClick={() => {
                      setActiveFile(file)
                      if (!isLarge) setDialogOpen(true)
                    }}
                    selected={activeFile?.id === file.id}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        {isLarge && (
          <>
            <ResizableHandle />
            <ResizablePanel>
              {activeFile ? (
                <FileViewer file={activeFile} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  Select a file
                </div>
              )}
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  )
}

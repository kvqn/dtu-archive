"use client"

import { getTags } from "@/app/admin/files/_lib/actions/tags-get"
import { FileViewer } from "@/components/file-viewer"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
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

  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    getFiles().then(setFiles)
    getTags().then((_tags) => {
      setTags(_tags)
    })
  }, [])

  useEffect(() => {
    setFilteredFiles(
      files.filter((file) => {
        if (activeTags.length === 0) return true
        return file.tags.some((tag) => activeTags.includes(tag.id))
      })
    )
  }, [files, activeTags])

  return (
    <div className="flex flex-col gap-4 p-4">
      <FileDialog open={dialogOpen} setOpen={setDialogOpen} file={activeFile} />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="flex flex-col lg:pr-4">
            <div className="mb-2 flex gap-4">
              <Input placeholder="Search" className="flex-grow" />
              <TagSelect
                tags={tags}
                activeTags={activeTags}
                setActiveTags={setActiveTags}
              />
            </div>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredFiles.length} of {files.length} files
            </div>
            <div>
              <div className="flex flex-col gap-4">
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
            </div>
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

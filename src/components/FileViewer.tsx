"use client"

import { PDFViewer } from "@/components/PDFViewer"
import { SimpleTooltip } from "@/components/Tooltip"
import type { getFiles } from "@/server/actions/getFiles"
import {
  faDownload,
  faLink,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import useDraggableScroll from "use-draggable-scroll"

export function FileViewer({
  file,
}: {
  file: Awaited<ReturnType<typeof getFiles>>[0]
}) {
  const type = file.type
  const url = encodeURI(`/api/file/${file.name}`)
  const [scale, setScale] = useState(1)

  const draggableScroll_ref = useRef(null)
  const draggableScroll_onMouseDown =
    useDraggableScroll(draggableScroll_ref).onMouseDown

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between bg-gray-200 px-4 py-2 dark:bg-[#25282a]">
        <div className="flex items-center gap-4">
          <SimpleTooltip
            trigger={
              <FontAwesomeIcon
                icon={faMagnifyingGlassPlus}
                className="cursor-pointer text-neutral-700 transition-colors hover:text-neutral-950 dark:text-[#e2dfdb]"
                onClick={() => {
                  setScale(scale + 0.1)
                }}
              />
            }
            content="Zoom In"
          />
          <div className="border-black">{scale.toFixed(2)}</div>
          <SimpleTooltip
            trigger={
              <FontAwesomeIcon
                icon={faMagnifyingGlassMinus}
                className="cursor-pointer text-neutral-700 transition-colors hover:text-neutral-950 dark:text-[#e2dfdb]"
                onClick={() => {
                  setScale(scale - 0.1)
                }}
              />
            }
            content="Zoom Out"
          />
        </div>
        <div className="flex-grow text-center">{file.name}</div>
        <div className="flex items-center gap-4">
          <SimpleTooltip
            trigger={
              <a href={url} target="_blank">
                <FontAwesomeIcon
                  icon={faLink}
                  className="text-neutral-700 transition-colors hover:text-neutral-950 dark:text-[#e2dfdb]"
                />
              </a>
            }
            content="Open in new tab"
          />

          <SimpleTooltip
            trigger={
              <a href={url} download>
                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-neutral-700 transition-colors hover:text-neutral-950 dark:text-[#e2dfdb]"
                />
              </a>
            }
            content="Download"
          />
        </div>
      </div>
      <div
        className="relative h-full w-full overflow-auto"
        ref={draggableScroll_ref}
        onMouseDown={draggableScroll_onMouseDown}
      >
        <div
          style={{
            scale: scale,
          }}
        >
          {type === "PDF" ? (
            <PDFViewer url={url} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="Image"
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

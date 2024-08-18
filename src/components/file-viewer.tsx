"use client"

import { SimpleTooltip } from "@/components/ui/tooltip"
import { getFiles } from "@/lib/actions/get-files"
import {
  faDownload,
  faLink,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
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

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

export function PDFViewer(props: { url: string }) {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }
  return (
    <div>
      <Document
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex items-center justify-center"
      >
        <div className="absolute left-0 top-0 flex w-full flex-col items-center justify-center gap-2">
          {Array.from(new Array(numPages), (el, index) => (
            <Page pageNumber={index + 1} key={index} className="w-fit border" />
          ))}
        </div>
      </Document>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

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

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
    console.log(`numpages ${numPages}`)
    setNumPages(numPages)
  }
  return (
    <div>
      <Document
        file={props.url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="flex justify-center items-center"
      >
        <div className="absolute top-0 left-0 flex flex-col gap-2 items-center">
          {Array.from(new Array(numPages), (el, index) => (
            <Page pageNumber={index + 1} key={index} className="border w-fit" />
          ))}
        </div>
      </Document>
    </div>
  )
}

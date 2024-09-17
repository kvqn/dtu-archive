"use client"

import { cn } from "@/lib/utils"
import { type DropzoneOptions, useDropzone } from "react-dropzone"

export function Dropzone({
  onDrop,
  className,
}: {
  onDrop?: DropzoneOptions["onDrop"]
  className?: string
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex h-20 items-center justify-center rounded-xl border border-dashed",
        className
      )}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  )
}

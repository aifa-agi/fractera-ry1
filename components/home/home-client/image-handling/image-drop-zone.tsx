// components/home/home-client/image-handling/image-drop-zone.tsx

'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ImageDropZoneProps = {
  children: ReactNode
  onImageDrop: (files: File[]) => void
  isDragOver: boolean
  onDragOver: () => void
  onDragLeave: () => void
  onDrop: () => void
  className?: string
}

export function ImageDropZone({
  children,
  onImageDrop,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  className,
}: ImageDropZoneProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    onDragOver()
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    onDragLeave()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    onDrop()

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/'),
    )

    if (files.length > 0) {
      onImageDrop(files)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'relative',
        isDragOver && 'ring-2 ring-primary ring-offset-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

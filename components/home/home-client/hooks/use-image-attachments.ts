// components/home/home-client/hooks/use-image-attachments.ts

import { useState } from 'react'
import {
  createImageAttachment,
  type ImageAttachment,
} from '@/components/ai-elements/prompt-input'

export function useImageAttachments() {
  const [attachments, setAttachments] = useState<ImageAttachment[]>([])
  const [isDragOver, setIsDragOver] = useState(false)

  const handleImageFiles = async (files: File[]) => {
    try {
      const newAttachments = await Promise.all(
        files.map((file) => createImageAttachment(file)),
      )
      setAttachments((prev) => [...prev, ...newAttachments])
    } catch (error) {
      console.error('Error processing image files:', error)
    }
  }

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((att) => att.id !== id))
  }

  const handleDragOver = () => {
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = () => {
    setIsDragOver(false)
  }

  const clearAttachments = () => {
    setAttachments([])
  }

  return {
    attachments,
    setAttachments,
    isDragOver,
    handleImageFiles,
    handleRemoveAttachment,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearAttachments,
  }
}

// components/home/home-client/hooks/use-prompt-storage.ts

import { useState, useEffect, useRef } from 'react'
import {
  savePromptToStorage,
  loadPromptFromStorage,
  clearPromptFromStorage,
  createImageAttachmentFromStored,
  type ImageAttachment,
} from '@/components/ai-elements/prompt-input'

export function usePromptStorage() {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-focus the textarea on page load and restore from sessionStorage
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }

    // Restore prompt data from sessionStorage
    const storedData = loadPromptFromStorage()
    if (storedData) {
      setMessage(storedData.message)
    }
  }, [])

  // Save prompt data to sessionStorage whenever message changes
  useEffect(() => {
    if (message.trim()) {
      savePromptToStorage(message, [])
    } else {
      // Clear sessionStorage if message is empty
      clearPromptFromStorage()
    }
  }, [message])

  const clearMessage = () => {
    setMessage('')
    clearPromptFromStorage()
  }

  const restoreAttachmentsFromStorage = (): ImageAttachment[] => {
    const storedData = loadPromptFromStorage()
    if (storedData && storedData.attachments.length > 0) {
      return storedData.attachments.map(createImageAttachmentFromStored)
    }
    return []
  }

  return {
    message,
    setMessage,
    textareaRef,
    clearMessage,
    restoreAttachmentsFromStorage,
  }
}

// components/home/home-client/initial-screen/prompt-form.tsx

'use client'

import type { FormEvent, RefObject } from 'react'
import {
  PromptInput,
  PromptInputImageButton,
  PromptInputMicButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'
import type { ImageAttachment } from '@/components/ai-elements/prompt-input'
import { ImagePreviewList } from '../image-handling/image-preview-list'

type PromptFormProps = {
  message: string
  setMessage: (value: string) => void
  isLoading: boolean
  textareaRef: RefObject<HTMLTextAreaElement | null>
  attachments: ImageAttachment[]
  onImageDrop: (files: File[]) => void
  onImageSelect: (files: File[]) => void
  onRemoveAttachment: (id: string) => void
  isDragOver: boolean
  onDragOver: () => void
  onDragLeave: () => void
  onDrop: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function PromptForm({
  message,
  setMessage,
  isLoading,
  textareaRef,
  attachments,
  onImageDrop,
  onImageSelect,
  onRemoveAttachment,
  isDragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onSubmit,
}: PromptFormProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <PromptInput
        onSubmit={onSubmit}
        className="w-full relative"
        onImageDrop={onImageDrop}
        isDragOver={isDragOver}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <ImagePreviewList
          attachments={attachments}
          onRemove={onRemoveAttachment}
        />

        <PromptInputTextarea
          ref={textareaRef}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Describe what you want to build..."
          className="min-h-[80px] text-base"
          disabled={isLoading}
        />

        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputImageButton
              onImageSelect={onImageSelect}
              disabled={isLoading}
            />
          </PromptInputTools>

          <PromptInputTools>
            <PromptInputMicButton
              onTranscript={(transcript) => {
                const next =
                  message && message.trim().length > 0
                    ? `${message} ${transcript}`
                    : transcript
                setMessage(next)
              }}
              onError={(error) => {
                console.error('Speech recognition error:', error)
              }}
              disabled={isLoading}
            />
            <PromptInputSubmit
              disabled={!message.trim() || isLoading}
              status={isLoading ? 'streaming' : 'ready'}
            />
          </PromptInputTools>
        </PromptInputToolbar>
      </PromptInput>
    </div>
  )
}

// components/home/home-client/initial-screen/initial-screen.tsx

'use client'

import type { FormEvent, RefObject } from 'react'
import { HeroSection } from './hero-section'
import { PromptForm } from './prompt-form'
import { SuggestionsGrid } from './suggestions-grid'
import type { ImageAttachment } from '@/components/ai-elements/prompt-input'

type InitialScreenProps = {
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

export function InitialScreen({
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
}: InitialScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        <HeroSection />

        <PromptForm
          message={message}
          setMessage={setMessage}
          isLoading={isLoading}
          textareaRef={textareaRef}
          attachments={attachments}
          onImageDrop={onImageDrop}
          onImageSelect={onImageSelect}
          onRemoveAttachment={onRemoveAttachment}
          isDragOver={isDragOver}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onSubmit={onSubmit}
        />

        <SuggestionsGrid setMessage={setMessage} />

        <div className="mt-8 md:mt-16 text-center text-sm text-muted-foreground">
          <p>
            Powered by{' '}
            <a
              href="https://fractera.ai"
              className="text-foreground hover:underline"
            >
              Fractera
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

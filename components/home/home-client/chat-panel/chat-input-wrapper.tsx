// components/home/home-client/chat-panel/chat-input-wrapper.tsx

'use client'

import { FormEvent } from 'react'
import { ChatInput } from '@/components/chat/chat-input'

type ChatInputWrapperProps = {
  message: string
  setMessage: (value: string) => void
  isLoading: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function ChatInputWrapper({
  message,
  setMessage,
  isLoading,
  onSubmit,
}: ChatInputWrapperProps) {
  return (
    <ChatInput
      message={message}
      setMessage={setMessage}
      onSubmit={onSubmit}
      isLoading={isLoading}
      showSuggestions={false}
    />
  )
}

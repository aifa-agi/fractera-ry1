// components/home/home-client/chat-panel/chat-panel.tsx

'use client'

import { FormEvent } from 'react'
import { ChatMessages } from '@/components/chat/chat-messages'
import { ChatInputWrapper } from './chat-input-wrapper'

type ChatMessage = {
  type: 'user' | 'assistant'
  content: string | any
  isStreaming?: boolean
  stream?: ReadableStream<Uint8Array> | null
}

type CurrentChat = {
  id: string
  demo?: string
} | null

type ChatPanelProps = {
  chatHistory: ChatMessage[]
  isLoading: boolean
  currentChat: CurrentChat
  onStreamingComplete: (finalContent: any) => Promise<void> | void
  onChatData: (chatData: any) => Promise<void> | void
  onStreamingStarted?: () => void
  message: string
  setMessage: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function ChatPanel({
  chatHistory,
  isLoading,
  currentChat,
  onStreamingComplete,
  onChatData,
  onStreamingStarted,
  message,
  setMessage,
  onSubmit,
}: ChatPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages
          chatHistory={chatHistory}
          isLoading={isLoading}
          currentChat={currentChat}
          onStreamingComplete={onStreamingComplete}
          onChatData={onChatData}
          onStreamingStarted={onStreamingStarted}
        />
      </div>

      <ChatInputWrapper
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  )
}

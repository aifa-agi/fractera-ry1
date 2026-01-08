import React, { useRef, useEffect } from 'react'
import { Message, MessageContent } from '@/components/ai-elements/message'
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation'
import { Loader } from '@/components/ai-elements/loader'
import { MessageRenderer } from '@/components/message-renderer'
import { sharedComponents } from '@/components/shared-components'
import { StreamingMessage } from '@v0-sdk/react'

interface ChatMessage {
  type: 'user' | 'assistant'
  content: string | any
  isStreaming?: boolean
  stream?: ReadableStream<Uint8Array> | null
}

interface Chat {
  id: string
  demo?: string
  url?: string
}

interface ChatMessagesProps {
  chatHistory: ChatMessage[]
  isLoading: boolean
  currentChat: Chat | null
  onStreamingComplete: (finalContent: any) => void
  onChatData: (chatData: any) => void
  onStreamingStarted?: () => void
}

export function ChatMessages({
  chatHistory,
  isLoading,
  currentChat,
  onStreamingComplete,
  onChatData,
  onStreamingStarted,
}: ChatMessagesProps) {
  const streamingStartedRef = useRef(false)

  // Reset the streaming started flag when a new message starts loading
  useEffect(() => {
    if (isLoading) {
      streamingStartedRef.current = false
    }
  }, [isLoading])

  if (chatHistory.length === 0) {
    return (
      <Conversation>
        <ConversationContent>
          <div>
            {/* Empty conversation - messages will appear here when they load */}
          </div>
        </ConversationContent>
      </Conversation>
    )
  }

  return (
    <>
      <Conversation>
        <ConversationContent>
          {chatHistory.map((msg, index) => (
            <Message from={msg.type} key={index}>
              {msg.isStreaming && msg.stream ? (
                <StreamingMessage
                  stream={msg.stream}
                  messageId={`msg-${index}`}
                  role={msg.type}
                  onComplete={onStreamingComplete}
                  onChatData={onChatData}
                  onChunk={(chunk) => {
                    // Hide external loader once we start receiving content (only once)
                    if (onStreamingStarted && !streamingStartedRef.current) {
                      streamingStartedRef.current = true
                      onStreamingStarted()
                    }
                  }}
                  onError={(error) => console.error('Streaming error:', error)}
                  components={sharedComponents}
                  loadingComponent={<TypingIndicator />}
                />
              ) : (
                <MessageRenderer
                  content={msg.content}
                  role={msg.type}
                  messageId={`msg-${index}`}
                />
              )}
            </Message>
          ))}
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader size={16} className="text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </ConversationContent>
      </Conversation>
    </>
  )
}
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
      </div>
      <span className="text-sm">AI is thinking...</span>
    </div>
  )
}

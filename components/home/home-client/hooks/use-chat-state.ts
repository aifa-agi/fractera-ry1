// components/home/home-client/hooks/use-chat-state.ts

import { useState, useCallback } from 'react'

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

export function useChatState() {
  const [showChatInterface, setShowChatInterface] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [currentChat, setCurrentChat] = useState<CurrentChat>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [activePanel, setActivePanel] = useState<'chat' | 'preview'>('chat')

  const handleReset = useCallback(() => {
    setShowChatInterface(false)
    setChatHistory([])
    setCurrentChatId(null)
    setCurrentChat(null)
    setIsLoading(false)
    setIsFullscreen(false)
    setRefreshKey((prev) => prev + 1)
  }, [])

  return {
    showChatInterface,
    setShowChatInterface,
    chatHistory,
    setChatHistory,
    currentChatId,
    setCurrentChatId,
    currentChat,
    setCurrentChat,
    isLoading,
    setIsLoading,
    isFullscreen,
    setIsFullscreen,
    refreshKey,
    setRefreshKey,
    activePanel,
    setActivePanel,
    handleReset,
  }
}

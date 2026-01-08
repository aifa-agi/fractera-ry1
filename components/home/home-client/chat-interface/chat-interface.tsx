// components/home/home-client/chat-interface/chat-interface.tsx

'use client'

import { ChatPanel } from '../chat-panel/chat-panel'
import { ChatLayout } from './chat-layout'
import { MobileToolbar } from './mobile-toolbar'
import { PreviewPanel } from '@/components/chat/preview-panel/preview-panel'

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

type ActivePanel = 'chat' | 'preview'

type ChatInterfaceProps = {
  chatHistory: ChatMessage[]
  isLoading: boolean
  currentChat: CurrentChat
  onStreamingComplete: (finalContent: any) => Promise<void> | void
  onChatData: (chatData: any) => Promise<void> | void
  onStreamingStarted?: () => void
  message: string
  setMessage: (value: string) => void
  onChatSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isFullscreen: boolean
  setIsFullscreen: (value: boolean) => void
  refreshKey: number
  setRefreshKey: (key: number | ((prev: number) => number)) => void
  activePanel: ActivePanel
  setActivePanel: (panel: ActivePanel) => void
}

export function ChatInterface({
  chatHistory,
  isLoading,
  currentChat,
  onStreamingComplete,
  onChatData,
  onStreamingStarted,
  message,
  setMessage,
  onChatSubmit,
  isFullscreen,
  setIsFullscreen,
  refreshKey,
  setRefreshKey,
  activePanel,
  setActivePanel,
}: ChatInterfaceProps) {
  const leftPanel = (
    <ChatPanel
      chatHistory={chatHistory}
      isLoading={isLoading}
      currentChat={currentChat}
      onStreamingComplete={onStreamingComplete}
      onChatData={onChatData}
      onStreamingStarted={onStreamingStarted}
      message={message}
      setMessage={setMessage}
      onSubmit={onChatSubmit}
    />
  )

  const rightPanel = (
    <PreviewPanel
      currentChat={currentChat}
      isFullscreen={isFullscreen}
      setIsFullscreen={setIsFullscreen}
      refreshKey={refreshKey}
      setRefreshKey={setRefreshKey}
    />
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      <ChatLayout
        activePanel={activePanel}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        refreshKey={refreshKey}
        setRefreshKey={setRefreshKey}
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      />

      <MobileToolbar
        activePanel={activePanel}
        onPanelChange={setActivePanel}
        hasPreview={!!currentChat}
      />
    </div>
  )
}

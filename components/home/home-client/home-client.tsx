// components/home/home-client/home-client.tsx

'use client'

import { useState, useEffect } from 'react'
import { Suspense } from 'react'
import { AppHeader } from '@/components/shared/app-header'
import { InitialScreen } from './initial-screen/initial-screen'
import { ChatInterface } from './chat-interface/chat-interface'
import { useChatState } from './hooks/use-chat-state'
import { useImageAttachments } from './hooks/use-image-attachments'
import { usePromptStorage } from './hooks/use-prompt-storage'
import { useMessageHandler } from './hooks/use-message-handler'
import { useUrlReset } from './hooks/use-url-reset'
import type { ImageAttachment } from '@/components/ai-elements/prompt-input'
import { clearPromptFromStorage, loadPromptFromStorage } from '@/components/ai-elements/prompt-input'

function SearchParamsHandlerWrapper({ onReset }: { onReset: () => void }) {
  return (
    <Suspense fallback={null}>
      {/* Хук useUrlReset внутри, чтобы не использовать Suspense снаружи */}
      <SearchParamsHandler onReset={onReset} />
    </Suspense>
  )
}

function SearchParamsHandler({ onReset }: { onReset: () => void }) {
  useUrlReset(onReset)
  return null
}

export function HomeClient() {
  const {
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
    handleReset: baseHandleReset,
  } = useChatState()

  const {
    attachments,
    setAttachments,
    isDragOver,
    handleImageFiles,
    handleRemoveAttachment,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    clearAttachments,
  } = useImageAttachments()

  const {
    message,
    setMessage,
    textareaRef,
  } = usePromptStorage()

  const {
    handleSendMessage,
    handleChatSendMessage,
    handleChatData,
    handleStreamingComplete,
  } = useMessageHandler({
    setShowChatInterface,
    setChatHistory,
    setIsLoading,
    setCurrentChatId,
    setCurrentChat,
    currentChatId,
    setActivePanel,
  })

  // Доинициализация attachments из sessionStorage (как в оригинале)
  useEffect(() => {
    const storedData = loadPromptFromStorage()
    if (storedData && storedData.attachments.length > 0 && attachments.length === 0) {
      const { createImageAttachmentFromStored } = require('@/components/ai-elements/prompt-input') as {
        createImageAttachmentFromStored: (stored: any) => ImageAttachment
      }
      const restoredAttachments = storedData.attachments.map(createImageAttachmentFromStored)
      setAttachments(restoredAttachments)
    }
  }, [attachments.length, setAttachments])

  const handleFullReset = () => {
    baseHandleReset()
    setMessage('')
    clearAttachments()
    clearPromptFromStorage()
  }

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim() || isLoading) return

    const currentMessage = message
    const currentAttachments = [...attachments]

    setMessage('')
    clearAttachments()

    handleSendMessage(currentMessage, currentAttachments)
  }

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim() || isLoading || !currentChatId) return

    const currentMessage = message
    setMessage('')

    handleChatSendMessage(currentMessage)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col">
      <SearchParamsHandlerWrapper onReset={handleFullReset} />

      {/* <AppHeader /> */}

      {showChatInterface ? (
        <ChatInterface
          chatHistory={chatHistory}
          isLoading={isLoading}
          currentChat={currentChat}
          onStreamingComplete={handleStreamingComplete}
          onChatData={handleChatData}
          onStreamingStarted={() => setIsLoading(false)}
          message={message}
          setMessage={setMessage}
          onChatSubmit={handleChatSubmit}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          refreshKey={refreshKey}
          setRefreshKey={setRefreshKey}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />
      ) : (
        <InitialScreen
          message={message}
          setMessage={setMessage}
          isLoading={isLoading}
          textareaRef={textareaRef}
          attachments={attachments}
          onImageDrop={handleImageFiles}
          onImageSelect={handleImageFiles}
          onRemoveAttachment={handleRemoveAttachment}
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onSubmit={handleInitialSubmit}
        />
      )}
    </div>
  )
}

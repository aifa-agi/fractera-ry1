// components/home/home-client/chat-interface/chat-layout.tsx

'use client'

import { ReactNode } from 'react'
import { ResizableLayout } from '@/components/shared/resizable-layout'

type ActivePanel = 'chat' | 'preview'

type ChatLayoutProps = {
  activePanel: ActivePanel
  isFullscreen: boolean
  setIsFullscreen: (value: boolean) => void
  refreshKey: number
  setRefreshKey: (key: number | ((prev: number) => number)) => void
  leftPanel: ReactNode
  rightPanel: ReactNode
}

export function ChatLayout({
  activePanel,
  leftPanel,
  rightPanel,
}: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-64px-40px)] md:h-[calc(100vh-64px)]">
      <ResizableLayout
        className="flex-1 min-h-0"
        singlePanelMode={false}
        activePanel={activePanel === 'chat' ? 'left' : 'right'}
        leftPanel={leftPanel}
        rightPanel={rightPanel}
      />
    </div>
  )
}

// components/home/home-client/chat-interface/mobile-toolbar.tsx

'use client'

import { BottomToolbar } from '@/components/shared/bottom-toolbar'

type ActivePanel = 'chat' | 'preview'

type MobileToolbarProps = {
  activePanel: ActivePanel
  onPanelChange: (panel: ActivePanel) => void
  hasPreview: boolean
}

export function MobileToolbar({
  activePanel,
  onPanelChange,
  hasPreview,
}: MobileToolbarProps) {
  return (
    <div className="md:hidden">
      <BottomToolbar
        activePanel={activePanel}
        onPanelChange={onPanelChange}
        hasPreview={hasPreview}
      />
    </div>
  )
}

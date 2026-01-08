// components/home/home-client/image-handling/image-preview-list.tsx

import { PromptInputImagePreview } from '@/components/ai-elements/prompt-input'
import type { ImageAttachment } from '@/components/ai-elements/prompt-input'

type ImagePreviewListProps = {
  attachments: ImageAttachment[]
  onRemove: (id: string) => void
}

export function ImagePreviewList({ attachments, onRemove }: ImagePreviewListProps) {
  return (
    <PromptInputImagePreview
      attachments={attachments}
      onRemove={onRemove}
    />
  )
}

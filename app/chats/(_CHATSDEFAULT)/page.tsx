// app/chats/(_HOME)/page.tsx

import { Suspense } from 'react'
import { ChatsClient } from '@/components/chats/chats-client'

export default function ChatsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatsClient />
    </Suspense>
  )
}

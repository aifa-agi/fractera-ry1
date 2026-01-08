// components/home/home-client/hooks/use-url-reset.ts

'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export function useUrlReset(onReset: () => void) {
  const searchParams = useSearchParams()

  // Reset UI when reset parameter is present
  useEffect(() => {
    const reset = searchParams.get('reset')
    if (reset === 'true') {
      onReset()

      // Remove the reset parameter from URL without triggering navigation
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('reset')
      window.history.replaceState({}, '', newUrl.pathname)
    }
  }, [searchParams, onReset])
}

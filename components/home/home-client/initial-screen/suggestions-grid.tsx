// components/home/home-client/initial-screen/suggestions-grid.tsx

'use client'

import { useRef } from 'react'
import { Suggestions, Suggestion } from '@/components/ai-elements/suggestion'

type SuggestionsGridProps = {
  setMessage: (value: string) => void
}

export function SuggestionsGrid({ setMessage }: SuggestionsGridProps) {
  const formRef = useRef<HTMLFormElement | null>(null)

  const handleSuggestionClick = (value: string) => {
    setMessage(value)

    // Submit after setting message
    setTimeout(() => {
      const form = formRef.current ?? document.querySelector('form')
      if (form instanceof HTMLFormElement) {
        form.requestSubmit()
      }
    }, 0)
  }

  return (
    <div className="mt-4 max-w-2xl mx-auto">
      <Suggestions>
        <Suggestion
          onClick={() => handleSuggestionClick('Landing page')}
          suggestion="Landing page"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('Todo app')}
          suggestion="Todo app"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('Dashboard')}
          suggestion="Dashboard"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('Blog')}
          suggestion="Blog"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('E-commerce')}
          suggestion="E-commerce"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('Portfolio')}
          suggestion="Portfolio"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('Chat app')}
          suggestion="Chat app"
        />
        <Suggestion
          onClick={() => handleSuggestionClick('Calculator')}
          suggestion="Calculator"
        />
      </Suggestions>
    </div>
  )
}

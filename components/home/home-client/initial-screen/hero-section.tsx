// components/home/home-client/initial-screen/hero-section.tsx

'use client'

type HeroSectionProps = {
  title?: string
}

export function HeroSection({ title = 'What can we build together?' }: HeroSectionProps) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
    </div>
  )
}

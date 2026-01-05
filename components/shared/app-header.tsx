'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChatSelector } from './chat-selector'
import { MobileMenu } from './mobile-menu'
import { useSession } from 'next-auth/react'
import { UserNav } from '@/components/user-nav'
import { Button } from '@/components/ui/button'
import { Info, Zap, Layers, Database } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface AppHeaderProps {
  className?: string
}

// Component that uses useSearchParams - needs to be wrapped in Suspense
function SearchParamsHandler() {
  const searchParams = useSearchParams()
  const { update } = useSession()

  // Force session refresh when redirected after auth
  useEffect(() => {
    const shouldRefresh = searchParams.get('refresh') === 'session'

    if (shouldRefresh) {
      // Force session update
      update()

      // Clean up URL without causing navigation
      const url = new URL(window.location.href)
      url.searchParams.delete('refresh')
      window.history.replaceState({}, '', url.pathname)
    }
  }, [searchParams, update])

  return null
}

export function AppHeader({ className = '' }: AppHeaderProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isHomepage = pathname === '/'
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)

  // Handle logo click - reset UI if on homepage, otherwise navigate to homepage
  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHomepage) {
      e.preventDefault()
      // Add reset parameter to trigger UI reset
      window.location.href = '/?reset=true'
    }
    // If not on homepage, let the Link component handle navigation normally
  }

  return (
    <div
      className={`${!isHomepage ? 'border-b border-border dark:border-input' : ''} ${className}`}
    >
      {/* Handle search params with Suspense boundary */}
      <Suspense fallback={null}>
        <SearchParamsHandler />
      </Suspense>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Selector */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
            >
              Fractera
            </Link>

            {/* Hide ChatSelector on mobile */}
            <div className="hidden lg:block">
              <ChatSelector />
            </div>
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              className="py-1.5 px-2 h-fit text-sm"
              onClick={() => setIsInfoDialogOpen(true)}
            >
              <Info size={16} />
              What's This?
            </Button>

            <UserNav session={session} />
          </div>

          {/* Mobile right side */}
          <div className="flex lg:hidden items-center gap-2">
            <UserNav session={session} />
            <MobileMenu onInfoDialogOpen={() => setIsInfoDialogOpen(true)} />
          </div>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        {/* IMPORTANT:
            - p-0 + inner padding container gives full control
            - overflow-x-hidden guarantees no global horizontal scroll from children
        */}
        <DialogContent className="w-[calc(100vw-2rem)] sm:w-full max-w-4xl max-h-[85vh] overflow-y-auto overflow-x-hidden p-0">
          {/* Inner container: has normal spacing/padding, and cannot exceed modal width */}
          <div className="p-6 min-w-0 max-w-full space-y-6">
            <DialogHeader className="min-w-0 max-w-full">
              <DialogTitle className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fractera AI Platform
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 dark:text-gray-400">
                Enterprise-grade Full Stack application generation powered by patented AI architecture
              </DialogDescription>
            </DialogHeader>

            {/* Main Description */}
            <div className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 min-w-0 max-w-full">
              <p className="text-base">
                <strong>Fractera</strong> is a professional platform for generating Enterprise-class Full Stack applications using artificial intelligence. Create comprehensive solutions of any scale — from frontend components to server logic and integrations with external services like Stripe, databases, and APIs.
              </p>
            </div>

            {/* Core Capabilities */}
            <section className="space-y-3 min-w-0 max-w-full">
              {/* Header must stay “fixed” (i.e., not scroll horizontally) */}
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                Core Capabilities
              </h3>

              {/* Horizontal scroll ONLY here */}
              <div className="max-w-full overflow-x-auto overscroll-x-contain pb-2">
                {/* w-max ensures cards take their natural total width, and the parent scrolls */}
                <div className="flex w-max gap-4 pb-2">
                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20">
                    <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Unlimited Scaling
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Support for fullstack projects of any size without quality degradation. Growing projects remain stable while competitive systems fail.
                    </p>
                  </div>

                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20">
                    <Layers className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Instant Module Reuse
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Built-in library of business modules: authentication, payments, CMS, analytics. Add ready-made components with a single command.
                    </p>
                  </div>

                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20">
                    <Database className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Built-in SEO Optimization
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Automatic Schema.org, Open Graph metadata, pre-rendered content, and optimized URL structure for maximum search engine visibility.
                    </p>
                  </div>

                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20">
                    <svg
                      className="w-6 h-6 text-orange-600 dark:text-orange-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Multi-language SEO Ready
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Unlimited language support with automatic hreflang markup, localized sitemaps, and market-specific SEO strategies.
                    </p>
                  </div>

                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/20">
                    <svg
                      className="w-6 h-6 text-pink-600 dark:text-pink-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Granular Version Control
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Roll back individual features, not entire projects. Each task has its own version history. Zero merge conflicts.
                    </p>
                  </div>

                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20">
                    <svg
                      className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Advanced Role Management
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Pre-built roles with auto-generated interfaces: Admin, Manager, Editor, Customer, Subscriber, Architect. Custom roles supported.
                    </p>
                  </div>

                  <div className="shrink-0 w-72 flex flex-col items-start space-y-2 p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950/30 dark:to-teal-900/20">
                    <svg
                      className="w-6 h-6 text-teal-600 dark:text-teal-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                      Token Optimization
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Minimal token usage through unique architecture. System automatically optimizes load while maintaining development speed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Patented AI Architecture */}
            <div className="space-y-3 bg-gray-50 dark:bg-gray-900/50 p-5 rounded-lg border border-gray-200 dark:border-gray-700 min-w-0 max-w-full">
              <h3 className="font-semibold text-base text-gray-900 dark:text-white mb-3">
                Patented AI Architecture
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Powered by proprietary evolving and self-replicating AI agents that autonomously improve based on project experience. The system learns from mistakes, self-replicates for parallel component development, and automatically enhances quality without manual intervention.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mt-4">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 mr-3 shrink-0"></span>
                  <span>
                    <strong>React & Next.js:</strong> App Router, server components, parallel routes, modern patterns
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 mr-3 shrink-0"></span>
                  <span>
                    <strong>Server Logic:</strong> API routes, server actions, authentication, middleware, RBAC
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-600 dark:bg-green-400 mt-2 mr-3 shrink-0"></span>
                  <span>
                    <strong>Integrations:</strong> PostgreSQL, MongoDB, Stripe payments, email services, external APIs
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700 min-w-0 max-w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ready to build Enterprise applications with AI?
              </p>
              <div className="flex gap-3">
                <Button variant="outline" asChild className="text-sm whitespace-nowrap">
                  <Link href="https://fractera.ai" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </Link>
                </Button>
                <Button
                  onClick={() => setIsInfoDialogOpen(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm whitespace-nowrap"
                >
                  Try Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

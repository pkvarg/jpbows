'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function LangSwitcher() {
  const params = useParams()
  const locale = typeof params.locale === 'string' ? params.locale : 'sk'
  const pathname = usePathname()

  const handleLanguage = (lang: string) => {
    // If we're already on the home page for a locale, we need to use a full reload
    if (pathname === `/${locale}` || pathname === '/') {
      window.location.href = `/${lang}`
    } else {
      // For other pages, extract the path after the locale
      const currentPath = pathname.startsWith(`/${locale}/`)
        ? pathname.substring(locale.length + 2) // +2 for the two slashes
        : pathname.substring(1) // Remove leading slash
      // Navigate to the same path with the new locale
      const newPath = `/${lang}${currentPath ? `/${currentPath}` : ''}`

      // Use window.location for a full page reload
      window.location.href = newPath
    }
  }

  return (
    <div className="flex flex-row gap-4 mr-2">
      <button className="cursor-pointer" onClick={() => handleLanguage('en')}>
        en
      </button>
      <button className="cursor-pointer" onClick={() => handleLanguage('sk')}>
        sk
      </button>
    </div>
  )
}

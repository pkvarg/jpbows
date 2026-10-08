'use client'
import React, { useState } from 'react'
import { useLocale } from 'next-intl'

interface YouTubeEmbedProps {
  videoId: string
  title: string
  className?: string
}

// Loads YouTube only after a click, so visitors are not connected to Google
// (IP address, YouTube cookies) without their action. See /gdpr#youtube.
const YouTubeEmbed = ({ videoId, title, className = 'w-full h-full' }: YouTubeEmbedProps) => {
  const [active, setActive] = useState(false)
  const isEnglish = useLocale() === 'en'

  if (active) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        className={className}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className={`${className} group flex flex-col items-center justify-center gap-4 bg-[#1c1208] text-[#faf8f5] px-6 text-center cursor-pointer`}
      aria-label={isEnglish ? `Play video: ${title}` : `Prehrať video: ${title}`}
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e80e19] transition-transform group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="tracking-[0.15em] uppercase text-sm" style={{ fontFamily: 'var(--font-poiret-one)' }}>
        {isEnglish ? 'Play video' : 'Prehrať video'}
      </span>
      <span className="max-w-md text-sm text-[#e0d8ce]" style={{ fontFamily: 'var(--font-cormorant)' }}>
        {isEnglish
          ? 'The video is played from YouTube (Google). Clicking loads it and Google may store cookies.'
          : 'Video sa prehrá z YouTube (Google). Kliknutím ho načítate a Google môže uložiť cookies.'}
      </span>
    </button>
  )
}

export default YouTubeEmbed

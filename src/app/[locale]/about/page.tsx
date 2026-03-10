'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

const About = () => {
  const t = useTranslations('Home')

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* Hero */}
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
              bow4bass
            </h2>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>
          <h1 className="text-4xl lg:text-6xl text-[#1c1208] italic leading-tight" style={{fontFamily:'var(--font-cormorant)'}}>
            {t('aboutCompanyTitle')}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default About

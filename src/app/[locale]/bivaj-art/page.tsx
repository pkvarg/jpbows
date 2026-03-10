'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const BivajArt = () => {
  const t = useTranslations('BivajArt')

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <h2
              className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              Bivaj Art
            </h2>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>

          <h1
            className="text-3xl lg:text-5xl text-[#1c1208] italic leading-tight mb-4"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {t('title')}
          </h1>
          <p
            className="text-lg lg:text-xl text-[#3d3228] leading-relaxed"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Images Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative h-64 lg:h-80 overflow-hidden border border-[#e0d8ce]">
            <Image
              src="/bivaj01.jpeg"
              alt="Bivaj Art Luthery - Image 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="relative h-64 lg:h-80 overflow-hidden border border-[#e0d8ce]">
            <Image
              src="/bivaj02.jpg"
              alt="Bivaj Art Luthery - Image 2"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-[#f0ece6] py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-10">
            <p
              className="text-lg lg:text-xl text-[#3d3228] leading-relaxed text-justify"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {t('intro')}
            </p>

            <div className="w-8 h-0.5 bg-[#e80e19]" />

            <p
              className="text-lg lg:text-xl text-[#3d3228] leading-relaxed text-justify"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {t('materials')}
            </p>

            <div className="w-8 h-0.5 bg-[#e80e19]" />

            <p
              className="text-lg lg:text-xl text-[#3d3228] leading-relaxed text-justify"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {t('craftsmanship')}
            </p>

            <div className="w-8 h-0.5 bg-[#e80e19]" />

            <p
              className="text-lg lg:text-xl text-[#1c1208] leading-relaxed text-justify italic font-semibold"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {t('conclusion')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BivajArt

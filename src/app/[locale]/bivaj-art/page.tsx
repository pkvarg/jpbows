'use client'

import React from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const BivajArt = () => {
  const t = useTranslations('BivajArt')

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <div className="text-center space-y-12 mt-8 mx-4">
        <div className="space-y-8 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
            {t('title')}
          </h1>
          <h2 className="text-xl lg:text-2xl font-bold text-[#2f0000]">{t('subtitle')}</h2>

          {/* Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg shadow-md">
              <Image
                src="/bivaj01.jpeg"
                alt="Bivaj Art Luthery - Image 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-64 lg:h-80 overflow-hidden rounded-lg shadow-md">
              <Image
                src="/bivaj02.jpg"
                alt="Bivaj Art Luthery - Image 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="text-justify">
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold ">{t('intro')}</p>

            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold mt-8 ">
              {t('materials')}
            </p>

            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold mt-8 ">
              {t('craftsmanship')}
            </p>

            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold mt-8 ">
              {t('conclusion')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BivajArt

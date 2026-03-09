'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const pillars = [
  { num: '01' },
  { num: '02' },
  { num: '03' },
]

const Intro = () => {
  const t = useTranslations('Home')

  const titles = [t('introSectionBowsTitle'), t('introSectionRepairsTitle'), t('introSectionInstrumentsTitle')]
  const texts = [t('introSectionBowsText'), t('introSectionRepairsText'), t('introSectionInstrumentsText')]

  return (
    <div className="bg-[#0f0b06] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center gap-6 mb-32"
        >
          <div className="h-px flex-1 bg-[#c9903a]/20" />
          <span
            className="text-[#c9903a] tracking-[0.3em] text-base lg:text-lg uppercase"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            atelier
          </span>
          <div className="h-px flex-1 bg-[#c9903a]/20" />
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
              className={`py-10 px-8 lg:px-10 ${i < 2 ? 'lg:border-r border-[#c9903a]/15' : ''} ${i > 0 ? 'border-t lg:border-t-0 border-[#c9903a]/15' : ''}`}
            >
              {/* Number */}
              <span
                className="block text-[#e80e19]/30 text-6xl lg:text-7xl font-black mb-6 leading-none"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {pillar.num}
              </span>

              {/* Title */}
              <h2
                className="text-[#f5f0e8] text-xl lg:text-2xl font-semibold italic mb-5 leading-snug"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {titles[i]}
              </h2>

              {/* Red accent line */}
              <div className="w-8 h-0.5 bg-[#e80e19] mb-5" />

              {/* Text */}
              <p
                className="text-[#c4b8a8] text-lg lg:text-xl leading-relaxed"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
              >
                {texts[i]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* YouTube embed */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-24"
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="h-px flex-1 bg-[#c9903a]/15" />
            <span
              className="text-[#c9903a]/80 tracking-[0.3em] text-base lg:text-lg uppercase"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              video
            </span>
            <div className="h-px flex-1 bg-[#c9903a]/15" />
          </div>
          <div className="relative border border-[#c9903a]/15">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/C7-gOvQDhzM"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default Intro

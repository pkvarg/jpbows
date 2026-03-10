'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const pillars = [{ num: '01' }, { num: '02' }, { num: '03' }]

const Intro = () => {
  const t = useTranslations('Home')
  const titles = [t('introSectionBowsTitle'), t('introSectionRepairsTitle'), t('introSectionInstrumentsTitle')]
  const texts = [t('introSectionBowsText'), t('introSectionRepairsText'), t('introSectionInstrumentsText')]

  return (
    <div className="bg-[#faf8f5] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-6 mb-28"
        >
          <div className="w-8 h-0.5 bg-[#e80e19]" />
          <span
            className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            ateliér
          </span>
          <div className="h-px flex-1 bg-[#e0d8ce]" />
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`py-10 px-0 lg:px-10 ${i < 2 ? 'lg:border-r border-[#e0d8ce]' : ''} ${i > 0 ? 'border-t lg:border-t-0 border-[#e0d8ce]' : ''}`}
            >
              {/* Number */}
              <span
                className="block text-[#e80e19]/15 text-[6rem] lg:text-[7rem] font-bold mb-2 leading-none"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {pillar.num}
              </span>

              {/* Title */}
              <h2
                className="text-[#1c1208] text-2xl lg:text-3xl font-semibold italic mb-5 leading-snug"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {titles[i]}
              </h2>

              {/* Red accent */}
              <div className="w-8 h-0.5 bg-[#e80e19] mb-5" />

              {/* Text */}
              <p
                className="text-[#3d3228] text-lg lg:text-xl leading-relaxed"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {texts[i]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* YouTube embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-24"
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <span
              className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              video
            </span>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>
          <div className="border border-[#e0d8ce]">
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

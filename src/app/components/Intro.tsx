'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const Intro = () => {
  const t = useTranslations('Home')
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-[#fefefe] py-12 lg:py-20">
      <div className="container mx-auto px-6 mt-16">
        <motion.div
          className="text-center space-y-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp} className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              {t('introSectionBowsTitle')}
            </h2>
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              {t('introSectionBowsText')}
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              {t('introSectionRepairsTitle')}
            </h2>
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              {t('introSectionRepairsText')}
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              {t('introSectionInstrumentsTitle')}
            </h2>
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              {t('introSectionInstrumentsText')}
            </p>
            <div className="aspect-video w-full pt-4 lg:pt-8">
              <iframe
                src={`https://www.youtube.com/embed/C7-gOvQDhzM`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Intro

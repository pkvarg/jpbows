'use client'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const Hero = () => {
  const pathname = usePathname()
  const isEnglish = pathname.includes('/en')

  return (
    <div className="relative min-h-screen flex items-end lg:items-center overflow-hidden">

      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero2.jpg"
          alt="bow4bass"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          priority
        />
        {/* Gradient overlay: strong on left, fading to transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/85 to-[#faf8f5]/10" />
        {/* Bottom fade for mobile text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/60 via-transparent to-transparent lg:hidden" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-16 xl:px-24 py-32 lg:py-40">
        <div className="max-w-xl">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-4 mb-12"
          >
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <span
              className="text-[#8b6914] tracking-[0.3em] text-sm lg:text-base uppercase"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {isEnglish ? 'Handcrafted Bows' : 'Ručná výroba sláčikov'}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[5rem] sm:text-[6.5rem] lg:text-[7rem] xl:text-[8.5rem] font-light italic text-[#1c1208] leading-[0.9] tracking-tight mb-8"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            bow<span className="text-[#e80e19] not-italic font-bold">4</span>bass
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full h-0.5 bg-[#e0d8ce] mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-[#3d3228] text-lg lg:text-xl xl:text-2xl leading-relaxed max-w-md mb-10"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {isEnglish
              ? 'Master-crafted double bass bows and instruments from the heart of Slovakia.'
              : 'Majstrovská výroba sláčikov, predaj a prenájom hudobných nástrojov.'}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/bows"
              className="bg-[#e80e19] text-white px-10 py-4 text-base lg:text-lg tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-all duration-300 text-center"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {isEnglish ? 'Explore Bows' : 'Na\u0161e sl\u00E1\u010Diky'}
            </Link>
            <Link
              href="/about-me"
              className="border border-[#1c1208] text-[#1c1208] px-10 py-4 text-base lg:text-lg tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] hover:text-white transition-all duration-300 text-center"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {isEnglish ? 'About the Maker' : 'O majstrovi'}
            </Link>
          </motion.div>

          {/* Bottom decorative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="hidden lg:flex items-center gap-4 mt-16"
          >
            <div className="h-px w-8 bg-[#e0d8ce]" />
            <span className="text-[#9b8f84] text-sm tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-poiret-one)' }}>
              bow4bass.com
            </span>
          </motion.div>

        </div>
      </div>

    </div>
  )
}

export default Hero

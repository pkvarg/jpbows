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
    <div className="relative h-screen min-h-[620px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/hero2.jpg"
        alt="bow4bass"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
        priority
        className="scale-[1.04] transition-transform duration-[8s] hover:scale-100"
      />

      {/* Multi-stop dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0b06]/80 via-[#0f0b06]/60 to-[#0f0b06]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f0b06]/60 via-transparent to-[#0f0b06]/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
          className="flex items-center gap-5 mb-8"
        >
          <div className="h-px w-12 lg:w-20 bg-[#c9903a]" />
          <span
            className="text-[#e8b86d] tracking-[0.25em] text-base lg:text-xl uppercase"
            style={{ fontFamily: 'var(--font-poiret-one)', textShadow: '0 1px 12px rgba(0,0,0,0.9)' }}
          >
            {isEnglish ? 'Handcrafted Bows \u00B7 Slovakia' : 'Ručná výroba sláčikov \u00B7 Slovensko'}
          </span>
          <div className="h-px w-12 lg:w-20 bg-[#c9903a]" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[4.5rem] sm:text-[6rem] lg:text-[8.5rem] xl:text-[10rem] font-black italic text-[#f5f0e8] leading-none tracking-tight mb-0"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          bow<span className="text-[#e80e19]">4</span>bass
        </motion.h1>

        {/* Red line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0, ease: 'easeInOut' }}
          className="w-24 h-0.5 bg-[#e80e19] my-6 origin-center"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: 'easeOut' }}
          className="text-[#f5f0e8] tracking-[0.2em] text-base lg:text-xl uppercase mb-10"
          style={{ fontFamily: 'var(--font-poiret-one)', textShadow: '0 1px 12px rgba(0,0,0,0.9)' }}
        >
          {isEnglish ? 'Handcrafted double bass bows & instruments' : 'Ru\u010Dne vyr\u00E1ban\u00E9 sl\u00E1\u010Diky a hudobn\u00E9 n\u00E1stroje'}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: 'easeOut' }}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <Link
            href="/bows"
            className="group border border-[#e80e19] text-[#f5f0e8] px-10 py-4 text-base lg:text-lg tracking-[0.2em] uppercase hover:bg-[#e80e19] transition-all duration-300 bg-[#0f0b06]/40 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            {isEnglish ? 'Explore Bows' : 'Na\u0161e sl\u00E1\u010Diky'}
          </Link>
          <Link
            href="/about-me"
            className="group border border-[#e8b86d]/70 text-[#e8b86d] px-10 py-4 text-base lg:text-lg tracking-[0.2em] uppercase hover:border-[#e8b86d] hover:text-[#f5f0e8] transition-all duration-300 bg-[#0f0b06]/40 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            {isEnglish ? 'About the Maker' : 'O majstrovi'}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-[#c9903a]/70 to-transparent" />
        <span className="text-[#c9903a]/70 text-sm tracking-[0.3em] uppercase" style={{ fontFamily: 'var(--font-poiret-one)' }}>
          scroll
        </span>
      </motion.div>
    </div>
  )
}

export default Hero

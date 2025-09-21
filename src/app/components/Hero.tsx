'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

const Hero = () => {
  return (
    <div className="relative min-h-[40vh] lg:min-h-screen overflow-hidden bg-[#f1f1ef]">
      <Image
        src="/01c.png"
        alt="Hero background"
        fill
        className="lg:object-center object-contain"
        priority
      />
    </div>
  )
}

export default Hero

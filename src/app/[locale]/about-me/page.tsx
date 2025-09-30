'use client'
import React from 'react'
//import { motion } from 'framer-motion'
import About_Me from '@/app/components/AboutMe'

const AboutMe = () => {
  // const fadeInUp = {
  //   initial: { opacity: 0, y: 60 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { duration: 0.8, ease: 'easeOut' },
  // }

  // const staggerContainer = {
  //   animate: {
  //     transition: {
  //       staggerChildren: 0.3,
  //     },
  //   },
  // }

  return (
    <div className="relative min-h-screen bg-[#fefefe]">
      <div className="container mx-auto px-6">
        <About_Me />
      </div>
    </div>
  )
}

export default AboutMe

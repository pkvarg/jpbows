'use client'
import React from 'react'
import { motion } from 'framer-motion'

const Intro = () => {
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
    <div className="relative min-h-screen bg-[#f1f1ef] py-20">
      <div className="container mx-auto px-6 mt-16">
        <motion.div
          className="text-center space-y-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl lg:text-9xl font-normal leading-tight text-[#e80e19] "
          >
            bow4bass
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-4xl lg:text-5xl leading-relaxed max-w-4xl mx-auto font-normal text-[#2f0000]"
          >
            Exkluzívne kontrabasy a sláčiky inšpirované historickými modelmi z obdobia baroka,
            klasicizmu a raného romantizmu.
          </motion.p>

          <motion.div variants={fadeInUp} className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              Výroba Sláčikov
            </h2>
            <p className="text-4xl leading-relaxed text-[#2f0000]">
              Historické modely pre kontrabas a violone s francúzskou a nemeckou žabkou
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              Kontrabasy
            </h2>
            <p className="text-4xl leading-relaxed text-[#2f0000]">
              Prezentácia nástrojov a sprostredkovanie predaja kvalitných kontrabasov
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              Individuálne Úpravy
            </h2>
            <p className="text-4xl leading-relaxed text-[#2f0000]">
              Nastavenie a úprava nástrojov podľa špecifických požiadaviek každého klienta
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Intro

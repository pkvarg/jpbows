'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

const DoubleBassHero = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const slideInLeft = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: 'easeOut' },
  }

  const slideInRight = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: 'easeOut' },
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight font-serif">
                <span className="block text-[#fee081]">JP Bows</span>
              </h1>

              <p className="text-[20px] text-gray-100 leading-relaxed max-w-xl font-sans font-medium">
                Exkluzívne kontrabasy a sláčiky inšpirované historickými modelmi z obdobia baroka,
                klasicizmu a raného romantizmu.
              </p>
            </motion.div>

            {/* Right Content MOBILE ONLY - Image */}
            <motion.div className="flex lg:hidden relative" initial="initial" animate="animate">
              {/* Main Double Bass Image */}
              <motion.div
                className="relative z-10"
                variants={slideInRight}
                animate={floatingAnimation}
              >
                <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl p-4 shadow-2xl">
                  <Image
                    src="/foto1.jpg"
                    alt="Ján Prievozník"
                    width={500}
                    height={500}
                    className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Services Grid */}
            <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-amber-500/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-[#fee081] font-serif">
                    Výroba Sláčikov
                  </h3>
                </div>
                <p className="text-white text-md leading-relaxed">
                  Historické modely pre kontrabas a violone s francúzskou a nemeckou žabkou
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-red-500/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-[#fee081] font-serif">Kontrabasy</h3>
                </div>
                <p className="text-white text-md leading-relaxed">
                  Prezentácia nástrojov a sprostredkovanie predaja kvalitných kontrabasov
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700/50 hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 md:col-span-2"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-[#fee081] font-serif">
                    Individuálne Úpravy
                  </h3>
                </div>
                <p className="text-white text-md leading-relaxed">
                  Nastavenie a úprava nástrojov podľa špecifických požiadaviek každého klienta
                </p>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center items-center"
            >
              <motion.button
                className="bg-[#fee081] hover:bg-transparent hover:text-[#fee081] border-2 hover:border-[#fee081] text-black px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Novinky
              </motion.button>

              <motion.button
                className="border-2 border-[#fee081] text-[#fee081] hover:bg-[#fee081] hover:text-black px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 font-sans"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={'/contact'}> Kontakt</Link>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content Desktop ONLY - Image */}
          <motion.div
            className="hidden lg:flex relative ml-auto"
            initial="initial"
            animate="animate"
          >
            {/* Main Double Bass Image */}
            <motion.div
              className="relative z-10"
              variants={slideInRight}
              animate={floatingAnimation}
            >
              <div className="bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl p-6 shadow-2xl">
                <Image
                  src="/foto1.jpg"
                  alt="Ján Prievozník"
                  width={500}
                  height={500}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <div className="w-6 h-10 border-2 border-[#fee081] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#fee081] rounded-full mt-2"></div>
        </div>
      </motion.div> */}
    </div>
  )
}

export default DoubleBassHero

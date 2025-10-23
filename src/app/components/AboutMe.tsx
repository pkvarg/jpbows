'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const About_Me = () => {
  const t = useTranslations('Home')
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const imageAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1, ease: 'easeOut' },
  }

  return (
    <div className="relative min-h-screen bg-[#fefefe] overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Section Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold text-center text-[#e80e19] mb-16"
          >
            {t('aboutMeTitle')}
          </motion.h2>

          <motion.div variants={fadeInUp} className="space-y-8 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider text-center">
              {t('aboutMeName')}
            </h3>

            <motion.div variants={fadeInUp} className="text-[#2f0000] leading-relaxed">
              <motion.div
                variants={imageAnimation}
                className="hidden lg:float-left lg:mr-12 lg:mb-8 lg:block"
              >
                <Image
                  src="/foto1.jpg"
                  alt="Ján Prievozník"
                  width={300}
                  height={300}
                  className="w-[300px] h-[350px] object-cover rounded-2xl shadow-lg"
                />
              </motion.div>

              <div className="space-y-6 text-center lg:text-justify">
                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara1')}
                </p>

                <motion.div
                  variants={imageAnimation}
                  className="lg:hidden flex justify-center my-8"
                >
                  <Image
                    src="/foto1.jpg"
                    alt="Ján Prievozník"
                    width={300}
                    height={300}
                    className="w-[250px] h-[300px] object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara2')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara3')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara4')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara5')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara6')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara7')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara8')}
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  {t('aboutMePara9')}
                </p>
              </div>

              <div className="clear-left"></div>
            </motion.div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div variants={fadeInUp} className="mt-20">
            <h3 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider text-center mb-12">
              {t('galleryTitle')}
            </h3>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.div
                  key={num}
                  variants={imageAnimation}
                  className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
                >
                  <Image
                    src={`/g${num}.webp`}
                    alt={`${t('galleryImageAlt')} ${num}`}
                    width={400}
                    height={300}
                    className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>

            {/* Video Section */}
            <div className="mt-16">
              <h4 className="text-2xl lg:text-3xl font-semibold text-[#e80e19] text-center mb-8">
                {t('videosTitle')}
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Video 1 */}
                <motion.div
                  variants={imageAnimation}
                  className="relative overflow-hidden rounded-2xl shadow-xl"
                >
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-2xl"
                      src="https://www.youtube.com/embed/NLlnsnvpjjA"
                      title="YouTube video 1"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>

                {/* Video 2 */}
                <motion.div
                  variants={imageAnimation}
                  className="relative overflow-hidden rounded-2xl shadow-xl"
                >
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-2xl"
                      src="https://www.youtube.com/embed/E47SbwkXUxI"
                      title="YouTube video 2"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About_Me

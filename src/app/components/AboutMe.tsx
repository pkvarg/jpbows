'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const About_Me = () => {
  const t = useTranslations('Home')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryImages = [1, 2, 3, 4, 5, 6]

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

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeLightbox()
  }

  return (
    <div className="relative min-h-screen bg-[#faf8f5] overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Section Title */}
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-6 mb-16">
                <div className="w-8 h-0.5 bg-[#e80e19]" />
                <span style={{fontFamily:'var(--font-poiret-one)',color:'#8b6914',letterSpacing:'0.3em',fontSize:'14px',textTransform:'uppercase'}}>
                  {t('aboutMeTitle')}
                </span>
                <div className="h-px flex-1 bg-[#e0d8ce]" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-8 max-w-4xl mx-auto">
              <h3 className="text-3xl lg:text-4xl italic text-[#1c1208] tracking-wider text-center" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('aboutMeName')}
              </h3>

              <motion.div variants={fadeInUp} className="text-[#3d3228] leading-relaxed">
                <motion.div
                  variants={imageAnimation}
                  className="hidden lg:float-left lg:mr-12 lg:mb-8 lg:block"
                >
                  <Image
                    src="/g4.webp"
                    alt="Jan Prievoznik"
                    width={300}
                    height={300}
                    className="w-[300px] h-[350px] object-cover border border-[#e0d8ce] shadow-lg"
                  />
                </motion.div>

                <div className="space-y-6 text-center lg:text-justify">
                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara1')}</p>

                  <motion.div
                    variants={imageAnimation}
                    className="lg:hidden flex justify-center my-8"
                  >
                    <Image
                      src="/g4.webp"
                      alt="Jan Prievoznik"
                      width={300}
                      height={300}
                      className="w-[250px] h-[300px] object-cover border border-[#e0d8ce] shadow-lg"
                    />
                  </motion.div>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara2')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara3')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara4')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara5')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara6')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara7')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara8')}</p>

                  <p className="text-lg lg:text-xl leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>{t('aboutMePara9')}</p>
                </div>

                <div className="clear-left"></div>
              </motion.div>
            </motion.div>

            {/* Gallery Section */}
            <motion.div variants={fadeInUp} className="mt-20">
              {/* Gallery Header */}
              <div className="flex items-center gap-6 mb-12">
                <div className="w-8 h-0.5 bg-[#e80e19]" />
                <span style={{fontFamily:'var(--font-poiret-one)',color:'#8b6914',letterSpacing:'0.3em',fontSize:'14px',textTransform:'uppercase'}}>
                  {t('galleryTitle')}
                </span>
                <div className="h-px flex-1 bg-[#e0d8ce]" />
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {/* Vertical images g1-g4 */}
                {[1, 2, 3, 4].map((num, idx) => (
                  <motion.div
                    key={num}
                    variants={imageAnimation}
                    onClick={() => openLightbox(idx)}
                    className="relative overflow-hidden border border-[#e0d8ce] shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
                  >
                    <Image
                      src={`/g${num}.webp`}
                      alt={`${t('galleryImageAlt')} ${num}`}
                      width={400}
                      height={600}
                      className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                  </motion.div>
                ))}

                {/* Horizontal images g5-g6 - span 2 columns each on desktop */}
                {[5, 6].map((num, idx) => (
                  <motion.div
                    key={num}
                    variants={imageAnimation}
                    onClick={() => openLightbox(idx + 3)}
                    className="relative overflow-hidden border border-[#e0d8ce] shadow-xl hover:shadow-2xl transition-shadow duration-300 md:col-span-2 cursor-pointer"
                  >
                    <Image
                      src={`/g${num}.webp`}
                      alt={`${t('galleryImageAlt')} ${num}`}
                      width={800}
                      height={400}
                      className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Video Section */}
              <div className="mt-16">
                {/* Videos Header */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-8 h-0.5 bg-[#e80e19]" />
                  <span style={{fontFamily:'var(--font-poiret-one)',color:'#8b6914',letterSpacing:'0.3em',fontSize:'14px',textTransform:'uppercase'}}>
                    {t('videosTitle')}
                  </span>
                  <div className="h-px flex-1 bg-[#e0d8ce]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* Video 1 */}
                  <motion.div
                    variants={imageAnimation}
                    className="relative overflow-hidden border border-[#e0d8ce] shadow-xl"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
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
                    className="relative overflow-hidden border border-[#e0d8ce] shadow-xl"
                  >
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white hover:text-[#e80e19] transition-all"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white hover:text-[#e80e19] transition-all"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-4 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white hover:text-[#e80e19] transition-all"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Container */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={`/g${galleryImages[currentImageIndex]}.webp`}
                alt={`${t('galleryImageAlt')} ${galleryImages[currentImageIndex]}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-lg font-semibold">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === currentImageIndex ? 'w-6' : ''
                  }`}
                  style={{
                    backgroundColor:
                      index === currentImageIndex ? '#E80D19' : 'rgba(232, 13, 25, 0.5)',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default About_Me

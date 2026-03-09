'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface BassData {
  id: string
  name: string
  enName: string
  description: string
  enDescription: string
  images: string[]
  price: string
  priceEnglish?: string
  published: boolean
  new: boolean
  metadata?: string
  createdAt: string
  updatedAt: string
}

interface BowData {
  id: string
  name: string
  enName: string
  description: string
  enDescription: string
  images: string[]
  price: string
  priceEnglish?: string
  published: boolean
  new: boolean
  metadata?: string
  createdAt: string
  updatedAt: string
}

interface Product {
  id: string
  name: string
  enName: string
  description: string
  enDescription: string
  images: string[]
  price: string
  priceEnglish?: string
  type: 'bass' | 'bow'
}

interface UseAutoSlideArgs {
  products: Product[]
  currentIndex: number
  nextSlide: () => void
}

const NewItemsSlider = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  // Determine if we're on the English version based on URL
  const isEnglish = pathname.includes('/en')

  useEffect(() => {
    fetchNewProducts()
  }, [])

  const fetchNewProducts = async () => {
    try {
      setLoading(true)

      // Fetch both basses and bows
      const [bassesResponse, bowsResponse] = await Promise.all([
        fetch('/api/basses'),
        fetch('/api/bows'),
      ])

      if (!bassesResponse.ok || !bowsResponse.ok) {
        throw new Error('Failed to fetch products')
      }

      const bassesData = await bassesResponse.json()
      const bowsData = await bowsResponse.json()

      // Filter only new and published products (no language filtering needed now)
      const newBasses = bassesData
        .filter((bass: BassData) => bass.published && bass.new)
        .map((bass: BassData) => ({
          ...bass,
          type: 'bass' as const,
        }))

      const newBows = bowsData
        .filter((bow: BowData) => bow.published && bow.new)
        .map((bow: BowData) => ({
          ...bow,
          type: 'bow' as const,
        }))

      // Combine and sort by date (newest first)
      const allNewProducts = [...newBasses, ...newBows].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

      setProducts(allNewProducts)
    } catch (err) {
      console.error('Error fetching new products:', err)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  function useAutoSlide({ products, currentIndex, nextSlide }: UseAutoSlideArgs): void {
    const setupInterval = useCallback(() => {
      if (products.length > 1) {
        const interval = setInterval(() => {
          nextSlide()
        }, 5000)
        return () => clearInterval(interval)
      }
    }, [products.length, nextSlide])

    useEffect(() => {
      const cleanup = setupInterval()
      return cleanup
    }, [currentIndex, setupInterval])
  }

  useAutoSlide({
    products,
    currentIndex,
    nextSlide,
  })

  if (loading) {
    return (
      <div className="bg-[#0f0b06] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t border-b border-[#c9903a]"></div>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  const currentProduct = products[currentIndex]

  // Get the appropriate name and description based on language
  const displayName =
    isEnglish && currentProduct.enName ? currentProduct.enName : currentProduct.name
  const displayDescription =
    isEnglish && currentProduct.enDescription
      ? currentProduct.enDescription
      : currentProduct.description

  return (
    <section className="bg-[#0f0b06] py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#1c1510_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-28">
          <div className="h-px flex-1 bg-[#c9903a]/20" />
          <h2
            className="text-[#c9903a] tracking-[0.25em] text-sm lg:text-base uppercase"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            {isEnglish ? 'New Arrivals' : 'Novinky'}
          </h2>
          <div className="h-px flex-1 bg-[#c9903a]/20" />
        </div>

        {/* Slider card */}
        <div className="border border-[#c9903a]/15 bg-[#1c1510] relative">
          <div className="flex flex-col lg:flex-row min-h-[480px]">

            {/* Image panel */}
            <div className="lg:w-1/2 relative h-72 lg:h-auto bg-[#0f0b06]">
              <AnimatePresence mode="wait">
                {currentProduct.images.length > 0 ? (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentProduct.images[0]}
                      alt={displayName}
                      fill
                      className="object-contain p-8 lg:p-12"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#8a7b6a] text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-poiret-one)' }}>
                      No image
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Content panel */}
            <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#c9903a]/15">
              {/* Category badge */}
              <span
                className="text-[#c9903a] tracking-[0.25em] text-sm uppercase mb-6"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
              >
                {currentProduct.type === 'bass'
                  ? (isEnglish ? 'Instrument' : 'N\u00E1stroj')
                  : (isEnglish ? 'Bow' : 'Sl\u00E1\u010Dik')}
              </span>

              {/* Name */}
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4 }}
                  className="text-[#f5f0e8] text-2xl lg:text-3xl font-semibold italic mb-4 leading-snug"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {displayName}
                </motion.h3>
              </AnimatePresence>

              {/* Red divider */}
              <div className="w-8 h-0.5 bg-[#e80e19] mb-6" />

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[#c4b8a8] text-lg lg:text-xl leading-relaxed mb-8 line-clamp-4"
                  style={{ fontFamily: 'var(--font-poiret-one)' }}
                >
                  {displayDescription}
                </motion.p>
              </AnimatePresence>

              {/* Price */}
              {currentProduct.price && (
                <p
                  className="text-[#c9903a] text-xl lg:text-2xl font-semibold mb-8"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {isEnglish && currentProduct.priceEnglish
                    ? currentProduct.priceEnglish
                    : currentProduct.price}
                </p>
              )}

              {/* CTA */}
              <Link
                href={currentProduct.type === 'bass' ? `/bass` : `/bows`}
                className="group inline-flex items-center gap-3 border border-[#e80e19] text-[#f5f0e8] px-8 py-3 text-sm tracking-[0.2em] uppercase hover:bg-[#e80e19] transition-all duration-300 self-start"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
              >
                {isEnglish ? 'View Gallery' : 'Do gal\u00E9rie'}
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation arrows */}
          {products.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#c9903a]/30 text-[#c9903a] hover:border-[#c9903a] hover:text-[#f5f0e8] flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#c9903a]/30 text-[#c9903a] hover:border-[#c9903a] hover:text-[#f5f0e8] flex items-center justify-center transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots + counter */}
        {products.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-[#8a7b6a] text-xs tracking-widest" style={{ fontFamily: 'var(--font-poiret-one)' }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 h-0.5 bg-[#e80e19]'
                      : 'w-2 h-0.5 bg-[#8a7b6a]/40 hover:bg-[#8a7b6a]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[#8a7b6a] text-xs tracking-widest" style={{ fontFamily: 'var(--font-poiret-one)' }}>
              {String(products.length).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}

export default NewItemsSlider

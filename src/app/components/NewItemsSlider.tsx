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
      <div className="bg-[#faf8f5] py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e80e19]"></div>
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
    <section className="bg-[#f0ece6] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="flex items-center gap-6 mb-28">
          <div className="w-8 h-0.5 bg-[#e80e19]" />
          <h2
            className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            {isEnglish ? 'New Arrivals' : 'Novinky'}
          </h2>
          <div className="h-px flex-1 bg-[#e0d8ce]" />
        </div>

        {/* Slider card */}
        <div className="bg-[#faf8f5] border border-[#e0d8ce] relative">
          <div className="flex flex-col lg:flex-row min-h-[480px]">

            {/* Image panel */}
            <div className="lg:w-1/2 relative h-72 lg:h-auto bg-[#f0ece6] border-b lg:border-b-0 lg:border-r border-[#e0d8ce]">
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
                    <span className="text-[#9b8f84] text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-poiret-one)' }}>
                      No image
                    </span>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Content panel */}
            <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center">

              {/* Category */}
              <span
                className="text-[#8b6914] tracking-[0.3em] text-sm uppercase mb-6"
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
                  className="text-[#1c1208] text-3xl lg:text-4xl font-light italic mb-5 leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {displayName}
                </motion.h3>
              </AnimatePresence>

              {/* Divider */}
              <div className="w-8 h-0.5 bg-[#e80e19] mb-6" />

              {/* Description */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${currentIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-[#3d3228] text-lg lg:text-xl leading-relaxed mb-8 line-clamp-4"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {displayDescription}
                </motion.p>
              </AnimatePresence>

              {/* Price */}
              {currentProduct.price && (
                <p
                  className="text-[#1c1208] text-2xl lg:text-3xl font-semibold italic mb-8"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {isEnglish && currentProduct.priceEnglish ? currentProduct.priceEnglish : currentProduct.price}
                </p>
              )}

              {/* CTA */}
              <Link
                href={currentProduct.type === 'bass' ? '/bass' : '/bows'}
                className="inline-flex items-center gap-3 bg-[#e80e19] text-white px-8 py-3 text-base tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-all duration-300 self-start"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
              >
                {isEnglish ? 'View Gallery' : 'Do gal\u00E9rie'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#e0d8ce] text-[#9b8f84] hover:border-[#1c1208] hover:text-[#1c1208] flex items-center justify-center bg-[#faf8f5] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#e0d8ce] text-[#9b8f84] hover:border-[#1c1208] hover:text-[#1c1208] flex items-center justify-center bg-[#faf8f5] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Counter/dots */}
        {products.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className="text-[#9b8f84] text-sm" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex ? 'w-6 h-0.5 bg-[#e80e19]' : 'w-2 h-0.5 bg-[#e0d8ce] hover:bg-[#9b8f84]'
                  }`}
                />
              ))}
            </div>
            <span className="text-[#9b8f84] text-sm" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {String(products.length).padStart(2, '0')}
            </span>
          </div>
        )}

      </div>
    </section>
  )
}

export default NewItemsSlider

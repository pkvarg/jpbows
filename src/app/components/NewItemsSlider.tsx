'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { usePathname } from 'next/navigation'

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
      <div className="bg-[#fefefe] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2f0000]"></div>
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
    <section className="bg-[#fefefe] pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#e80e19]  mb-4">
            {isEnglish ? 'New Items' : 'Novinky'}
          </h2>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="bg-[#fefefe] rounded-2xl border border-[#2f0000]/20 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 relative h-96 lg:h-[500px]">
                {currentProduct.images.length > 0 ? (
                  <div className="relative h-full group">
                    <Image
                      src={currentProduct.images[0]}
                      alt={displayName}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#2f0000]/10">
                    <svg
                      className="w-20 h-20 text-[#2f0000]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center mt-16">
                <h3 className="text-xl lg:text-3xl font-semibold text-[#2f0000] hover:text-[#e6c78c] transition-colors mb-4">
                  {displayName}
                </h3>

                <div className="text-lg tracking-wider font-semibold text-[#2f0000] leading-relaxed mb-6 line-clamp-3">
                  {displayDescription.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                    <div key={index}>{sentence}</div>
                  ))}
                </div>

                {currentProduct.price && (
                  <p className="text-2xl font-semibold text-[#2f0000] mb-8">
                    {isEnglish && currentProduct.priceEnglish
                      ? currentProduct.priceEnglish
                      : currentProduct.price}
                  </p>
                )}

                <Link
                  href={currentProduct.type === 'bass' ? `/bass` : `/bows`}
                  className="inline-flex items-center px-6 py-3 bg-[#e80e19]  hover:bg-white hover:text-[#2f0000] hover:border-1 hover:border-black text-white font-normal rounded-lg transition-all duration-200 self-start group text-2xl w-full lg:w-auto justify-center text-center"
                >
                  {isEnglish ? 'View Gallery' : 'Do galérie'}
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {products.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2  hover:bg-[#2f0000] hover:text-white p-3 rounded-full transition-all border border-[#2f0000]/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2  hover:bg-[#2f0000] hover:text-white p-3 rounded-full transition-all border border-[#2f0000]/50"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {products.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-[#2f0000]'
                      : 'w-2 h-2 bg-[#2f0000]/60 hover:bg-[#2f0000]/80'
                  } rounded-full`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Counter */}
        {products.length > 1 && (
          <div className="text-center mt-4 text-[#2f0000]">
            {currentIndex + 1} {isEnglish ? 'of' : 'z'} {products.length}
          </div>
        )}
      </div>
    </section>
  )
}

export default NewItemsSlider

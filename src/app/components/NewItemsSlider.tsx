'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

interface BassData {
  id: string
  name: string
  description: string
  images: string[]
  available: string
  price: string
  published: boolean
  english: boolean
  new: boolean
  metadata?: string // optional as requested
  createdAt: string
  updatedAt: string
}

// Bow interface based on actual data structure
interface BowData {
  id: string
  name: string
  description: string
  images: string[]
  available: string
  price: string
  published: boolean
  english: boolean
  new: boolean
  metadata?: string // optional as requested
  createdAt: string
  updatedAt: string
}

interface Product {
  id: string
  name: string
  description: string
  images: string[]
  price: string
  type: 'bass' | 'bow'
}

interface UseAutoSlideArgs {
  products: Product[] // Replace `any` with your specific type, e.g., Product[]
  currentIndex: number
  nextSlide: () => void
}

const NewItemsSlider = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

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

      console.log('BData', bassesData)
      console.log('BowData', bowsData)

      // Filter only new and published products
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

  // Auto-slide every 5 seconds
  // useEffect(() => {
  //   if (products.length > 1) {
  //     const interval = setInterval(nextSlide, 5000)
  //     return () => clearInterval(interval)
  //   }
  // }, [currentIndex, products.length, nextSlide])

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
      <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  const currentProduct = products[currentIndex]

  return (
    <section className="bg-transparent py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#fee081] mb-4">Novinky</h2>
          <p className="text-xl text-gray-300">Najnovšie prírastky do našej kolekcie</p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          <div className="backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 relative h-96 lg:h-[500px]">
                {currentProduct.images.length > 0 ? (
                  <div className="relative h-full group">
                    <Image
                      src={currentProduct.images[0]}
                      alt={currentProduct.name}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Product type badge */}
                    {/* <div className="absolute top-4 left-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          currentProduct.type === 'bass'
                            ? 'bg-blue-600/80 text-white'
                            : 'bg-purple-600/80 text-white'
                        }`}
                      >
                        {currentProduct.type === 'bass' ? 'Kontrabas' : 'Sláčik'}
                      </span>
                    </div> */}
                    {/* New badge */}
                    {/* <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg animate-pulse">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        NOVINKA
                      </span>
                    </div> */}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
                    <svg
                      className="w-20 h-20 text-gray-600"
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
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {currentProduct.name}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed mb-6 line-clamp-3">
                  {currentProduct.description}
                </p>

                {currentProduct.price && (
                  <p className="text-2xl font-bold text-[#fee081] mb-8">{currentProduct.price} €</p>
                )}

                <Link
                  href={currentProduct.type === 'bass' ? `/bass` : `/bows`}
                  className="inline-flex items-center px-6 py-3 bg-[#fee081] hover:bg-[#fee081] text-gray-900 font-semibold rounded-lg transition-all duration-200 self-start group"
                >
                  Do galérie
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-gray-600/50"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800/80 hover:bg-gray-700 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-gray-600/50"
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
                      ? 'w-8 h-2 bg-[#fee081]'
                      : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                  } rounded-full`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Counter */}
        {products.length > 1 && (
          <div className="text-center mt-4 text-gray-400">
            {currentIndex + 1} z {products.length}
          </div>
        )}
      </div>
    </section>
  )
}

export default NewItemsSlider

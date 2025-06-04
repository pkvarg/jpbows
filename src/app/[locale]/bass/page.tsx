'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Bass {
  id: string
  images: string[]
  name: string
  description: string
  available: string
  price: string
  published: boolean
  english: boolean
  new: boolean
  createdAt: string
  updatedAt: string
}

// Modal Component for full-size image viewing
const ImageModal = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="relative max-w-7xl max-h-[90vh] w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation arrows if multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Bass Item Component
const BassItem = ({ bass, isEnglish }: { bass: Bass; isEnglish: boolean }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasMultipleImages = bass.images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % bass.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + bass.images.length) % bass.images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <>
      <div className="group relative flex flex-col lg:flex-row gap-8 lg:gap-12 py-12 px-4 lg:px-8 hover:bg-white/[0.02] transition-colors duration-300">
        {/* Image Section - Left Side */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg">
            {bass.images.length > 0 ? (
              <>
                <div
                  className="relative h-full cursor-pointer group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Image
                    src={bass.images[currentImageIndex]}
                    alt={`${bass.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* View icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 bg-white/10 backdrop-blur-sm p-4 rounded-full">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Navigation for multiple images */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        previousImage()
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <svg
                        className="w-6 h-6"
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
                    </button>

                    {/* Thumbnail dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {bass.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            goToImage(index)
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-6'
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
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
        </div>

        {/* Content Section - Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex items-start gap-4 mb-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">{bass.name}</h2>
              {bass.new && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg animate-pulse">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {isEnglish ? 'NEW' : 'NOVINKA'}
                </span>
              )}
            </div>
            {/* <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                bass.available === 'áno'
                  ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/30'
                  : bass.available === 'obmedzená'
                  ? 'bg-yellow-500/10 text-yellow-400 ring-1 ring-yellow-500/30'
                  : 'bg-red-500/10 text-red-400 ring-1 ring-red-500/30'
              }`}
            >
              {isEnglish
                ? bass.available === 'áno'
                  ? 'Available'
                  : bass.available === 'obmedzená'
                  ? 'Limited availability'
                  : 'Not available'
                : bass.available === 'áno'
                ? 'Dostupný'
                : bass.available === 'obmedzená'
                ? 'Obmedzená dostupnosť'
                : 'Nedostupný'}
            </span> */}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">{bass.description}</p>

          {bass.price && (
            <div className="pt-4">
              <p className="text-4xl font-bold text-white">{bass.price} €</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={bass.images}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  )
}

// Main Bass Component
const Bass = () => {
  const [basses, setBasses] = useState<Bass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  // Determine if we're on the English version based on URL
  const isEnglish = pathname.includes('/en/')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchBasses()
  }, [])

  const fetchBasses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/basses')

      if (!response.ok) {
        throw new Error('Failed to fetch basses')
      }

      const data = await response.json()
      // Filter based on published status AND language
      const filteredBasses = data.filter((bass: Bass) => {
        // Must be published
        if (!bass.published) return false

        // Filter by language
        if (isEnglish) {
          return bass.english === true
        } else {
          return bass.english === false
        }
      })

      setBasses(filteredBasses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-white mt-4">Načítavam kontrabasy...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-xl">{error}</p>
          <button
            onClick={fetchBasses}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Skúsiť znova
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Header Section */}
      <div className="relative py-16 px-4 text-center border-b border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Kontrabasy
          </h1>
          <p className="text-xl text-gray-300">Kvalitné majstrovské kontrabasy...</p>
        </div>
      </div>

      {/* Basses List */}
      <div className="max-w-7xl mx-auto divide-y divide-gray-800/50">
        {basses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">
              Žiadne kontrabasy nie sú momentálne k dispozícii.
            </p>
          </div>
        ) : (
          basses.map((bass) => <BassItem key={bass.id} bass={bass} isEnglish={isEnglish} />)
        )}
      </div>
    </div>
  )
}

export default Bass

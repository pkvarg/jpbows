'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Repair {
  id: string
  images: string[]
  name: string
  enName: string
  description: string
  enDescription: string
  published: boolean
  order: number
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-[#E80D19] p-3 rounded-full transition-all"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-[#E80D19] p-3 rounded-full transition-all"
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
                      index === currentIndex ? 'w-6' : ''
                    }`}
                    style={{
                      backgroundColor: index === currentIndex ? '#E80D19' : 'rgba(232, 13, 25, 0.5)'
                    }}
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

// Repair Item Component
const RepairItem = ({
  repair,
  isEnglish,
}: {
  repair: Repair
  isEnglish: boolean
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const hasMultipleImages = repair.images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % repair.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + repair.images.length) % repair.images.length,
    )
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  // Get the appropriate name and description based on language
  const displayName =
    isEnglish && repair.enName ? repair.enName : repair.name
  const displayDescription =
    isEnglish && repair.enDescription
      ? repair.enDescription
      : repair.description

  return (
    <>
      <div className="group relative bg-white mx-4 lg:mx-8 my-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-64 lg:h-80 overflow-hidden">
              {repair.images.length > 0 ? (
                <>
                  <div
                    className="relative h-full cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Image
                      src={repair.images[currentImageIndex]}
                      alt={`${displayName} - Image ${currentImageIndex + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>

                  {/* Navigation for multiple images */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          previousImage()
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#2f0000] p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                      >
                        <svg
                          className="w-4 h-4"
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#2f0000] p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                      >
                        <svg
                          className="w-4 h-4"
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
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {repair.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation()
                              goToImage(index)
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              index === currentImageIndex
                                ? 'bg-white w-4'
                                : 'bg-white/60 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#fefefe]">
                  <svg
                    className="w-12 h-12 text-[#2f0000]/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#e80e19] leading-tight">
                  {displayName}
                </h2>
              </div>

              <div className="text-[#2f0000] text-base lg:text-lg leading-relaxed font-bold">
                {displayDescription.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                  <div key={index}>{sentence}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={repair.images}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  )
}

// Main Repairs Component
const Repairs = () => {
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  // Determine if we're on the English version based on URL
  const isEnglish = pathname.includes('/en/')

  useEffect(() => {
    fetchRepairs()
  }, [])

  const fetchRepairs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/repairs')

      if (!response.ok) {
        throw new Error('Failed to fetch repairs')
      }

      const data = await response.json()
      // Filter only published repairs
      const filteredRepairs = data.filter(
        (repair: Repair) => repair.published,
      )

      // Sort by order (ascending - lower numbers first)
      const sortedRepairs = filteredRepairs.sort(
        (a: Repair, b: Repair) => {
          if (a.order !== b.order) {
            return a.order - b.order
          }
          // If same order, sort by creation date (newest first)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        },
      )

      setRepairs(sortedRepairs)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefefe] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e80e19]"></div>
          <p className="text-[#2f0000] mt-4 text-base lg:text-lg font-medium">
            {isEnglish ? 'Loading repairs...' : 'Načítavam opravy...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fefefe] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#e80e19] text-lg lg:text-xl font-medium mb-4">{error}</p>
          <button
            onClick={fetchRepairs}
            className="px-6 py-2 bg-[#e80e19] hover:bg-[#2f0000] text-white rounded-lg font-medium text-base transition-colors duration-200"
          >
            {isEnglish ? 'Try again' : 'Skúsiť znova'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* Header Section */}
      <div className="relative py-12 px-4 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] mb-3 tracking-wide">
            {isEnglish ? 'Repairs' : 'Opravy'}
          </h1>
          <p className="text-lg lg:text-2xl font-bold text-[#2f0000] leading-relaxed">
            {isEnglish
              ? 'Professional instrument repair services'
              : 'Profesionálne opravy hudobných nástrojov'}
          </p>
        </div>
      </div>

      {/* Repairs List */}
      <div className="max-w-6xl mx-auto pb-12">
        {repairs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#2f0000] text-lg lg:text-xl font-medium">
              {isEnglish
                ? 'No repair services are currently listed.'
                : 'Žiadne opravy nie sú momentálne zverejnené.'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {repairs.map((repair) => (
              <RepairItem
                key={repair.id}
                repair={repair}
                isEnglish={isEnglish}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Repairs

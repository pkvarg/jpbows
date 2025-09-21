'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface Bass {
  id: string
  images: string[]
  name: string
  enName: string
  description: string
  enDescription: string
  price: string
  published: boolean
  new: boolean
  videoUrl: string
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

  // Get the appropriate name and description based on language
  const displayName = isEnglish && bass.enName ? bass.enName : bass.name
  const displayDescription = isEnglish && bass.enDescription ? bass.enDescription : bass.description

  return (
    <>
      <div className="group relative flex flex-col lg:flex-row gap-8 lg:gap-12 py-12 px-4 lg:px-8 hover:bg-[#2f0000]/[0.02] transition-colors duration-300">
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
                    alt={`${displayName} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* View icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center   transition-all duration-300">
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
              <div className="w-full h-full flex items-center justify-center bg-[#2f0000]/10 rounded-lg">
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
        </div>

        {/* Content Section - Right Side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
          <div>
            <div className="flex items-start gap-4 mb-2">
              <h2 className="text-2xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
                {displayName}
              </h2>
              {bass.new && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg animate-pulse">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {isEnglish ? 'NEW' : 'NOVINKA'}
                </span>
              )}
            </div>
          </div>

          <p className="text-[#2f0000] text-4xl leading-relaxed text-justify">
            {displayDescription}
          </p>

          {bass.price && (
            <div className="pt-4">
              <p className="text-4xl font-semibold text-[#2f0000]">{bass.price} €</p>
            </div>
          )}

          {/* Video Section */}
          {bass.videoUrl && (
            <div className="pt-6">
              <h3 className="text-xl font-semibold text-[#e80e19] mb-4">
                {isEnglish ? 'Watch Video' : 'Pozrieť video'}
              </h3>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-[#2f0000]/10">
                {(() => {
                  // Extract YouTube video ID
                  let videoId = ''
                  if (bass.videoUrl.includes('youtube.com/watch')) {
                    const urlParams = new URLSearchParams(bass.videoUrl.split('?')[1])
                    videoId = urlParams.get('v') || ''
                  } else if (bass.videoUrl.includes('youtu.be/')) {
                    videoId = bass.videoUrl.split('youtu.be/')[1]?.split('?')[0] || ''
                  }

                  if (videoId) {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${displayName} Video`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )
                  } else {
                    // For non-YouTube URLs, show a link
                    return (
                      <div className="flex items-center justify-center h-full">
                        <a
                          href={bass.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-3 bg-[#e80e19] hover:bg-white hover:text-[#2f0000] hover:border-black text-white rounded-lg font-medium transition-colors duration-200"
                        >
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {isEnglish ? 'Watch Video' : 'Pozrieť video'}
                        </a>
                      </div>
                    )
                  }
                })()}
              </div>
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
      // Filter only published basses - no language filtering needed now
      const filteredBasses = data.filter((bass: Bass) => bass.published)

      setBasses(filteredBasses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f1f1ef] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#e80e19]"></div>
          <p className="text-[#2f0000] mt-4 text-4xl">
            {isEnglish ? 'Loading double basses...' : 'Načítavam kontrabasy...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f1f1ef] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#e80e19] text-4xl">{error}</p>
          <button
            onClick={fetchBasses}
            className="mt-4 px-6 py-2 bg-[#e80e19] hover:bg-white hover:text-[#2f0000] hover:border-black text-white rounded-lg font-medium transition-colors duration-200"
          >
            {isEnglish ? 'Try again' : 'Skúsiť znova'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f1f1ef]">
      {/* Header Section */}
      <div className="relative py-16 px-4 text-center border-b border-[#2f0000]/20">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl lg:text-7xl font-normal text-[#e80e19] mb-4 tracking-tight">
            {isEnglish ? 'Double Basses' : 'Kontrabasy'}
          </h1>
          <p className="text-3xl lg:text-5xl font-normal text-[#2f0000]">
            {isEnglish
              ? 'Quality master-crafted double basses...'
              : 'Kvalitné majstrovské kontrabasy...'}
          </p>
        </div>
      </div>

      {/* Basses List */}
      <div className="max-w-7xl mx-auto divide-y divide-[#2f0000]/20">
        {basses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#2f0000] text-4xl">
              {isEnglish
                ? 'No double basses are currently available.'
                : 'Žiadne kontrabasy nie sú momentálne k dispozícii.'}
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

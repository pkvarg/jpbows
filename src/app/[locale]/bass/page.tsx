'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import ReviewsDisplay from '@/app/components/ReviewsDisplay'

interface Bass {
  id: string
  images: string[]
  name: string
  enName: string
  description: string
  enDescription: string
  price: string
  priceEnglish: string
  published: boolean
  new: boolean
  videoUrl: string
  availability: 'available' | 'sold'
  instrumentType: 'bass' | 'violone' | 'gamba' | 'cello'
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
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-[#e80e19] p-3 rounded-full transition-all"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-[#e80e19] p-3 rounded-full transition-all"
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
                      backgroundColor:
                        index === currentIndex ? '#e80e19' : 'rgba(232, 13, 25, 0.5)',
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

// Bass Item Component
const BassItem = ({ bass, isEnglish }: { bass: Bass; isEnglish: boolean }) => {
  const t = useTranslations('Home')
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
      <div className="group relative bg-[#faf8f5] border border-[#e0d8ce] my-6 overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative h-64 lg:h-80 overflow-hidden">
              {bass.images.length > 0 ? (
                <>
                  <div
                    className="relative h-full cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Image
                      src={bass.images[currentImageIndex]}
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1c1208] p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
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
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#1c1208] p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm"
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
                        {bass.images.map((_, index) => (
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
                <div className="w-full h-full flex items-center justify-center bg-[#f0ece6]">
                  <svg
                    className="w-12 h-12 text-[#9b8f84]"
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
          <div className="w-full lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <h2 className="text-xl lg:text-2xl text-[#1c1208] leading-tight italic" style={{fontFamily:'var(--font-cormorant)'}}>
                  {displayName}
                </h2>
                {bass.new && (
                  <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-[0.15em] uppercase bg-[#8b6914] text-white" style={{fontFamily:'var(--font-poiret-one)'}}>
                    {isEnglish ? 'NEW' : 'NOVINKA'}
                  </span>
                )}
              </div>

              <div className="text-[#3d3228] text-base lg:text-lg leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>
                {displayDescription.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                  <div key={index} className="mb-1">{sentence}</div>
                ))}
              </div>

              {(bass.price || bass.priceEnglish) && (
                <div className="pt-2">
                  <p className="text-xl lg:text-2xl font-semibold text-[#1c1208]" style={{fontFamily:'var(--font-cormorant)'}}>
                    {isEnglish && bass.priceEnglish ? bass.priceEnglish : bass.price}
                  </p>
                </div>
              )}

              {/* Availability */}
              <div className="pt-2">
                <span
                  className={`inline-flex items-center px-4 py-1.5 text-xs font-bold tracking-[0.15em] uppercase ${
                    bass.availability === 'available'
                      ? 'bg-[#faf8f5] border border-[#8b6914] text-[#8b6914]'
                      : 'bg-[#faf8f5] border border-[#e80e19] text-[#e80e19]'
                  }`}
                  style={{fontFamily:'var(--font-poiret-one)'}}
                >
                  {bass.availability === 'available'
                    ? t('availabilityAvailable')
                    : t('availabilitySold')}
                </span>
              </div>

              {/* Video Section */}
              {bass.videoUrl && (
                <div className="pt-4">
                  <h3 className="text-base lg:text-lg text-[#8b6914] mb-3 tracking-[0.15em] uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
                    {isEnglish ? 'Watch Video' : 'Pozriet video'}
                  </h3>
                  <div className="relative aspect-video overflow-hidden bg-[#f0ece6] border border-[#e0d8ce]">
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
                              className="bg-[#e80e19] text-white px-8 py-3 tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-colors duration-200 inline-flex items-center gap-2"
                              style={{fontFamily:'var(--font-poiret-one)'}}
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {isEnglish ? 'Watch Video' : 'Pozriet video'}
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'bivaj' | 'masters'>('all')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const instrumentType = searchParams.get('type') as 'bass' | 'violone' | 'gamba' | 'cello' | null

  // Determine if we're on the English version based on URL
  const isEnglish = pathname.includes('/en/')

  const fetchBasses = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/basses')

      if (!response.ok) {
        throw new Error('Failed to fetch basses')
      }

      const data = await response.json()
      // Filter only published basses and by instrument type if specified
      let filteredBasses = data.filter((bass: Bass) => bass.published)

      // Filter by instrument type if specified in URL
      if (instrumentType) {
        filteredBasses = filteredBasses.filter(
          (bass: Bass) => bass.instrumentType === instrumentType,
        )
      }

      // Sort by order (ascending - lower numbers first)
      const sortedBasses = filteredBasses.sort((a: Bass, b: Bass) => {
        if (a.order !== b.order) {
          return a.order - b.order
        }
        // If same order, sort by creation date (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      setBasses(sortedBasses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [instrumentType])

  useEffect(() => {
    fetchBasses()
  }, [fetchBasses])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e80e19]"></div>
          <p className="text-[#3d3228] mt-4 text-base lg:text-lg" style={{fontFamily:'var(--font-cormorant)'}}>
            {isEnglish ? 'Loading double basses...' : 'Načítavam nástroje...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#e80e19] text-lg lg:text-xl mb-6" style={{fontFamily:'var(--font-cormorant)'}}>{error}</p>
          <button
            onClick={fetchBasses}
            className="bg-[#e80e19] text-white px-8 py-3 tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-colors duration-200"
            style={{fontFamily:'var(--font-poiret-one)'}}
          >
            {isEnglish ? 'Try again' : 'Skúsiť znova'}
          </button>
        </div>
      </div>
    )
  }

  // Get instrument type label
  const getInstrumentTypeLabel = () => {
    if (!instrumentType) return isEnglish ? 'All Instruments' : 'Všetky nástroje'
    const labels: Record<string, { en: string; sk: string }> = {
      bass: { en: 'Double Basses', sk: 'Kontrabasy' },
      violone: { en: 'Violones', sk: 'Violone' },
      gamba: { en: 'Gambas', sk: 'Gamby' },
      cello: { en: 'Cellos', sk: 'Violončelá' },
    }
    return isEnglish ? labels[instrumentType]?.en : labels[instrumentType]?.sk
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
              {getInstrumentTypeLabel()}
            </h2>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>
          <h1 className="text-3xl lg:text-5xl text-[#1c1208] italic leading-tight" style={{fontFamily:'var(--font-cormorant)'}}>
            {getInstrumentTypeLabel()}
          </h1>
          <p className="text-lg lg:text-xl text-[#3d3228] mt-4 leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>
            {isEnglish
              ? 'Quality master-crafted musical instruments for professional musicians'
              : 'Kvalitné majstrovské hudobné nástroje pre profesionálnych hudobníkov'}
          </p>
        </div>
      </div>

      {/* Basses List */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-16">
        {basses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#9b8f84] text-lg lg:text-xl" style={{fontFamily:'var(--font-cormorant)'}}>
              {isEnglish
                ? 'No double basses are currently available.'
                : 'Žiadne nástroje nie sú momentálne k dispozícii.'}
            </p>
          </div>
        ) : (
          <>
            {(() => {
              const bivajBasses = basses.filter((b) => b.description.includes('Bivaj Art'))
              const otherBasses = basses.filter((b) => !b.description.includes('Bivaj Art'))
              const hasMasters = otherBasses.length > 0

              const displayedBasses = activeFilter === 'bivaj' ? bivajBasses
                : activeFilter === 'masters' ? otherBasses
                : basses

              return (
                <>
                  {/* Filter Tabs — only show when there are masters products */}
                  {hasMasters && (
                    <div className="flex flex-wrap gap-3 mb-12">
                      {([
                        { key: 'all' as const, label: `${isEnglish ? 'All' : 'Všetky'} (${basses.length})` },
                        { key: 'bivaj' as const, label: `Bivaj Art Luthiery (${bivajBasses.length})` },
                        { key: 'masters' as const, label: `${isEnglish ? 'Other Masters' : 'Iní majstri'} (${otherBasses.length})` },
                      ]).map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveFilter(tab.key)}
                          className={`px-6 py-2.5 text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 border ${
                            activeFilter === tab.key
                              ? 'bg-[#8b6914] text-white border-[#8b6914]'
                              : 'bg-[#faf8f5] text-[#1c1208] border-[#e0d8ce] hover:border-[#8b6914] hover:text-[#8b6914]'
                          }`}
                          style={{fontFamily:'var(--font-poiret-one)', borderRadius: '9999px'}}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {activeFilter === 'all' ? (
                    <>
                      {bivajBasses.length > 0 && (
                        <div className="mb-16">
                          <div className="flex items-center gap-6 mb-8">
                            <div className="w-8 h-0.5 bg-[#e80e19]" />
                            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
                              Bivaj Art Luthiery
                            </h2>
                            <div className="h-px flex-1 bg-[#e0d8ce]" />
                          </div>
                          <div className="space-y-8">
                            {bivajBasses.map((bass) => (
                              <BassItem key={bass.id} bass={bass} isEnglish={isEnglish} />
                            ))}
                          </div>
                        </div>
                      )}

                      {otherBasses.length > 0 && (
                        <div>
                          <div className="flex items-center gap-6 mb-8">
                            <div className="w-8 h-0.5 bg-[#e80e19]" />
                            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
                              {isEnglish ? 'Other Masters' : 'Iní majstri'}
                            </h2>
                            <div className="h-px flex-1 bg-[#e0d8ce]" />
                          </div>
                          <div className="space-y-8">
                            {otherBasses.map((bass) => (
                              <BassItem key={bass.id} bass={bass} isEnglish={isEnglish} />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-8">
                      {displayedBasses.map((bass) => (
                        <BassItem key={bass.id} bass={bass} isEnglish={isEnglish} />
                      ))}
                    </div>
                  )}
                </>
              )
            })()}
          </>
        )}
      </div>

      {/* Reviews Section */}
      <ReviewsDisplay filterType="instruments" />
    </div>
  )
}

export default Bass

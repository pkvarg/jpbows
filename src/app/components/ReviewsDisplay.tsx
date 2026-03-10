'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'

interface Review {
  id: string
  customerName: string
  customerDescription: string
  customerDescription2: string | null
  customerDescriptionEnglish: string | null
  customerDescription2English: string | null
  reviewText: string
  reviewTextEnglish: string
  photo: string
  active: boolean
  reviewOriginLink: string
  reviewType: 'bows' | 'instruments' | 'repairs' | 'rental'
  createdAt: string
  updatedAt: string
}

interface ReviewsDisplayProps {
  filterType?: 'bows' | 'instruments' | 'repairs' | 'rental'
  showAllLink?: boolean
}

export default function ReviewsDisplay({ filterType, showAllLink = true }: ReviewsDisplayProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(!filterType)
  const locale = useLocale()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews/public')
      if (!response.ok) throw new Error('Failed to fetch reviews')
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReviews = showAll
    ? reviews
    : reviews.filter((review) => review.reviewType === filterType)

  const otherTypesExist = filterType && reviews.some((review) => review.reviewType !== filterType)

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; sk: string }> = {
      bows: { en: 'Bows', sk: 'Sláčiky' },
      instruments: { en: 'Instruments', sk: 'Nástroje' },
      repairs: { en: 'Repairs', sk: 'Opravy' },
      rental: { en: 'Rental', sk: 'Prenájom' },
    }
    return locale === 'en' ? labels[type]?.en : labels[type]?.sk
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-[#e80e19]"></div>
      </div>
    )
  }

  if (filteredReviews.length === 0) {
    return null
  }

  return (
    <div className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-8 h-0.5 bg-[#e80e19]" />
          <span
            className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase whitespace-nowrap"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            {locale === 'en' ? 'Customer Reviews' : 'Recenzie zákazníkov'}
          </span>
          <div className="h-px flex-1 bg-[#e0d8ce]" />
        </div>

        {filterType && !showAll && (
          <p
            className="text-[#3d3228] text-lg mb-6"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            — {getTypeLabel(filterType)}
          </p>
        )}

        {filterType && otherTypesExist && showAllLink && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#e80e19] hover:text-[#8b6914] transition-colors tracking-[0.08em] uppercase font-semibold"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {showAll
                ? locale === 'en'
                  ? `Show only ${getTypeLabel(filterType)} reviews`
                  : `Zobraziť iba recenzie ${getTypeLabel(filterType)}`
                : locale === 'en'
                ? 'Show all reviews'
                : 'Zobraziť všetky recenzie'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-[#faf8f5] border border-[#e0d8ce] p-8">
              <div className="flex items-start gap-4 mb-4">
                {review.photo && (
                  <Image
                    src={review.photo}
                    alt={review.customerName}
                    width={60}
                    height={60}
                    className="rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h3
                    className="text-[#1c1208] text-xl italic font-semibold"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {review.customerName}
                  </h3>
                  <p
                    className="text-[#9b8f84] text-base"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {locale === 'en' && review.customerDescriptionEnglish
                      ? review.customerDescriptionEnglish
                      : review.customerDescription}
                    {locale === 'en' && review.customerDescription2English
                      ? `, ${review.customerDescription2English}`
                      : review.customerDescription2
                      ? `, ${review.customerDescription2}`
                      : ''}
                  </p>
                  {!filterType && (
                    <span
                      className="inline-block bg-[#f0ece6] text-[#8b6914] px-3 py-1 text-xs tracking-[0.15em] uppercase mt-1"
                      style={{ fontFamily: 'var(--font-poiret-one)' }}
                    >
                      {getTypeLabel(review.reviewType)}
                    </span>
                  )}
                </div>
              </div>

              <div className="w-8 h-0.5 bg-[#e80e19] mb-4" />

              <div className="mb-4">
                <p
                  className="text-[#3d3228] text-lg lg:text-xl leading-relaxed italic"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  &quot;{locale === 'en' ? review.reviewTextEnglish : review.reviewText}&quot;
                </p>
              </div>

              {review.reviewOriginLink && (
                <a
                  href={review.reviewOriginLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#e80e19] hover:text-[#8b6914] transition-colors text-base tracking-wide flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {locale === 'en' ? 'Google Review' : 'Recenzia Google'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

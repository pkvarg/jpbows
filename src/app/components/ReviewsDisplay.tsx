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
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (filteredReviews.length === 0) {
    return null
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {locale === 'en' ? 'Customer Reviews' : 'Recenzie zákazníkov'}
          {filterType && !showAll && (
            <span className="text-xl ml-2 text-gray-600">- {getTypeLabel(filterType)}</span>
          )}
        </h2>

        {filterType && otherTypesExist && showAllLink && (
          <div className="text-center mb-6">
            <button onClick={() => setShowAll(!showAll)} className="text-blue-600 hover:underline">
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
            <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
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
                  <h3 className="font-semibold text-lg">{review.customerName}</h3>
                  <p className="text-gray-600 text-sm">
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
                      className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                        review.reviewType === 'bows'
                          ? 'bg-purple-100 text-purple-700'
                          : review.reviewType === 'instruments'
                          ? 'bg-blue-100 text-blue-700'
                          : review.reviewType === 'repairs'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {getTypeLabel(review.reviewType)}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-900 text-base font-medium leading-relaxed italic">
                  &quot;{locale === 'en' ? review.reviewTextEnglish : review.reviewText}&quot;
                </p>
              </div>

              {review.reviewOriginLink && (
                <a
                  href={review.reviewOriginLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
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

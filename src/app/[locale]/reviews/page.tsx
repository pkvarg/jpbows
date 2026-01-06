import React from 'react'
import ReviewsDisplay from '@/app/components/ReviewsDisplay'

const ReviewsPage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <ReviewsDisplay showAllLink={false} />
    </main>
  )
}

export default ReviewsPage
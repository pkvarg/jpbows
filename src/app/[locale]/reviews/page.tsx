import React from 'react'
import ReviewsDisplay from '@/app/components/ReviewsDisplay'

const ReviewsPage = () => {
  return (
    <main className="min-h-screen bg-[#faf8f5] pt-32 pb-16">
      <ReviewsDisplay showAllLink={false} />
    </main>
  )
}

export default ReviewsPage

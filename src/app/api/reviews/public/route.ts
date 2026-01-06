import { NextResponse } from 'next/server'
import db from '@/db/db'

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      where: {
        active: true
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching public reviews:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
      },
      {
        status: 500,
      },
    )
  }
}
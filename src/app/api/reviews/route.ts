import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

interface ReviewCreateData {
  customerName: string
  customerDescription: string
  reviewText: string
  reviewTextEnglish: string
  photo: string
  active: boolean
  reviewOriginLink: string
  reviewType: string
  createdAt: Date
  updatedAt: Date
  customerDescription2?: string
  customerDescriptionEnglish?: string
  customerDescription2English?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const createData: ReviewCreateData = {
      customerName: body.customerName,
      customerDescription: body.customerDescription,
      reviewText: body.reviewText,
      reviewTextEnglish: body.reviewTextEnglish,
      photo: body.photo || '',
      active: body.active ?? true,
      reviewOriginLink: body.reviewOriginLink || '',
      reviewType: body.reviewType || 'bows',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Only include optional fields if they have values
    if (body.customerDescription2) {
      createData.customerDescription2 = body.customerDescription2
    }
    if (body.customerDescriptionEnglish) {
      createData.customerDescriptionEnglish = body.customerDescriptionEnglish
    }
    if (body.customerDescription2English) {
      createData.customerDescription2English = body.customerDescription2English
    }

    const review = await db.review.create({
      data: createData,
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    console.error('Review creation error:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
      },
    )
  }
}

export async function GET() {
  try {
    const reviews = await db.review.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)

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
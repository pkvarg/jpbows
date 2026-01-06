import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

interface ResolvedParams {
  id: string
}

interface ReviewUpdateData {
  customerName: string
  customerDescription: string
  reviewText: string
  reviewTextEnglish: string
  photo: string
  active: boolean
  reviewOriginLink: string
  reviewType: string
  updatedAt: Date
  customerDescription2?: string
  customerDescriptionEnglish?: string
  customerDescription2English?: string
}

export async function GET(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id

    const review = await db.review.findUnique({
      where: { id },
    })

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error fetching review:', error)
    return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const body = await request.json()
    const resolvedParams = await params
    const id = resolvedParams.id

    const existingReview = await db.review.findUnique({
      where: { id },
    })

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    const updateData: ReviewUpdateData = {
      customerName: body.customerName,
      customerDescription: body.customerDescription,
      reviewText: body.reviewText,
      reviewTextEnglish: body.reviewTextEnglish,
      photo: body.photo || '',
      active: body.active ?? true,
      reviewOriginLink: body.reviewOriginLink || '',
      reviewType: body.reviewType || 'bows',
      updatedAt: new Date(),
    }

    // Only include optional fields if they have values
    if (body.customerDescription2) {
      updateData.customerDescription2 = body.customerDescription2
    }
    if (body.customerDescriptionEnglish) {
      updateData.customerDescriptionEnglish = body.customerDescriptionEnglish
    }
    if (body.customerDescription2English) {
      updateData.customerDescription2English = body.customerDescription2English
    }

    const review = await db.review.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<ResolvedParams> },
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id

    const existingReview = await db.review.findUnique({
      where: { id },
    })

    if (!existingReview) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    await db.review.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }
}
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Create bass
    const bass = await db.bass.create({
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [], // Handle array of images
        available: body.available,
        published: body.published,
        price: body.price || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(bass, { status: 201 })
  } catch (error) {
    // Detailed error logging
    console.error('Bass creation error:', error)

    // Create safe error response
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
    // Fetch all basses ordered by creation date
    const basses = await db.bass.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Return successful response
    return NextResponse.json(basses)
  } catch (error) {
    console.error('Error fetching basses:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch basses',
      },
      {
        status: 500,
      },
    )
  }
}

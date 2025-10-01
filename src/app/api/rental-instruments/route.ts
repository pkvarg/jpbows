// app/api/rental-instruments/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Create rental instrument
    const rentalInstrument = await db.rentalInstrument.create({
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        enName: body.enName,
        enDescription: body.enDescription,
        published: body.published,
        metadata: body.metadata,
        status: body.status || 'available',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(rentalInstrument, { status: 201 })
  } catch (error) {
    // Detailed error logging
    console.error('Rental instrument creation error:', error)

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
    // Fetch all rental instruments ordered by creation date
    const rentalInstruments = await db.rentalInstrument.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Return successful response
    return NextResponse.json(rentalInstruments)
  } catch (error) {
    console.error('Error fetching rental instruments:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch rental instruments',
      },
      {
        status: 500,
      },
    )
  }
}

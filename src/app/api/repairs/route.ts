// app/api/repairs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Create repair
    const repair = await db.repair.create({
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        enName: body.enName,
        enDescription: body.enDescription,
        published: body.published,
        metadata: body.metadata,
        order: body.order ?? 999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(repair, { status: 201 })
  } catch (error) {
    // Detailed error logging
    console.error('Repair creation error:', error)

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
    // Fetch all repairs ordered by order field
    const repairs = await db.repair.findMany({
      orderBy: { order: 'asc' },
    })

    // Return successful response
    return NextResponse.json(repairs)
  } catch (error) {
    console.error('Error fetching repairs:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch repairs',
      },
      {
        status: 500,
      },
    )
  }
}

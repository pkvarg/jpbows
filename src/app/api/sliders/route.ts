// app/api/sliders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Create slider using your singleton prisma client
    const slider = await prisma.slider.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        imageUrl: body.imageUrl,
        active: body.active,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(slider, { status: 201 })
  } catch (error) {
    // Detailed error logging
    console.error('Slider creation error:', error)

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
    // Fetch all sliders
    const sliders = await prisma.slider.findMany()

    // Return successful response
    return NextResponse.json(sliders)
  } catch (error) {
    console.error('Error fetching sliders:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch sliders',
      },
      {
        status: 500,
      },
    )
  }
}

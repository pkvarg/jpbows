// app/api/sliders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

// Get a specific slider by ID
// eslint-disable-next-line
export async function GET(request: NextRequest, { params }: { params: any }) {
  const { id } = await params
  try {
    const slider = await prisma.slider.findUnique({
      where: {
        id: id,
      },
    })

    if (!slider) {
      return NextResponse.json({ error: 'Slider not found' }, { status: 404 })
    }

    return NextResponse.json(slider)
  } catch (error) {
    console.error('Error fetching slider:', error)

    return NextResponse.json({ error: 'Failed to fetch slider' }, { status: 500 })
  }
}

// Update a slider
// eslint-disable-next-line
export async function PUT(request: NextRequest, { params }: { params: any }) {
  try {
    const body = await request.json()

    const { id } = await params

    const updatedSlider = await prisma.slider.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        imageUrl: body.imageUrl,
        active: body.active,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedSlider)
  } catch (error) {
    console.error('Error updating slider:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Delete a slider
// eslint-disable-next-line
export async function DELETE(request: NextRequest, { params }: { params: any }) {
  const { id } = await params

  try {
    await prisma.slider.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json({ message: 'Slider deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting slider:', error)

    return NextResponse.json({ error: 'Failed to delete slider' }, { status: 500 })
  }
}

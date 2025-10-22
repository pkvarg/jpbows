// app/api/rental-instruments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

interface ResolvedParams {
  id: string
}

// GET all rental instruments
export async function GET() {
  try {
    const rentalInstruments = await db.rentalInstrument.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(rentalInstruments)
  } catch (error) {
    console.error('Error fetching rental instruments:', error)
    return NextResponse.json({ error: 'Failed to fetch rental instruments' }, { status: 500 })
  }
}

// EDIT a rental instrument by id
export async function PUT(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const body = await request.json()
    const resolvedParams = await params
    const id = resolvedParams.id

    console.log('id', id)

    // Check if rental instrument exists first
    const existingRentalInstrument = await db.rentalInstrument.findUnique({
      where: { id },
    })

    if (!existingRentalInstrument) {
      return NextResponse.json({ error: 'Rental instrument not found' }, { status: 404 })
    }

    // Update the rental instrument
    const rentalInstrument = await db.rentalInstrument.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        enName: body.enName,
        enDescription: body.enDescription,
        published: body.published,
        status: body.status || 'available',
        order: body.order ?? 999,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(rentalInstrument)
  } catch (error) {
    console.error('Error updating rental instrument:', error)
    return NextResponse.json({ error: 'Failed to update rental instrument' }, { status: 500 })
  }
}

// POST create new rental instrument
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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
        order: body.order ?? 999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(rentalInstrument)
  } catch (error) {
    console.error('Error creating rental instrument:', error)
    return NextResponse.json({ error: 'Failed to create rental instrument' }, { status: 500 })
  }
}

// DELETE a rental instrument by id
export async function DELETE(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id

    // Check if rental instrument exists first
    const existingRentalInstrument = await db.rentalInstrument.findUnique({
      where: { id },
    })

    if (!existingRentalInstrument) {
      return NextResponse.json({ error: 'Rental instrument not found' }, { status: 404 })
    }

    // Delete the rental instrument
    await db.rentalInstrument.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Rental instrument deleted successfully' })
  } catch (error) {
    console.error('Error deleting rental instrument:', error)
    return NextResponse.json({ error: 'Failed to delete rental instrument' }, { status: 500 })
  }
}

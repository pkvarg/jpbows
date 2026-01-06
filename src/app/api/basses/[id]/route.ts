// app/api/basses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

interface ResolvedParams {
  id: string
}

// GET all basses
export async function GET() {
  try {
    const basses = await db.bass.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(basses)
  } catch (error) {
    console.error('Error fetching basses:', error)
    return NextResponse.json({ error: 'Failed to fetch basses' }, { status: 500 })
  }
}

// EDIT a bass by id
export async function PUT(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const body = await request.json()
    const resolvedParams = await params
    const id = resolvedParams.id

    // Check if bass exists first
    const existingBass = await db.bass.findUnique({
      where: { id },
    })

    if (!existingBass) {
      return NextResponse.json({ error: 'Bass not found' }, { status: 404 })
    }

    // Update the bass
    const bass = await db.bass.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        enName: body.enName,
        enDescription: body.enDescription,
        published: body.published,
        new: body.new,
        metadata: body.metadata,
        price: body.price || '',
        priceEnglish: body.priceEnglish || '',
        videoUrl: body.videoUrl || '',
        availability: body.availability || 'available',
        instrumentType: body.instrumentType || 'bass',
        order: body.order ?? 999,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(bass)
  } catch (error) {
    console.error('Error updating bass:', error)
    return NextResponse.json({ error: 'Failed to update bass' }, { status: 500 })
  }
}

// POST create new bass
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const bass = await db.bass.create({
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        enName: body.enName,
        enDescription: body.enDescription,
        published: body.published,
        new: body.new,
        metadata: body.metadata,
        price: body.price || '',
        priceEnglish: body.priceEnglish || '',
        videoUrl: body.videoUrl || '',
        availability: body.availability || 'available',
        instrumentType: body.instrumentType || 'bass',
        order: body.order ?? 999,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(bass)
  } catch (error) {
    console.error('Error creating bass:', error)
    return NextResponse.json({ error: 'Failed to create bass' }, { status: 500 })
  }
}

// DELETE a bass by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<ResolvedParams> },
) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id

    // Check if bass exists first
    const existingBass = await db.bass.findUnique({
      where: { id },
    })

    if (!existingBass) {
      return NextResponse.json({ error: 'Bass not found' }, { status: 404 })
    }

    // Delete the bass
    await db.bass.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Bass deleted successfully' })
  } catch (error) {
    console.error('Error deleting bass:', error)
    return NextResponse.json({ error: 'Failed to delete bass' }, { status: 500 })
  }
}

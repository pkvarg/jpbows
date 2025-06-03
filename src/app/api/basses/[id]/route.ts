// app/api/basses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

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
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = await params

    console.log('id', id)

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
        available: body.available,
        published: body.published,
        price: body.price || '',
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
        available: body.available,
        published: body.published,
        price: body.price || '',
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

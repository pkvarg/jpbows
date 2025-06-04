// app/api/bows/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

interface ResolvedParams {
  id: string
}

// GET all bow
export async function GET() {
  try {
    const bow = await db.bows.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bow)
  } catch (error) {
    console.error('Error fetching bow:', error)
    return NextResponse.json({ error: 'Failed to fetch bow' }, { status: 500 })
  }
}

// EDIT a bow by id
export async function PUT(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const body = await request.json()
    const resolvedParams = await params
    const id = resolvedParams.id

    console.log('id', id)

    // Check if bow exists first
    const existingBow = await db.bows.findUnique({
      where: { id },
    })

    if (!existingBow) {
      return NextResponse.json({ error: 'Bow not found' }, { status: 404 })
    }

    // Update the bow
    const bow = await db.bows.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        available: body.available,
        published: body.published,
        english: body.english,
        new: body.new,
        price: body.price || '',
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(bow)
  } catch (error) {
    console.error('Error updating bow:', error)
    return NextResponse.json({ error: 'Failed to update bow' }, { status: 500 })
  }
}

// POST create new bow
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const bow = await db.bows.create({
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        available: body.available,
        published: body.published,
        english: body.english,
        new: body.new,
        metadata: body.metadata,
        price: body.price || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(bow)
  } catch (error) {
    console.error('Error creating bow:', error)
    return NextResponse.json({ error: 'Failed to create bow' }, { status: 500 })
  }
}

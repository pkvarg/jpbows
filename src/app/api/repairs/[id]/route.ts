// app/api/repairs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

interface ResolvedParams {
  id: string
}

// GET all repairs
export async function GET() {
  try {
    const repairs = await db.repair.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(repairs)
  } catch (error) {
    console.error('Error fetching repairs:', error)
    return NextResponse.json({ error: 'Failed to fetch repairs' }, { status: 500 })
  }
}

// EDIT a repair by id
export async function PUT(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const body = await request.json()
    const resolvedParams = await params
    const id = resolvedParams.id

    console.log('id', id)

    // Check if repair exists first
    const existingRepair = await db.repair.findUnique({
      where: { id },
    })

    if (!existingRepair) {
      return NextResponse.json({ error: 'Repair not found' }, { status: 404 })
    }

    // Update the repair
    const repair = await db.repair.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        images: body.images || [],
        enName: body.enName,
        enDescription: body.enDescription,
        published: body.published,
        order: body.order ?? 999,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(repair)
  } catch (error) {
    console.error('Error updating repair:', error)
    return NextResponse.json({ error: 'Failed to update repair' }, { status: 500 })
  }
}

// POST create new repair
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

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

    return NextResponse.json(repair)
  } catch (error) {
    console.error('Error creating repair:', error)
    return NextResponse.json({ error: 'Failed to create repair' }, { status: 500 })
  }
}

// DELETE a repair by id
export async function DELETE(request: NextRequest, { params }: { params: Promise<ResolvedParams> }) {
  try {
    const resolvedParams = await params
    const id = resolvedParams.id

    // Check if repair exists first
    const existingRepair = await db.repair.findUnique({
      where: { id },
    })

    if (!existingRepair) {
      return NextResponse.json({ error: 'Repair not found' }, { status: 404 })
    }

    // Delete the repair
    await db.repair.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Repair deleted successfully' })
  } catch (error) {
    console.error('Error deleting repair:', error)
    return NextResponse.json({ error: 'Failed to delete repair' }, { status: 500 })
  }
}

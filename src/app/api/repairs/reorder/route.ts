import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { repairs } = body

    if (!Array.isArray(repairs)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
    }

    // Update all repairs with their new order
    await Promise.all(
      repairs.map(async (repair: { id: string; order: number }) => {
        return db.repair.update({
          where: { id: repair.id },
          data: { order: repair.order },
        })
      })
    )

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating repair order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

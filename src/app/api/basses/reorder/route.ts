import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { basses } = body

    if (!Array.isArray(basses)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
    }

    // Update all basses with their new order
    await Promise.all(
      basses.map(async (bass: { id: string; order: number }) => {
        return db.bass.update({
          where: { id: bass.id },
          data: { order: bass.order },
        })
      })
    )

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating bass order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

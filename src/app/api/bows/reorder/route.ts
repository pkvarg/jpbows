import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bows } = body

    if (!Array.isArray(bows)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
    }

    // Update all bows with their new order
    await Promise.all(
      bows.map(async (bow: { id: string; order: number }) => {
        return db.bows.update({
          where: { id: bow.id },
          data: { order: bow.order },
        })
      })
    )

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating bow order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

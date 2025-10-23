import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { rentalInstruments } = body

    if (!Array.isArray(rentalInstruments)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 })
    }

    // Update all rental instruments with their new order
    await Promise.all(
      rentalInstruments.map(async (rentalInstrument: { id: string; order: number }) => {
        return db.rentalInstrument.update({
          where: { id: rentalInstrument.id },
          data: { order: rentalInstrument.order },
        })
      })
    )

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating rental instrument order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { blogs } = body

    if (!blogs || !Array.isArray(blogs)) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    // Update all blogs with their new order
    await Promise.all(
      blogs.map(async (blog: { id: string; order: number }) => {
        return prisma.blog.update({
          where: { id: blog.id },
          data: { order: blog.order },
        })
      }),
    )

    return NextResponse.json({ message: 'Order updated successfully' })
  } catch (error) {
    console.error('Error updating blog order:', error)
    return NextResponse.json(
      { error: 'Failed to update blog order' },
      { status: 500 },
    )
  }
}

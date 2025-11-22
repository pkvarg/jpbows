// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Get the highest order number for new blogs
    const maxOrder = body.order ?? (await prisma.blog.findMany({
      select: { order: true },
    }).then(blogs => Math.max(0, ...blogs.map(b => b.order)) + 1))

    // Create blog using your singleton prisma client
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        blogtext: body.blogtext,
        enTitle: body.enTitle,
        enSubtitle: body.enSubtitle,
        enDescription: body.enDescription,
        enBlogtext: body.enBlogtext,
        imageUrl: body.imageUrl,
        active: body.active,
        metadata: body.metadata,
        template: body.template || 'classic', // Default to classic if not provided
        order: maxOrder,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    // Detailed error logging
    console.error('Blog creation error:', error)

    // Create safe error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json(
      {
        error: errorMessage,
      },
      {
        status: 500,
      },
    )
  }
}

export async function GET() {
  try {
    // Fetch all blogs ordered by order field
    const blogs = await prisma.blog.findMany({
      orderBy: {
        order: 'asc', // Ordered by custom order field
      },
    })

    // Return successful response
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch blogs',
      },
      {
        status: 500,
      },
    )
  }
}

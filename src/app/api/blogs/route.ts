// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Create blog using your singleton prisma client
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        blogtext: body.blogtext,
        imageUrl: body.imageUrl,
        active: body.active,
        template: body.template || 'classic', // Default to classic if not provided
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
    // Fetch all blogs
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc', // Most recent blogs first
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

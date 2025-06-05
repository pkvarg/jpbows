// app/api/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

// Get a specific blog by ID
// eslint-disable-next-line
export async function GET(request: NextRequest, { params }: { params: any }) {
  const { id } = await params

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    })

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)

    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

// Update a blog
// eslint-disable-next-line
export async function PUT(request: NextRequest, { params }: { params: any }) {
  const { id } = await params

  try {
    const body = await request.json()

    const updatedBlog = await prisma.blog.update({
      where: {
        id: id,
      },
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
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(updatedBlog)
  } catch (error) {
    console.error('Error updating blog:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'

    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}

// Delete a blog
// eslint-disable-next-line
export async function DELETE(request: NextRequest, { params }: { params: any }) {
  const { id } = await params

  try {
    await prisma.blog.delete({
      where: {
        id: id,
      },
    })

    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error deleting blog:', error)

    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}

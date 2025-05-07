// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db'
import { unlink } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Helper function to remove file if it exists
async function removeImageIfExists(imageUrl: string) {
  if (imageUrl && imageUrl.startsWith('/uploads/')) {
    try {
      const filePath = join(process.cwd(), 'public', imageUrl)
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    } catch (error) {
      console.error('Error removing image file:', error)
    }
  }
}

// eslint-disable-next-line
export async function GET(request: NextRequest, { params }: { params: any }) {
  console.log('type****', typeof params)
  try {
    const { id } = params

    const product = await db.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)

    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
// eslint-disable-next-line
export async function PUT(request: NextRequest, { params }: { params: any }) {
  try {
    const { id } = params
    const body = await request.json()

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // If image URL changed and old one was in uploads, delete old image
    if (
      existingProduct.imageUrl !== body.imageUrl &&
      existingProduct.imageUrl.startsWith('/uploads/')
    ) {
      await removeImageIfExists(existingProduct.imageUrl)
    }

    // Update product
    const updatedProduct = await db.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        available: body.available,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)

    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

// eslint-disable-next-line
export async function DELETE(request: NextRequest, { params }: { params: any }) {
  try {
    const { id } = params

    // Get product first to get image URL
    const product = await db.product.findUnique({
      where: { id },
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Delete the product
    await db.product.delete({
      where: { id },
    })

    // Delete associated image if it exists in uploads folder
    await removeImageIfExists(product.imageUrl)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)

    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

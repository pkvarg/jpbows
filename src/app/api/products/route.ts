// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import db from '@/db/db' // Import your singleton db client

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()

    // Create product using your singleton db client
    const product = await db.product.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        available: body.available,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    // Detailed error logging
    console.error('Product creation error:', error)

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
    // Fetch all products
    const products = await db.product.findMany()

    // Return successful response
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch products',
      },
      {
        status: 500,
      },
    )
  }
}

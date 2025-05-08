// app/api/visitors/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { PrismaClient } from '../../../../prisma/generated/prisma'

const prisma = new PrismaClient()

const visitorId = '681ca9fc34a1a7d5d624e53e'

// get the single table that has the count records of all visits
export async function GET() {
  try {
    // Create visitor
    const visitor = await prisma.visitor.findFirst({
      where: {
        id: visitorId,
      },
    })
    // Return successful response
    return NextResponse.json(visitor, { status: 201 })
  } catch (error) {
    // Create a safe error object that can be serialized to JSON
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const errorName = error instanceof Error ? error.name : 'Error'

    // Log the error
    console.error(`Error getting visitor: ${errorName} - ${errorMessage}`)

    // Return error response with serializable object
    return NextResponse.json(
      {
        error: {
          message: errorMessage,
          type: errorName,
        },
      },
      {
        status: 500,
      },
    )
  }
}

// create needed at setup
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Create visitor
    const visitor = await prisma.visitor.create({
      data: {
        count: body.count || 0,
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(visitor, { status: 201 })
  } catch (error) {
    // Create a safe error object that can be serialized to JSON
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const errorName = error instanceof Error ? error.name : 'Error'

    // Log the error
    console.error(`Error creating visitor: ${errorName} - ${errorMessage}`)

    // Return error response with serializable object
    return NextResponse.json(
      {
        error: {
          message: errorMessage,
          type: errorName,
        },
      },
      {
        status: 500,
      },
    )
  }
}

// increment visitors count
export async function PATCH() {
  try {
    const visitor = await prisma.visitor.findFirst({
      where: {
        id: visitorId,
      },
    })

    // Calculate new count
    const newCount = visitor?.count !== undefined ? visitor.count + 1 : 1

    // Update visitor
    const updatedVisitor = await prisma.visitor.update({
      where: { id: visitorId },
      data: {
        count: newCount,
        updatedAt: new Date(),
      },
    })

    // Return successful response
    return NextResponse.json(updatedVisitor)
  } catch (error) {
    // Create a safe error object that can be serialized to JSON
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const errorName = error instanceof Error ? error.name : 'Error'

    // Log the error
    console.error(`Error updating visitor: ${errorName} - ${errorMessage}`)

    // Return error response with serializable object
    return NextResponse.json(
      {
        error: {
          message: errorMessage,
          type: errorName,
        },
      },
      {
        status: 500,
      },
    )
  }
}

// app/api/test-visitor/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '../../../../prisma/generated/prisma'

export async function POST() {
  try {
    // Test MongoDB connection with a simple query
    const prisma = new PrismaClient()

    // First try to connect
    await prisma.$connect()

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
    })
  } catch (error) {
    // Log detailed error
    console.error('Connection test error:', error)

    // Create a safe error object
    const safeError = {
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      name: error instanceof Error ? error.name : 'Error',
    }

    // Return error response
    return NextResponse.json(
      {
        success: false,
        error: safeError,
      },
      {
        status: 500,
      },
    )
  }
}

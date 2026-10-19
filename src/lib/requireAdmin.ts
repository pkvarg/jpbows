import { NextResponse } from 'next/server'
import { auth } from '@/auth'

// Middleware only guards the /admin pages, so every API route that changes data checks the session itself.
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}

import { NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { requireAdmin } from '@/lib/requireAdmin'

const TOKEN_TTL_SECONDS = 10 * 60

// Short-lived pass for uploading images to the hono API. Only a logged-in admin gets one;
// hono checks the signature with the same JPBOWS_UPLOAD_SECRET, which never reaches the browser.
export async function POST() {
  const denied = await requireAdmin()
  if (denied) return denied

  const secret = process.env.JPBOWS_UPLOAD_SECRET
  if (!secret) {
    console.error('JPBOWS_UPLOAD_SECRET is not set')
    return NextResponse.json({ error: 'Upload is not configured' }, { status: 500 })
  }

  const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS
  const payload = Buffer.from(JSON.stringify({ client: 'jpbows', exp })).toString('base64url')
  const signature = createHmac('sha256', secret).update(payload).digest('base64url')

  return NextResponse.json({ token: `${payload}.${signature}`, expiresAt: exp * 1000 })
}

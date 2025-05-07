import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

// Create the i18n middleware
const intlMiddleware = createIntlMiddleware(routing)

// Define the auth middleware with redirect logic
const authMiddleware = async (request: NextRequest) => {
  const reqUrl = new URL(request.url)
  const pathname = reqUrl.pathname

  // Get auth session
  const session = await auth()

  // If no session and not on home page, redirect to sign in
  if (!session && pathname !== '/') {
    //const locale = pathname.split('/')[1] || routing.defaultLocale
    return NextResponse.redirect(
      // new URL(
      //   `/${locale}${BASE_PATH}/signin?callbackUrl=${encodeURIComponent(pathname)}`,
      //   request.url,
      // ),
      new URL(
        `/api/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`, // FIX: Always use /api/auth/signin
        request.url,
      ),
    )
  }

  // Run i18n middleware if auth passes
  return intlMiddleware(request)
}

// Combined middleware function
export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname

  // Check if path contains /admin after the locale prefix
  // This pattern matches /en/admin, /sk/admin, /de-DE/admin, etc.
  const adminPathRegex = /^\/(de-DE|sk|en)\/admin/
  if (adminPathRegex.test(pathname)) {
    return authMiddleware(request)
  }

  // For non-admin paths, just return the i18n middleware response
  return intlMiddleware(request)
}

// Define the matcher that combines both requirements
export const config = {
  matcher: ['/(de-DE|sk|en)/admin/:path*', '/', '/(de-DE|sk|en)/:path*'],
}

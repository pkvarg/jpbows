import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/api/uploads/:path*', // Serve from the mapped directory
      },
    ]
  },
  images: {
    domains: ['picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https' as 'https',
        hostname: 'hono-api.pictusweb.com',
        pathname: '/api/upload/jpbows/**',
      },
      {
        protocol: 'http' as 'http',
        hostname: 'localhost',
        port: '3013',
        pathname: '/api/upload/jpbows/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)

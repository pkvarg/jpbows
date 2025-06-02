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
      {
        protocol: 'https' as 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https' as 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default withNextIntl(nextConfig)

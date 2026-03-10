import type { Metadata } from 'next'
import { Poiret_One, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import NavbarServer from './components/translationServerComponents/NavbarServer'
import FooterServerComponent from './components/translationServerComponents/FooterServerComponent'

const poiretOne = Poiret_One({
  variable: '--font-poiret-one',
  weight: ['400'],
  subsets: ['latin'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'bow4bass',
  description: 'Double Basses and bows.',
  openGraph: {
    title: 'bow4bass',
    description: 'Double Basses and bows.',
    url: 'https://bow4bass.com',
    siteName: 'bow4bass',
    images: [
      {
        url: 'https://bow4bass.com/bow4bass.webp',
        width: 1200,
        height: 630,
        alt: 'bow4bass - Double Basses and bows',
      },
    ],
    locale: 'sk_SK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'bow4bass',
    description: 'Double Basses and bows.',
    images: ['https://bow4bass.com/bow4bass.webp'],
  },
}

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'sk' }]
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: 'en-US' | 'sk' }>
}>) {
  return (
    <html lang={(await params).lang}>
      <body className={`${poiretOne.variable} ${cormorant.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <NavbarServer />
          {children}
          <FooterServerComponent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

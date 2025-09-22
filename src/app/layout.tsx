import type { Metadata } from 'next'
//import { Geist, Geist_Mono } from 'next/font/google'
// import { Great_Vibes } from 'next/font/google'
import { Crimson_Text } from 'next/font/google'
// import { Dancing_Script } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import NavbarServer from './components/translationServerComponents/NavbarServer'
import FooterServerComponent from './components/translationServerComponents/FooterServerComponent'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

const crimsonText = Crimson_Text({
  variable: '--font-crimson-text',
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  style: ['normal', 'italic'],
})

// const greatVibes = Great_Vibes({
//   variable: '--font-great-vibes',
//   weight: ['400'],
//   subsets: ['latin'],
// })
// const dancingScript = Dancing_Script({
//   variable: '--font-dancing-script',
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
// })

export const metadata: Metadata = {
  title: 'bow4bass',
  description: 'Double Basses and bows.',
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
      <body className={`${crimsonText.variable} font-serif antialiased`}>
        <NextIntlClientProvider>
          <NavbarServer />
          {children}
          <FooterServerComponent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

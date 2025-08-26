import type { Metadata } from 'next'
//import { Geist, Geist_Mono } from 'next/font/google'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import NavbarServer from './components/translationServerComponents/NavbarServer'
import FooterServerComponent from './components/translationServerComponents/FooterServerComponent'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

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
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <NextIntlClientProvider>
          <NavbarServer />
          {children}
          <FooterServerComponent />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

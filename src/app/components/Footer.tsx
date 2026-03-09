'use client'
import React, { FC } from 'react'
import { Link } from '@/i18n/routing'
import CookieConsent from 'react-cookie-consent'

interface TranslationProps {
  translations: {
    cookies: string
    agree: string
    disagree: string
    tradeRules: string
    about: string
    reviews?: string
  }
}

const Footer: FC<TranslationProps> = ({ translations }) => {
  const { cookies, agree, disagree, tradeRules, about, reviews } = translations

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/visitors/jpbows/increase`

  const incrementCount = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Failed to increment count')
      }
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  const loadUmamiScript = () => {
    if (
      typeof window !== 'undefined' &&
      !document.querySelector('script[data-website-id="f7e8b344-d076-4af2-87d6-a22efc731444"]')
    ) {
      const script = document.createElement('script')
      script.defer = true
      script.src = 'https://umami-p00gs00gwcwo00s4k4c4kgg8.pictusweb.com/script.js'
      script.setAttribute('data-website-id', 'f7e8b344-d076-4af2-87d6-a22efc731444')
      document.head.appendChild(script)
    }
  }

  return (
    <div className="bg-[#0f0b06] border-t border-[#c9903a]/20">
      <CookieConsent
        location="bottom"
        style={{
          background: '#1c1510',
          color: '#f5f0e8',
          fontSize: '17px',
          textAlign: 'start',
          fontFamily: 'var(--font-playfair), serif',
          padding: '16px 24px',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.3)',
          border: 'none',
          borderTop: '1px solid rgba(201, 144, 58, 0.2)',
        }}
        buttonStyle={{
          background: '#e80e19',
          color: '#f5f0e8',
          fontSize: '16px',
          padding: '8px 24px',
          borderRadius: '0px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-playfair), serif',
          transition: 'background-color 0.2s ease',
        }}
        buttonText={agree}
        expires={365}
        enableDeclineButton
        onDecline={() => { incrementCount() }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#c4b8a8',
          fontSize: '16px',
          padding: '8px 24px',
          borderRadius: '0px',
          border: '1px solid rgba(201, 144, 58, 0.25)',
          cursor: 'pointer',
          fontFamily: 'var(--font-playfair), serif',
          marginRight: '12px',
          transition: 'all 0.2s ease',
        }}
        declineButtonText={disagree}
        onAccept={() => { incrementCount(); loadUmamiScript() }}
      >
        {cookies}
      </CookieConsent>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2
              className="text-[#e80e19] text-3xl font-bold italic"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              bow4bass
            </h2>
            <p className="text-[#c4b8a8] text-base leading-relaxed" style={{ fontFamily: 'var(--font-playfair)' }}>
              +421 905 338 081
            </p>
            <a
              href="mailto:info@bow4bass.com"
              className="text-[#c4b8a8] text-base hover:text-[#e8b86d] transition-colors"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              info@bow4bass.com
            </a>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-3">
            <span className="text-[#e8b86d] text-sm tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Pages
            </span>
            <Link className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="/about" style={{ fontFamily: 'var(--font-playfair)' }}>
              {about}
            </Link>
            <Link className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="/gdpr" style={{ fontFamily: 'var(--font-playfair)' }}>
              GDPR
            </Link>
            <Link className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="/trade-rules" style={{ fontFamily: 'var(--font-playfair)' }}>
              {tradeRules}
            </Link>
            <Link className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="/reviews" style={{ fontFamily: 'var(--font-playfair)' }}>
              {reviews || 'Reviews'}
            </Link>
          </div>

          {/* Partners */}
          <div className="flex flex-col gap-3">
            <span className="text-[#e8b86d] text-sm tracking-[0.2em] uppercase mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
              Partners
            </span>
            <Link className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="/bivaj-art" style={{ fontFamily: 'var(--font-playfair)' }}>
              Bivaj Art
            </Link>
            <a className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="https://www.slovakdoublebassclub.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-playfair)' }}>
              Slovak Double Bass Club
            </a>
            <a className="text-[#f5f0e8] text-base hover:text-[#e8b86d] transition-colors" href="https://www.bassband.sk" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-playfair)' }}>
              BassBand
            </a>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-[#c9903a]/15 pt-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-[#c4b8a8] text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
            &copy; {Date().substring(11, 15)} bow4bass. All rights reserved.
          </p>
          <a
            href="https://www.pictusweb.sk"
            target="_blank"
            rel="noreferrer"
            className="text-[#c4b8a8]/40 text-sm tracking-widest hover:text-[#c4b8a8] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            &#60;&#47;&#62; Pictusweb Development
          </a>
        </div>

      </div>
    </div>
  )
}

export default Footer

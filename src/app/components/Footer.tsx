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
    footerAtelier?: string
    footerCraftsmanship?: string
    footerMusicScene?: string
    footerContact?: string
  }
}

const Footer: FC<TranslationProps> = ({ translations }) => {
  const { cookies, agree, disagree, tradeRules, reviews, footerAtelier, footerCraftsmanship, footerMusicScene, footerContact } = translations

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
    <div className="bg-[#f0ece6] border-t border-[#e0d8ce]">
      <CookieConsent
        location="bottom"
        style={{
          background: '#faf8f5',
          color: '#1c1208',
          fontSize: '14px',
          textAlign: 'start',
          fontFamily: 'var(--font-poiret-one), sans-serif',
          fontWeight: '400',
          letterSpacing: '0.05em',
          padding: '18px 28px',
          boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.08)',
          border: 'none',
          borderTop: '1px solid #e0d8ce',
          alignItems: 'center',
        }}
        buttonStyle={{
          background: '#e80e19',
          color: '#faf8f5',
          fontSize: '13px',
          fontWeight: '900',
          letterSpacing: '0.15em',
          padding: '10px 24px',
          borderRadius: '0px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-poiret-one), Georgia, serif',
          textTransform: 'uppercase',
          transition: 'background-color 0.2s ease',
          marginLeft: '8px',
          WebkitTextStroke: '0.3px currentColor',
        }}
        buttonText={agree}
        expires={365}
        enableDeclineButton
        onDecline={() => {
          incrementCount()
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#9b8f84',
          fontSize: '13px',
          fontWeight: '900',
          letterSpacing: '0.15em',
          padding: '10px 24px',
          borderRadius: '0px',
          border: '1px solid #e0d8ce',
          cursor: 'pointer',
          fontFamily: 'var(--font-poiret-one), Georgia, serif',
          textTransform: 'uppercase',
          marginRight: '8px',
          transition: 'all 0.2s ease',
          WebkitTextStroke: '0.3px currentColor',
        }}
        declineButtonText={disagree}
        onAccept={() => {
          incrementCount()
          loadUmamiScript()
        }}
      >
        {cookies}
      </CookieConsent>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 lg:py-20">

        {/* Top: Brand */}
        <div className="mb-12">
          <h2
            className="text-3xl lg:text-4xl text-[#e80e19] italic font-semibold mb-3"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            bow4bass
          </h2>
          <div className="w-8 h-0.5 bg-[#e80e19]" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Info */}
          <div>
            <span
              className="text-[#8b6914] tracking-[0.3em] text-sm uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {footerAtelier || 'Atelier'}
            </span>
            <div className="flex flex-col gap-2">
              <Link
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
                href={`/gdpr`}
              >
                GDPR
              </Link>
              <Link
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
                href={`/trade-rules`}
              >
                {tradeRules}
              </Link>
              <Link
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
                href={`/reviews`}
              >
                {reviews || 'Reviews'}
              </Link>
            </div>
          </div>

          {/* Column 2: Projects */}
          <div>
            <span
              className="text-[#8b6914] tracking-[0.3em] text-sm uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {footerCraftsmanship || 'Partners'}
            </span>
            <div className="flex flex-col gap-2">
              <Link
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
                href={`/bivaj-art`}
              >
                Bivaj Art
              </Link>
            </div>
          </div>

          {/* Column 3: Community */}
          <div>
            <span
              className="text-[#8b6914] tracking-[0.3em] text-sm uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {footerMusicScene || 'Music Scene'}
            </span>
            <div className="flex flex-col gap-2">
              <a
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
                href="https://www.slovakdoublebassclub.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Slovak Double Bass Club
              </a>
              <a
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base"
                style={{ fontFamily: 'var(--font-poiret-one)' }}
                href="https://www.bassband.sk"
                target="_blank"
                rel="noopener noreferrer"
              >
                BassBand
              </a>
            </div>
          </div>

          {/* Column 4: Contact */}
          <div>
            <span
              className="text-[#8b6914] tracking-[0.3em] text-sm uppercase mb-4 block"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              {footerContact || 'Contact'}
            </span>
            <div className="flex flex-col gap-2 text-[#3d3228]" style={{ fontFamily: 'var(--font-cormorant)' }}>
              <p className="text-lg">+421 905 338 081</p>
              <a
                href="mailto:info@bow4bass.com"
                className="text-lg text-[#1c1208] hover:text-[#e80e19] transition-colors"
              >
                info@bow4bass.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#e0d8ce] mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[#9b8f84] text-sm" style={{ fontFamily: 'var(--font-poiret-one)' }}>
            Copyright &copy; {new Date().getFullYear()} bow4bass
          </span>
          <a
            href="https://www.pictusweb.sk"
            target="_blank"
            rel="noreferrer"
            className="text-[#9b8f84] text-sm hover:text-[#1c1208] transition-colors tracking-widest"
            style={{ fontFamily: 'var(--font-poiret-one)' }}
          >
            &#60;&#47;&#62; Pictusweb Development
          </a>
        </div>

      </div>
    </div>
  )
}

export default Footer

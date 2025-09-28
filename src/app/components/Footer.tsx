'use client'
import React, { FC } from 'react'
//import { motion } from 'framer-motion'
//import { footerVariants } from '@/lib/motion'
//import { useParams } from 'next/navigation'
import { Link } from '@/i18n/routing'
import CookieConsent from 'react-cookie-consent'

interface TranslationProps {
  translations: {
    cookies: string
    agree: string
    disagree: string
    tradeRules: string
    about: string
  }
}

const Footer: FC<TranslationProps> = ({ translations }) => {
  const { cookies, agree, disagree, tradeRules, about } = translations
  //const { locale } = useParams()

  const apiUrl = 'https://hono-api.pictusweb.com/api/visitors/jpbows/increase'
  //const apiUrl = 'http://localhost:3013/api/visitors/jpbows/increase'

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
    <div style={{ background: '#fefefe' }}>
      <CookieConsent
        location="bottom"
        style={{
          background: '#fefefe',
          color: '#2f0000',
          fontSize: '17px',
          textAlign: 'start',
          fontFamily: 'var(--font-poiret-one), sans-serif',
          fontWeight: '800',
          padding: '16px 24px',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
          border: 'none',
          borderTop: '1px solid rgba(47, 0, 0, 0.1)',
        }}
        buttonStyle={{
          background: '#e80e19',
          color: '#fefefe',
          fontSize: '17px',
          fontWeight: '800',
          padding: '8px 20px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-poiret-one), sans-serif',
          transition: 'background-color 0.2s ease',
        }}
        buttonText={agree}
        expires={365}
        enableDeclineButton
        onDecline={() => {
          incrementCount()
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#2f0000',
          fontSize: '17px',
          fontWeight: '800',
          padding: '8px 20px',
          borderRadius: '6px',
          border: '1px solid rgba(47, 0, 0, 0.2)',
          cursor: 'pointer',
          fontFamily: 'var(--font-poiret-one), sans-serif',
          marginRight: '12px',
          transition: 'all 0.2s ease',
        }}
        declineButtonText={disagree}
        onAccept={() => {
          incrementCount()
          loadUmamiScript()
        }}
      >
        {cookies}
      </CookieConsent>
      {/* <motion.footer variants={footerVariants} initial="hidden" whileInView="show"> */}
      <div className={`flex flex-col gap-4`}>
        <div className="mb-[10px] h-[2px] bg-white opacity-10" />
        <div className="flex flex-col text-[20px] font-light" style={{ color: '#0a0a0a' }}>
          <div className="flex lg:flex-row flex-col items-start justify-between flex-wrap gap-4 mx-0  lg:mx-12">
            <div className="flex lg:flex-row flex-col gap-2 justify-center items-center">
              <h4 className="flex-nowrap" style={{ color: '#0e1528' }}>
                Copyright &copy; {Date().substring(11, 15)}
              </h4>
              <h4 style={{ color: '#0e1528' }}>bow4bass</h4>
            </div>
            <Link className="text-[#0e1528] hover:text-[#e80e19] transition-colors" href={`/about`}>
              {about}
            </Link>

            <div className="flex flex-col gap-2 justify-center items-center">
              <Link
                className="text-[#0e1528] hover:text-[#e80e19] transition-colors"
                href={`/gdpr`}
              >
                GDPR
              </Link>

              <Link
                className="text-[#0e1528] hover:text-[#e80e19] transition-colors"
                href={`/trade-rules`}
              >
                {tradeRules}
              </Link>
            </div>

            {/* <Link className="text-[#0e1528] hover:text-[#e80e19] transition-colors" href={`/gdpr`}>
              GDPR
            </Link> */}
            {/* 
            <Link
              className="text-[#0e1528] hover:text-[#e80e19] transition-colors"
              href={`/trade-rules`}
            >
              {tradeRules}
            </Link> */}

            <div className="flex flex-col gap-2 justify-center items-center">
              <Link
                className="text-[#0e1528] hover:text-[#e80e19] transition-colors"
                href={`/bivaj-art`}
              >
                Bivaj Art
              </Link>
              {/* 
              <Link
                className="text-[#0e1528] hover:text-[#e80e19] transition-colors"
                href={`/trade-rules`}
              >
                {tradeRules}
              </Link> */}
            </div>

            <p className="font-normal" style={{ color: '#0e1528' }}>
              Phone: +421 905 338 081
              <br />
              <a href="mailto:info@bow4bass.com">email: info@bow4bass.com</a>
            </p>
          </div>
          <div className="flex justify-center items-center mt-4">
            <a
              href="https://www.pictusweb.sk"
              target="_blank"
              rel="noreferrer"
              className="text-[17.5px] tracking-widest"
              style={{ color: '#0e1528' }}
            >
              &#60;&#47;&#62; Pictusweb Development
            </a>
          </div>
        </div>
      </div>
      {/* </motion.footer> */}
      <div className="bg:hero-gradient h-10"></div>
    </div>
  )
}

export default Footer

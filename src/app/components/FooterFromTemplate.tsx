'use client'
import React, { FC } from 'react'
//import { motion } from 'framer-motion'
//import { footerVariants } from '@/lib/motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'
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
  const { locale } = useParams()

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

  return (
    <div className="mx-8">
      <CookieConsent
        location="bottom"
        style={{
          background: '#834daf',
          color: '#ffffff',
          fontSize: '19px',
          textAlign: 'start',
        }}
        buttonStyle={{
          background: '#1d9f2f',
          color: '#fff',
          fontSize: '18px',
          paddingTop: '9px',
          paddingLeft: '40px',
          paddingRight: '40px',
          borderRadius: '20px',
        }}
        buttonText={agree}
        expires={365}
        enableDeclineButton
        onDecline={() => {
          incrementCount()
        }}
        declineButtonStyle={{
          background: 'red',
          color: '#fff',
          fontSize: '18px',
          paddingTop: '7.5px',
          borderRadius: '20px',
        }}
        declineButtonText={disagree}
        onAccept={() => {
          incrementCount()
        }}
      >
        {cookies}
      </CookieConsent>
      {/* <motion.footer variants={footerVariants} initial="hidden" whileInView="show"> */}
      <div className={`flex flex-col gap-8`}>
        <div className="mb-[10px] h-[2px] bg-white opacity-10" />
        <div className="flex flex-col text-[20px] font-light">
          <div className="flex lg:flex-row flex-col items-center justify-between flex-wrap gap-4 mx-0  lg:mx-12">
            <div className="flex lg:flex-row flex-col gap-2 justify-center items-center">
              <h4 className="flex-nowrap text-white">
                Copyright &copy; {Date().substring(11, 15)}
              </h4>
              <h4 className=" text-white">Pictusweb s.r.o.</h4>
            </div>
            <Link className=" text-white hover:text-[#0388f4]" href={`/${locale}/about`}>
              {about}
            </Link>

            <a className="text-white hover:text-[#0388f4]" href={`/${locale}/gdpr`}>
              GDPR
            </a>

            <a className="text-white hover:text-[#0388f4]" href={`/${locale}/trade-rules`}>
              {tradeRules}
            </a>

            <p className="font-normal text-white  text-[17.5px] opacity-50">
              WhatsApp: +421 904 798 505
              <br />
              <a href="mailto:info@pictusweb.sk">email: info@pictusweb.sk</a>
            </p>
          </div>
        </div>
      </div>
      {/* </motion.footer> */}
      <div className="bg:hero-gradient h-10"></div>
    </div>
  )
}

export default Footer

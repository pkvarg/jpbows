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

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <CookieConsent
        location="bottom"
        style={{
          background: '#0f1729',
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
      <div className={`flex flex-col gap-4`}>
        <div className="mb-[10px] h-[2px] bg-white opacity-10" />
        <div className="flex flex-col text-[20px] font-light">
          <div className="flex lg:flex-row flex-col items-center justify-between flex-wrap gap-4 mx-0  lg:mx-12">
            <div className="flex lg:flex-row flex-col gap-2 justify-center items-center">
              <h4 className="flex-nowrap text-gray-400">
                Copyright &copy; {Date().substring(11, 15)}
              </h4>
              <h4 className=" text-gray-400">JP Bows</h4>
            </div>
            <Link className=" text-gray-400 hover:text-[#0388f4]" href={`/about`}>
              {about}
            </Link>

            <a className="text-gray-400 hover:text-[#0388f4]" href={`/gdpr`}>
              GDPR
            </a>

            <a className="text-gray-400 hover:text-[#0388f4]" href={`/trade-rules`}>
              {tradeRules}
            </a>

            <p className="font-normal text-gray-400  text-[17.5px]">
              Phone: +421 904 798 505
              <br />
              <a href="mailto:info@jpbows.sk">email: info@jpbows.sk</a>
            </p>
          </div>
          <div className="flex justify-center items-center mt-4">
            <a
              href="https://www.pictusweb.sk"
              target="_blank"
              rel="noreferrer"
              className="text-[12.5px] text-gray-400"
            >
              &#60;&#47;&#62; PICTUSWEB Development
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

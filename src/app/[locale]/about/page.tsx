'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

const About = () => {
  const t = useTranslations('Home')

  return (
    <div>
      <h1 className="text-xl lg:text-5xl font-semibold text-[#e80e19] leading-tight text-center my-16">
        {t('aboutCompanyTitle')}
      </h1>
    </div>
  )
}

export default About

'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

const Repairs = () => {
  const t = useTranslations('Home')

  return (
    <h1 className="text-xl lg:text-4xl font-semibold text-[#e80e19] leading-tight text-center mt-8">
      {t('repairsTitle')}
    </h1>
  )
}

export default Repairs

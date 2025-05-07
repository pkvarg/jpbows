'use client'
import React, { FC } from 'react'
import LangSwitcher from './LangSwitcher'
import { Link } from '@/i18n/routing'

interface TranslationProps {
  translations: {
    home: string
  }
}

const PagesNavbar: FC<TranslationProps> = ({ translations }) => {
  const { home } = translations

  return (
    <div className="flex flex-row justify-between">
      <Link href={'/'} className="p-2">
        {home}
      </Link>
      <LangSwitcher />
    </div>
  )
}

export default PagesNavbar

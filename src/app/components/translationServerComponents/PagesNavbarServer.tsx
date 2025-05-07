import PagesNavbar from '@/app/components/PagesNavbar'
import React from 'react'
import { useTranslations } from 'next-intl'

const PagesNavbarServer = () => {
  const t = useTranslations('Home')

  const navTranslations = { home: t('home') }

  return <PagesNavbar translations={navTranslations} />
}

export default PagesNavbarServer

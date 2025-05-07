import React from 'react'
import { useTranslations } from 'next-intl'
import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'

const About = () => {
  const t = useTranslations('Home')

  return (
    <div>
      <PagesNavbarServer />
      <h1 className="text-center">{t('headerAbout')}</h1>
    </div>
  )
}

export default About

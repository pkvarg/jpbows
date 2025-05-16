import React from 'react'
import { useTranslations } from 'next-intl'
import Footer from './../FooterFromTemplate'

const FooterServerComponent = () => {
  const t = useTranslations('Home')

  const footerTranslations = {
    cookies: t('cookiesText'),
    agree: t('cookiesAgree'),
    disagree: t('cookiesDisagree'),
    about: t('headerAbout'),
    tradeRules: t('tradeRules'),
  }
  return <Footer translations={footerTranslations} />
}

export default FooterServerComponent

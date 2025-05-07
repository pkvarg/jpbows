import React from 'react'
//import { useTranslations } from 'next-intl'
import Footer from '../Footer'

const FooterServerComponent = () => {
  // const t = useTranslations('Home')

  // const footerTranslations = {
  //   cookies: t('cookiesText'),
  //   agree: t('cookiesAgree'),
  //   disagree: t('cookiesDisagree'),
  //   about: t('headerAbout'),
  //   tradeRules: t('tradeRules'),
  // }
  return (
    //<Footer translations={footerTranslations} />
    <Footer />
  )
}

export default FooterServerComponent

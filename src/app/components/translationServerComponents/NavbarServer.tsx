import React from 'react'
//import { useTranslations } from 'next-intl'
import Navbar from '../Navbar'

const NavbarServer = () => {
  // const t = useTranslations('Home')

  // const navbarTranslations = {
  //   about: t('headerAbout'),
  //   contact: t('headerContact'),
  //   gdpr: t('headerGdpr'),
  //   tradeRules: t('tradeRules'),
  // }

  return <Navbar />
  // <Navbar translations={navbarTranslations} />
}

export default NavbarServer

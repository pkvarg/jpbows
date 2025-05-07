import React from 'react'
//import { useTranslations } from 'next-intl'
import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'

const Gdpr = () => {
  // const t = useTranslations('Home')

  return (
    <div>
      <PagesNavbarServer />
      <h1 className="text-center">Gdpr</h1>
    </div>
  )
}

export default Gdpr

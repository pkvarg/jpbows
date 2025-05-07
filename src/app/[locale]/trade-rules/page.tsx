import React from 'react'
import { useTranslations } from 'next-intl'
import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'

const TradeRules = () => {
  const t = useTranslations('Home')

  return (
    <div>
      <PagesNavbarServer />
      <h1 className="text-center">{t('tradeRules')}</h1>
    </div>
  )
}

export default TradeRules

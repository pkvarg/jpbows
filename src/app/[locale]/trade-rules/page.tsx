import React from 'react'
import { useTranslations } from 'next-intl'
import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'

const TradeRules = () => {
  const t = useTranslations('Home')

  return (
    <div>
      <h1 className="text-xl lg:text-5xl font-semibold text-[#e80e19] leading-tight text-center my-16">
        Obchodné podmienky
      </h1>
    </div>
  )
}

export default TradeRules

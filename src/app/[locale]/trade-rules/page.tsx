'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import LegalDocument from '@/app/components/LegalDocument'

const SECTION_COUNT = 13

const TradeRules = () => {
  const t = useTranslations('Legal')

  return (
    <LegalDocument
      eyebrow={t('termsEyebrow')}
      title={t('termsTitle')}
      subtitle={t('termsSubtitle')}
      sections={Array.from({ length: SECTION_COUNT }, (_, i) => ({
        id: `section-${i + 1}`,
        title: t(`termsSection${i + 1}Title`),
        text: t(`termsSection${i + 1}Text`),
      }))}
      backLabel={t('backToContact')}
    />
  )
}

export default TradeRules

'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import LegalDocument from '@/app/components/LegalDocument'

const sections = [
  { id: 'controller', key: 'Controller' },
  { id: 'contact-form', key: 'ContactForm' },
  { id: 'customers', key: 'Customers' },
  { id: 'reviews', key: 'Reviews' },
  { id: 'cookies', key: 'Cookies' },
  { id: 'youtube', key: 'Youtube' },
  { id: 'security-logs', key: 'SecurityLogs' },
  { id: 'recipients', key: 'Recipients' },
  { id: 'transfers', key: 'Transfers' },
  { id: 'retention', key: 'Retention' },
  { id: 'rights', key: 'Rights' },
  { id: 'security', key: 'Security' },
  { id: 'changes', key: 'Changes' },
]

const GDPR = () => {
  const t = useTranslations('Legal')

  return (
    <LegalDocument
      eyebrow="GDPR"
      title={t('privacyTitle')}
      subtitle={t('privacySubtitle')}
      sections={sections.map(({ id, key }) => ({
        id,
        title: t(`privacy${key}Title`),
        text: t(`privacy${key}Text`),
      }))}
      backLabel={t('backToContact')}
    />
  )
}

export default GDPR

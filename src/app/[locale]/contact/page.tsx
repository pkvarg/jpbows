import ContactComponent from '@/app/components/Contact'
import React from 'react'
import { useTranslations } from 'next-intl'
//import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'

const Contact = () => {
  const t = useTranslations('Home')

  const contactTranslations = {
    contactTitle: t('contactTitle'),
    contactName: t('contactName'),
    contactEmail: t('contactEmail'),
    contactPhone: t('contactPhone'),
    contactMessage: t('contactMessage'),
    contactAgree: t('contactAgree'),
    contactGdpr: t('contactGdpr'),
    contactSend: t('contactSend'),
    //contactError2: t('contactError2'),
    contactError: t('contactError'),
    contactSuccess: t('contactSuccess'),
    contactGdpr1: t('contactGdpr1'),
    // contactGdpr2: t('contactGdpr2'),
    contactPlaceholderName: t('contactPlaceholderName'),
    contactPlaceholderEmail: t('contactPlaceholderEmail'),
    contactPlaceholderPhone: t('contactPlaceholderPhone'),
    contactPlaceholderMessage: t('contactPlaceholderMessage'),
    contactSubtitle: t('contactSubtitle'),
  }

  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* <PagesNavbarServer /> */}
      <ContactComponent translations={contactTranslations} />
    </div>
  )
}

export default Contact

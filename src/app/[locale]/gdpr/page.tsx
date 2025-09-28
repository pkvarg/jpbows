'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const GDPR = () => {
  const t = useTranslations('Home')

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* Header */}
      <div className="bg-white border-b border-[#2f0000]/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] tracking-wide">
              {t('gdprTitle')}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12 text-[#2f0000]">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprIntro')}</p>
          </div>

          {/* What it means */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprWhatMeansTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprWhatMeansText')}</p>
          </section>

          {/* Data collected */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprDataCollectedTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprDataCollectedText')}</p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprCookiesTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed mb-6">{t('gdprCookiesIntro')}</p>

            <div className="space-y-8">
              {/* Essential cookies */}
              <div className="bg-[#e80e19]/5 border-l-4 border-[#e80e19] rounded-md p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#2f0000] mb-4">
                  {t('gdprCookiesEssentialTitle')}
                </h3>
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {t('gdprCookiesEssentialText')}
                </p>
              </div>

              {/* Analytics cookies */}
              <div className="bg-[#e80e19]/5 border-l-4 border-[#e80e19] rounded-md p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#2f0000] mb-4">
                  {t('gdprCookiesAnalyticsTitle')}
                </h3>
                <p className="text-lg leading-relaxed mb-4 whitespace-pre-line">
                  {t('gdprCookiesAnalyticsText')}
                </p>
              </div>

              {/* What we don't use */}
              <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#2f0000] mb-4">
                  {t('gdprCookiesNotUsedTitle')}
                </h3>
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {t('gdprCookiesNotUsedText')}
                </p>
              </div>

              {/* Consent management */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-md p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#2f0000] mb-4">
                  {t('gdprCookiesManagementTitle')}
                </h3>
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {t('gdprCookiesManagementText')}
                </p>
              </div>

              {/* Visitors */}
              <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-md p-6">
                <h3 className="text-xl lg:text-2xl font-bold text-[#2f0000] mb-4">
                  {t('gdprCookiesVisitorsTitle')}
                </h3>
                <p className="text-lg leading-relaxed">{t('gdprCookiesVisitorsText')}</p>
              </div>
            </div>
          </section>

          {/* Other data */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprOtherDataTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprOtherDataText')}</p>
          </section>

          {/* Purposes */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprPurposesTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprPurposesText')}</p>
          </section>

          {/* Retention */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprRetentionTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprRetentionText')}</p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprSecurityTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprSecurityText')}</p>
          </section>

          {/* Rights */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprRightsTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprRightsText')}</p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprContactTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprContactText')}</p>
          </section>

          {/* Processors */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprProcessorsTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed mb-4">{t('gdprProcessorsText')}</p>
            <div className="bg-[#e80e19]/5 rounded-md p-6">
              <ul className="text-lg leading-relaxed space-y-2">
                <li>
                  • <strong>Hosting:</strong> hetzner.com
                </li>
                <li>
                  • <strong>Email služby:</strong> hostinger.com
                </li>
                <li>
                  • <strong>Webová analytika:</strong> Umami (vlastný server)
                </li>
              </ul>
            </div>
          </section>

          {/* Third party */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprThirdPartyTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprThirdPartyText')}</p>
          </section>

          {/* No sharing */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              {t('gdprNoSharingTitle')}
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">{t('gdprNoSharingText')}</p>
          </section>

          {/* Back to contact */}
          <div className="text-center pt-8 border-t border-[#2f0000]/10">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#e80e19] hover:bg-white hover:text-[#e80e19] text-white py-3 px-8 rounded-lg text-lg transition-colors font-bold border-1"
            >
              {t('contactTitle')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GDPR

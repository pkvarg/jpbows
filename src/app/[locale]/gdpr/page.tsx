'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const GDPR = () => {
  const t = useTranslations('Home')

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
              GDPR
            </h2>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>
          <h1 className="text-3xl lg:text-5xl text-[#1c1208] italic leading-tight" style={{fontFamily:'var(--font-cormorant)'}}>
            {t('gdprTitle')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-[#faf8f5] border border-[#e0d8ce] p-8 lg:p-12 text-[#1c1208]">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprIntro')}</p>
          </div>

          {/* What it means */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprWhatMeansTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprWhatMeansText')}</p>
          </section>

          {/* Data collected */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprDataCollectedTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprDataCollectedText')}</p>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprCookiesTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228] mb-8" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprCookiesIntro')}</p>

            <div className="space-y-6">
              {/* Essential cookies */}
              <div className="bg-[#f0ece6] border-l-4 border-[#e80e19] p-6">
                <h3 className="text-lg lg:text-xl text-[#1c1208] italic mb-4" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesEssentialTitle')}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesEssentialText')}
                </p>
              </div>

              {/* Analytics cookies */}
              <div className="bg-[#f0ece6] border-l-4 border-[#e80e19] p-6">
                <h3 className="text-lg lg:text-xl text-[#1c1208] italic mb-4" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesAnalyticsTitle')}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed mb-4 whitespace-pre-line text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesAnalyticsText')}
                </p>
              </div>

              {/* What we don't use */}
              <div className="bg-[#f0ece6] border-l-4 border-[#8b6914] p-6">
                <h3 className="text-lg lg:text-xl text-[#1c1208] italic mb-4" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesNotUsedTitle')}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesNotUsedText')}
                </p>
              </div>

              {/* Consent management */}
              <div className="bg-[#f0ece6] border-l-4 border-[#8b6914] p-6">
                <h3 className="text-lg lg:text-xl text-[#1c1208] italic mb-4" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesManagementTitle')}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed whitespace-pre-line text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesManagementText')}
                </p>
              </div>

              {/* Visitors */}
              <div className="bg-[#f0ece6] border-l-4 border-[#9b8f84] p-6">
                <h3 className="text-lg lg:text-xl text-[#1c1208] italic mb-4" style={{fontFamily:'var(--font-cormorant)'}}>
                  {t('gdprCookiesVisitorsTitle')}
                </h3>
                <p className="text-base lg:text-lg leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprCookiesVisitorsText')}</p>
              </div>
            </div>
          </section>

          {/* Other data */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprOtherDataTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprOtherDataText')}</p>
          </section>

          {/* Purposes */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprPurposesTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprPurposesText')}</p>
          </section>

          {/* Retention */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprRetentionTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprRetentionText')}</p>
          </section>

          {/* Security */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprSecurityTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprSecurityText')}</p>
          </section>

          {/* Rights */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprRightsTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprRightsText')}</p>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprContactTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprContactText')}</p>
          </section>

          {/* Processors */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprProcessorsTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228] mb-4" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprProcessorsText')}</p>
            <div className="bg-[#f0ece6] border border-[#e0d8ce] p-6">
              <ul className="text-lg leading-relaxed space-y-2 text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <li>
                  <span className="text-[#e80e19] mr-2">&mdash;</span> <strong>Hosting:</strong> hetzner.com
                </li>
                <li>
                  <span className="text-[#e80e19] mr-2">&mdash;</span> <strong>Email sluzby:</strong> hostinger.com
                </li>
                <li>
                  <span className="text-[#e80e19] mr-2">&mdash;</span> <strong>Webova analytika:</strong> Umami (vlastny server)
                </li>
              </ul>
            </div>
          </section>

          {/* Third party */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprThirdPartyTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprThirdPartyText')}</p>
          </section>

          {/* No sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {t('gdprNoSharingTitle')}
              </h2>
            </div>
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>{t('gdprNoSharingText')}</p>
          </section>

          {/* Back to contact */}
          <div className="text-center pt-8 border-t border-[#e0d8ce]">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#e80e19] text-white py-3 px-8 tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-colors"
              style={{fontFamily:'var(--font-poiret-one)'}}
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

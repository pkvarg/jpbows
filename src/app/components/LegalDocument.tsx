'use client'
import React, { useEffect } from 'react'
import { Link } from '@/i18n/routing'

export interface LegalSection {
  id: string
  title: string
  text: string
}

interface LegalDocumentProps {
  eyebrow: string
  title: string
  subtitle: string
  sections: LegalSection[]
  backLabel: string
}

const LegalDocument = ({ eyebrow, title, subtitle, sections, backLabel }: LegalDocumentProps) => {
  // Section ids are anchors (e.g. /gdpr#cookies from the cookie banner); the
  // router resets scroll after hydration, so jump to the linked section here.
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id) {
      document.getElementById(id)?.scrollIntoView()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
              {eyebrow}
            </h2>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>
          <h1 className="text-3xl lg:text-5xl text-[#1c1208] italic leading-tight" style={{fontFamily:'var(--font-cormorant)'}}>
            {title}
          </h1>
          <p className="mt-4 text-base text-[#9b8f84]" style={{fontFamily:'var(--font-cormorant)'}}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-[#faf8f5] border border-[#e0d8ce] p-8 lg:p-12 text-[#1c1208]">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-6 h-0.5 bg-[#e80e19]" />
                <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                  {section.title}
                </h2>
              </div>
              <p className="text-lg lg:text-xl leading-relaxed whitespace-pre-line text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                {section.text}
              </p>
            </section>
          ))}

          {/* Back to contact */}
          <div className="text-center pt-8 border-t border-[#e0d8ce]">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#e80e19] text-white py-3 px-8 tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-colors"
              style={{fontFamily:'var(--font-poiret-one)'}}
            >
              {backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalDocument

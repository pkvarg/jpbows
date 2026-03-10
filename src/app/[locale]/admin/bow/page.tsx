import { Link } from '@/i18n/routing'
import React from 'react'
import BowManager from '@/app/components/BowManager'

const AdminProduct = () => {
  return (
    <main className="min-h-screen px-8 pt-8 pb-16" style={{ background: '#0f0d0a' }}>
      <div className="max-w-3xl mx-auto mb-8">
        <Link href={'/admin'} className="inline-flex items-center gap-2 text-[#9b8f84] hover:text-[#faf8f5] transition-colors mb-8" style={{ fontFamily: 'var(--font-poiret-one)', fontSize: '13px', letterSpacing: '0.15em' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          NASPAT
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-6 h-0.5 bg-[#e80e19]" />
          <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.3em', fontSize: '13px', textTransform: 'uppercase' }}>Slaciky</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <BowManager />
      </div>
    </main>
  )
}

export default AdminProduct

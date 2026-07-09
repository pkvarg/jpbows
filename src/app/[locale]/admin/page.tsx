import React from 'react'
import AuthButton from '@/auth/AuthButton.server'
import { auth } from '@/auth'
//import SimpleTest from '@/app/components/SimpleTest'
import VisitorCounter from '@/app/components/Visitor'

//import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'
import { Link } from '@/i18n/routing'

const adminModules = [
  {
    href: '/admin/bass' as const,
    label: 'Instruments',
    description: 'Manage double basses, violones, gambas and cellos',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    href: '/admin/bow' as const,
    label: 'Bows',
    description: 'Manage bow catalog and pricing',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 20l16-16M4 20h4M4 20v-4" />
      </svg>
    ),
  },
  {
    href: '/admin/rental' as const,
    label: 'Rental',
    description: 'Manage rental instruments and availability',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    href: '/admin/repairs' as const,
    label: 'Repairs',
    description: 'Manage repair services showcase',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.59-5.59a2 2 0 010-2.83l.83-.83a2 2 0 012.83 0l5.59 5.59m-7.25 7.25l7.25-7.25m-7.25 7.25l-2.12 2.12a1.5 1.5 0 01-2.12 0l-.71-.71a1.5 1.5 0 010-2.12l2.12-2.12m14.14-4.24l-3.54-3.54" />
      </svg>
    ),
  },
  {
    href: '/admin/blog' as const,
    label: 'Blogs',
    description: 'Write and manage blog articles',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    href: '/admin/reviews' as const,
    label: 'Reviews',
    description: 'Moderate and manage customer reviews',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
]

const Admin = async () => {
  const session = await auth()
  return (
    <div className="min-h-screen bg-[#0f0d0a]">
      {/* Header */}
      <div className="border-b border-[#2a2018]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl lg:text-3xl text-[#faf8f5] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                bow4bass
              </h1>
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <span className="text-[#8b6914] tracking-[0.3em] text-sm uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
                Admin Panel
              </span>
            </div>
            <AuthButton key={session?.user ? 'signed-in' : 'signed-out'} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-8 h-0.5 bg-[#e80e19]" />
          <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
            Modules
          </h2>
          <div className="h-px flex-1 bg-[#2a2018]" />
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {adminModules.map((module) => (
            <Link
              key={module.href}
              href={module.href}
              className="group block bg-[#1a1510] border border-[#2a2018] p-8 hover:border-[#8b6914] hover:bg-[#1c1208] transition-all duration-300"
            >
              <div className="text-[#8b6914] mb-4 group-hover:text-[#e80e19] transition-colors duration-300">
                {module.icon}
              </div>
              <h3 className="text-xl text-[#faf8f5] mb-2 italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {module.label}
              </h3>
              <p className="text-sm text-[#c4b49a] leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>
                {module.description}
              </p>
            </Link>
          ))}

          {/* Analytics - external link */}
          <a
            href="https://analytics.pictusweb.com/share/PdxeXPCaZrZhF1ko/jpbows.pictusweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#1a1510] border border-[#2a2018] p-8 hover:border-[#8b6914] hover:bg-[#1c1208] transition-all duration-300"
          >
            <div className="text-[#8b6914] mb-4 group-hover:text-[#e80e19] transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl text-[#faf8f5] mb-2 italic" style={{fontFamily:'var(--font-cormorant)'}}>
              Analytics
            </h3>
            <p className="text-sm text-[#c4b49a] leading-relaxed" style={{fontFamily:'var(--font-cormorant)'}}>
              View website traffic and visitor analytics
            </p>
            <div className="mt-3 flex items-center gap-1 text-[#8b6914] text-xs tracking-[0.15em] uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
              External
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        </div>

        {/* Visitor Counter Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-8 h-0.5 bg-[#e80e19]" />
          <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
            Statistics
          </h2>
          <div className="h-px flex-1 bg-[#2a2018]" />
        </div>

        <div className="bg-[#1a1510] border border-[#2a2018] p-8">
          <VisitorCounter />
          {/* <SimpleTest /> */}
        </div>
      </div>
    </div>
  )
}

export default Admin

'use client'
import React, { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import LangSwitcher from './LangSwitcher'

const Navbar = () => {
  const t = useTranslations('Home')
  const [navbar, setNavbar] = useState(false)
  const [bassDropdown, setBassDropdown] = useState(false)
  const [instrumentCounts, setInstrumentCounts] = useState({
    bass: 0,
    violone: 0,
    gamba: 0,
    cello: 0,
  })

  // Fetch instrument counts
  useEffect(() => {
    const fetchInstrumentCounts = async () => {
      try {
        const response = await fetch('/api/basses')
        if (response.ok) {
          const basses: Array<{ instrumentType: string; published: boolean }> = await response.json()
          const counts = {
            bass: basses.filter((b) => b.instrumentType === 'bass' && b.published).length,
            violone: basses.filter((b) => b.instrumentType === 'violone' && b.published).length,
            gamba: basses.filter((b) => b.instrumentType === 'gamba' && b.published).length,
            cello: basses.filter((b) => b.instrumentType === 'cello' && b.published).length,
          }
          setInstrumentCounts(counts)
        }
      } catch (error) {
        console.error('Error fetching instrument counts:', error)
      }
    }
    fetchInstrumentCounts()
  }, [])

  // Function to close everything when a link is clicked
  const handleLinkClick = () => {
    setNavbar(false)
    setBassDropdown(false)
  }

  return (
    <nav className="bg-[#faf8f5] border-b border-[#e0d8ce]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 py-4"
        >
          <Image
            src="/b4b_logo9.png"
            alt="bow4bass.com"
            width={900}
            height={900}
            className="w-[36px]"
          />
          <h1
            className="text-2xl lg:text-3xl text-[#e80e19] italic font-semibold leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            bow4bass
          </h1>
        </Link>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            className="rounded-md p-2 text-[#1c1208] outline-none focus:border focus:border-[#e0d8ce]"
            onClick={() => setNavbar(!navbar)}
          >
            {navbar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop nav + mobile expandable */}
        <div
          className={`absolute left-0 right-0 top-[64px] bg-[#faf8f5] border-b border-[#e0d8ce] md:border-0 md:static md:block md:bg-transparent z-50 ${
            navbar ? 'block' : 'hidden'
          }`}
        >
          <ul
            className="flex flex-col space-y-4 px-6 py-6 md:flex-row md:items-center md:space-x-8 md:space-y-0 md:px-0 md:py-0"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            <Link
              href={'/bows'}
              className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base lg:text-lg tracking-[0.08em] uppercase font-semibold block py-1"
              onClick={handleLinkClick}
            >
              {t('navBows')}
            </Link>
            <Link
              href={'/repairs'}
              className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base lg:text-lg tracking-[0.08em] uppercase font-semibold block py-1"
              onClick={handleLinkClick}
            >
              {t('navServiceRepairs')}
            </Link>

            {/* Bass instruments dropdown */}
            <div className="relative">
              <button
                onClick={() => setBassDropdown(!bassDropdown)}
                className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base lg:text-lg tracking-[0.08em] uppercase font-semibold block py-1 w-full text-left cursor-pointer"
              >
                {t('navInstruments')} &#9662;
              </button>
              {bassDropdown && (
                <div className="md:absolute relative md:left-0 md:mt-2 md:w-56 bg-[#faf8f5] border border-[#e0d8ce] z-50">
                  <Link
                    href="/bass?type=bass"
                    className="block px-5 py-2.5 text-[#1c1208] hover:text-[#e80e19] hover:bg-[#f0ece6] transition-colors text-base tracking-wide"
                    onClick={handleLinkClick}
                  >
                    {t('navInstrumentsBass')} ({instrumentCounts.bass})
                  </Link>
                  <Link
                    href="/bass?type=violone"
                    className="block px-5 py-2.5 text-[#1c1208] hover:text-[#e80e19] hover:bg-[#f0ece6] transition-colors text-base tracking-wide"
                    onClick={handleLinkClick}
                  >
                    {t('navInstrumentsViolone')} ({instrumentCounts.violone})
                  </Link>
                  <Link
                    href="/bass?type=gamba"
                    className="block px-5 py-2.5 text-[#1c1208] hover:text-[#e80e19] hover:bg-[#f0ece6] transition-colors text-base tracking-wide"
                    onClick={handleLinkClick}
                  >
                    {t('navInstrumentsGamba')} ({instrumentCounts.gamba})
                  </Link>
                  <Link
                    href="/bass?type=cello"
                    className="block px-5 py-2.5 text-[#1c1208] hover:text-[#e80e19] hover:bg-[#f0ece6] transition-colors text-base tracking-wide"
                    onClick={handleLinkClick}
                  >
                    {t('navInstrumentsCello')} ({instrumentCounts.cello})
                  </Link>
                  <Link
                    href="/bass"
                    className="block px-5 py-2.5 text-[#1c1208] hover:text-[#e80e19] hover:bg-[#f0ece6] transition-colors text-base font-bold border-t border-[#e0d8ce]"
                    onClick={handleLinkClick}
                  >
                    {t('navInstrumentsAll')} ({instrumentCounts.bass + instrumentCounts.violone + instrumentCounts.gamba + instrumentCounts.cello})
                  </Link>
                </div>
              )}
            </div>
            <Link
              href={'/rent'}
              className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base lg:text-lg tracking-[0.08em] uppercase font-semibold block py-1"
              onClick={handleLinkClick}
            >
              {t('navRentalInstruments')}
            </Link>
            <Link
              href={'/about-me'}
              className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base lg:text-lg tracking-[0.08em] uppercase font-semibold block py-1"
              onClick={handleLinkClick}
            >
              {t('navAboutMe')}
            </Link>

            <Link
              href={'/contact'}
              className="text-[#1c1208] hover:text-[#e80e19] transition-colors text-base lg:text-lg tracking-[0.08em] uppercase font-semibold block py-1"
              onClick={handleLinkClick}
            >
              {t('navContact')}
            </Link>

            <LangSwitcher />
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

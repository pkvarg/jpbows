'use client'
import React, { useState, useEffect } from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import LangSwitcher from './LangSwitcher'

const Navbar = () => {
  const t = useTranslations('Home')
  const [navbar, setNavbar] = useState(false)
  const [bassDropdown, setBassDropdown] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [instrumentCounts, setInstrumentCounts] = useState({
    bass: 0,
    violone: 0,
    gamba: 0,
    cello: 0,
  })

  const router = useRouter()

  // Scroll detection for transparent → dark transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0b06]/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8">
        <div className="mb-0 lg:mb-0">
          <div className="flex items-center justify-between py-3 md:block md:py-4">
            <div
              onClick={() => router.push('/')}
              className="flex cursor-pointer flex-row items-center gap-4"
            >
              <Image
                src="/b4b_logo9.png"
                alt="bow4bass.com"
                width={900}
                height={900}
                className="w-[40px]"
              />
              <h1
                className="text-3xl lg:text-3xl font-bold lg:font-semibold leading-tight text-[#e80e19] italic"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                bow4bass
              </h1>
            </div>
            <div className="md:hidden">
              <button
                className="rounded-md p-2 outline-none focus:border focus:border-[#c9903a]/30"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-[#f5f0e8]"
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
                    className="h-10 w-10 text-[#f5f0e8]"
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
          </div>
        </div>
        <div>
          <div
            className={`mt-8 flex-1 lg:justify-self-center pb-3 md:mt-0 md:block md:pb-0 ${
              navbar ? 'block h-[80vh] overflow-y-auto bg-[#0f0b06] md:bg-transparent' : 'hidden'
            }`}
          >
            <ul
              className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0 text-xl lg:text-lg font-semibold px-4 md:px-0"
              style={{ fontFamily: 'var(--font-poiret-one)' }}
            >
              <Link
                href={'/bows'}
                className="cursor-pointer text-[#f5f0e8] hover:text-[#e80e19] transition-colors block py-2 tracking-wide"
                onClick={handleLinkClick}
              >
                {t('navBows')}
              </Link>
              <Link
                href={'/repairs'}
                className="cursor-pointer text-[#f5f0e8] hover:text-[#e80e19] transition-colors block py-2 tracking-wide"
                onClick={handleLinkClick}
              >
                {t('navServiceRepairs')}
              </Link>

              {/* Bass instruments dropdown */}
              <div className="relative">
                <button
                  onClick={() => setBassDropdown(!bassDropdown)}
                  className="cursor-pointer text-[#f5f0e8] hover:text-[#e80e19] transition-colors block py-2 w-full text-left tracking-wide"
                >
                  {t('navInstruments')} ▾
                </button>
                {bassDropdown && (
                  <div className="md:absolute relative md:left-0 md:mt-0 md:w-56 bg-[#1c1510] md:border md:border-[#c9903a]/20 z-50">
                    <Link
                      href="/bass?type=bass"
                      className="block px-4 py-2 text-[#f5f0e8] hover:text-[#e80e19] hover:bg-[#c9903a]/5 transition-colors text-lg"
                      onClick={handleLinkClick}
                    >
                      {t('navInstrumentsBass')} ({instrumentCounts.bass})
                    </Link>
                    <Link
                      href="/bass?type=violone"
                      className="block px-4 py-2 text-[#f5f0e8] hover:text-[#e80e19] hover:bg-[#c9903a]/5 transition-colors text-lg"
                      onClick={handleLinkClick}
                    >
                      {t('navInstrumentsViolone')} ({instrumentCounts.violone})
                    </Link>
                    <Link
                      href="/bass?type=gamba"
                      className="block px-4 py-2 text-[#f5f0e8] hover:text-[#e80e19] hover:bg-[#c9903a]/5 transition-colors text-lg"
                      onClick={handleLinkClick}
                    >
                      {t('navInstrumentsGamba')} ({instrumentCounts.gamba})
                    </Link>
                    <Link
                      href="/bass?type=cello"
                      className="block px-4 py-2 text-[#f5f0e8] hover:text-[#e80e19] hover:bg-[#c9903a]/5 transition-colors text-lg"
                      onClick={handleLinkClick}
                    >
                      {t('navInstrumentsCello')} ({instrumentCounts.cello})
                    </Link>
                    <Link
                      href="/bass"
                      className="block px-4 py-2 text-[#f5f0e8] hover:text-[#e80e19] hover:bg-[#c9903a]/5 transition-colors text-lg font-bold border-t border-[#c9903a]/15"
                      onClick={handleLinkClick}
                    >
                      {t('navInstrumentsAll')} ({instrumentCounts.bass + instrumentCounts.violone + instrumentCounts.gamba + instrumentCounts.cello})
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href={'/rent'}
                className="cursor-pointer text-[#f5f0e8] hover:text-[#e80e19] transition-colors block py-2 tracking-wide"
                onClick={handleLinkClick}
              >
                {t('navRentalInstruments')}
              </Link>
              <Link
                href={'/about-me'}
                className="cursor-pointer text-[#f5f0e8] hover:text-[#e80e19] transition-colors block py-2 tracking-wide"
                onClick={handleLinkClick}
              >
                {t('navAboutMe')}
              </Link>

              <Link
                href={'/contact'}
                className="cursor-pointer text-[#f5f0e8] hover:text-[#e80e19] transition-colors block py-2 tracking-wide"
                onClick={handleLinkClick}
              >
                {t('navContact')}
              </Link>

              <LangSwitcher />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

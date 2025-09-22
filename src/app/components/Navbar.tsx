'use client'
import React, { useState } from 'react'
import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LangSwitcher from './LangSwitcher'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false)

  const router = useRouter()

  // Function to close everything when a link is clicked
  const handleLinkClick = () => {
    setNavbar(false)
  }

  return (
    <nav className="w-full bg-[#f1f1ef] font-semibold text-[#e80e19] text-[30px] lg:text-[25px] tracking-wider">
      <div className="mx-auto justify-between px-4 md:flex md:items-center md:px-8">
        <div className="mb-0 lg:mb-2">
          <div className="flex items-center justify-between py-3 md:block md:py-4">
            <div
              onClick={() => router.push('/')}
              className="flex cursor-pointer flex-row items-center gap-4 bg-[#f1f1ef]"
            >
              <Image
                src="/b4b_logo8.png"
                alt="technik"
                width={500}
                height={500}
                className="w-[40px]"
              />
              {/* <h1 className="leading-[22.5px]">bow4bass</h1> */}
              <h1 className="leading-[22.5px] text-[#e80e19]">bow4bass</h1>
            </div>
            <div className="md:hidden">
              <button
                className="rounded-md p-2 outline-none focus:border focus:border-gray-400"
                style={{ color: '#0e1528' }}
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
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
                    className="h-10 w-10"
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
              navbar ? 'block h-[80vh] overflow-y-auto' : 'hidden'
            }`}
          >
            <ul className="flex flex-col space-y-6 md:flex-row md:space-x-6 md:space-y-0">
              <Link
                href={'/'}
                className="cursor-pointer hover:text-[#2f0000] block py-2"
                onClick={handleLinkClick}
              >
                Domov
              </Link>

              <Link
                href={'/bows'}
                className="cursor-pointer hover:text-[#2f0000] block py-2"
                onClick={handleLinkClick}
              >
                Výroba sláčikov
              </Link>

              <Link
                href={'/bass'}
                className="cursor-pointer hover:text-[#2f0000] block py-2"
                onClick={handleLinkClick}
              >
                Kontrabasy
              </Link>

              <Link
                href={'/contact'}
                className="cursor-pointer hover:text-[#2f0000] block py-2"
                onClick={handleLinkClick}
              >
                Kontakt
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

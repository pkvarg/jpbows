'use client'
import React from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

const Hero = () => {
  return (
    <>
      {/* Hero Image Section */}
      <div className="relative min-h-[40vh] lg:min-h-[70vh] overflow-hidden bg-[#fefefe]">
        <Image
          src="/Slacik2.jpg
          "
          alt="Hero background"
          fill
          //className="lg:object-center object-contain"
          className=""
          priority
        />

        {/* Title overlay - Desktop only */}
        {/* <div className="hidden lg:flex absolute top-[50%] inset-0 items-center justify-center">
          <div className="text-center lg:px-6 max-w-4xl mx-auto">
            <div className="rounded-lg px-6 py-4">
           
              <Link
                href={'/bows'}
                className="text-3xl border-1 rounded-2xl lg:text-4xl font-bold font-bolder text-[#e80e19] leading-tight mt-16 p-4 hover:text-white hover:bg-[#e80e19]"
              >
                
                Objavte naše sláčiky
              </Link>
            </div>
          </div>
        </div> */}
      </div>

      {/* Mobile Title - Below image */}
      {/* <div className="lg:hidden bg-[#fefefe] py-8 px-6 flex justify-center items-center">
        <Link
          href={'/bows'}
          className="text-3xl border-1 rounded-2xl lg:text-4xl font-bold font-bolder text-[#e80e19] leading-tight mt-0 p-4 hover:text-white hover:bg-[#e80e19]"
        >
          
          Objavte naše sláčiky
        </Link>
      </div> */}
    </>
  )
}

export default Hero

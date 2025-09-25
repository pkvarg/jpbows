'use client'
import React from 'react'
import Image from 'next/image'

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
        <div className="hidden lg:flex absolute inset-0 items-center justify-center">
          <div className="text-center lg:px-6 max-w-4xl mx-auto">
            <div className="bg-white/30 lg:bg-white/80 rounded-lg px-6 py-4">
              <h1 className="text-3xl lg:text-7xl font-bolder text-[#e80e19] leading-tight">
                bow4bass
              </h1>
              <h2 className="text-3xl lg:text-5xl font-bold font-bolder text-[#2f0000] leading-tight mt-16">
                Exkluzívne kontrabasy a sláčiky inšpirované historickými modelmi z obdobia baroka,
                klasicizmu a raného romantizmu.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Title - Below image */}
      <div className="lg:hidden bg-[#fefefe] py-8 px-6">
        <h2 className="text-2xl font-bold text-[#2f0000] leading-tight text-center">
          Exkluzívne kontrabasy a sláčiky inšpirované historickými modelmi z obdobia baroka,
          klasicizmu a raného romantizmu.
        </h2>
      </div>
    </>
  )
}

export default Hero

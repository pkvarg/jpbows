'use client'
import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className="relative min-h-[40vh] lg:min-h-screen overflow-hidden bg-[#ffffff]">
      <Image
        src="/Slacik2.jpg
        "
        alt="Hero background"
        fill
        //className="lg:object-center object-contain"
        className=""
        priority
      />
      {/* Title overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] drop-shadow-2xl leading-tight">
            Exkluzívne kontrabasy a sláčiky inšpirované historickými modelmi z obdobia baroka,
            klasicizmu a raného romantizmu.
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Hero

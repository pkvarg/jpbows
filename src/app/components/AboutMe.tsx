'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const AboutMe = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const imageAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1, ease: 'easeOut' },
  }

  return (
    <div className="relative min-h-screen bg-[#f1f1ef] overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 lg:py-24">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Section Title */}
          <motion.h2
            variants={fadeInUp}
            className="text-5xl lg:text-7xl font-normal text-center text-[#e80e19] mb-16"
          >
            O mne
          </motion.h2>

          <div className="text-center space-y-12 max-w-5xl mx-auto">
            <motion.h3
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-semibold text-[#2f0000] tracking-wider"
            >
              Ján Prievozník
            </motion.h3>

            {/* Image Section - Centered */}
            <motion.div variants={imageAnimation} className="flex justify-center">
              <div className="relative rounded-3xl p-6 shadow-2xl max-w-md">
                <Image
                  src="/foto1.jpg"
                  alt="Ján Prievozník"
                  width={400}
                  height={400}
                  className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>

            {/* Text Content - Centered */}
            <motion.div
              variants={fadeInUp}
              className="space-y-8 text-[#2f0000] leading-relaxed tracking-widest"
            >
              <p className="text-3xl font-semibold">
                Špecialista na historické kontrabasy a sláčiky
              </p>
              <p className="text-3xl">
                Viac ako 20-rokov skúseností v oblasti starej hudby a autentickej interpretácie.
              </p>

              <p className="text-3xl">
                Absolvent Akadémie umení v Banskej Bystrici, aktívny člen prestížnych súborov ako
                <span className="text-[#e80e19] font-semibold ml-1"> Musica Aeterna</span>,{' '}
                <span className="text-[#e80e19] font-semibold">Wiener Akademie</span> a{' '}
                <span className="text-[#e80e19] font-semibold">Il pomo d&apos;oro</span>.
              </p>

              <p className="text-3xl">
                Účinkoval na významných európskych pódiách vrátane{' '}
                <span className="text-[#e80e19] font-semibold"> Wiener Musikverein</span>,{' '}
                <span className="text-[#e80e19] font-semibold">Opera national de Paris</span> a
                festivaloch ako{' '}
                <span className="text-[#e80e19] font-semibold">Salzburg Festspiele</span> či{' '}
                <span className="text-[#e80e19] font-semibold">Pražské jaro</span>.
              </p>

              <p className="text-3xl">
                Zakladateľ{' '}
                <span className="text-[#e80e19] font-semibold">
                  Slovenského kontrabasového klubu
                </span>{' '}
                <span className="text-2xl">
                  {' '}
                  (2010) a organizátor medzinárodných podujatí BASS FEST+ a Medzinárodnej
                  kontrabasovej súťaže K. D. v. Dittersdorfa.
                </span>
              </p>

              <div className="space-y-4">
                <p className="text-3xl text-[#2f0000]">
                  <span className="font-semibold mb-1 mr-1">Pedagóg</span>
                  <span className="text-2xl">Súkromné konzervatórium Nitra</span>
                </p>

                <p className="text-3xl text-[#2f0000]">
                  <span className="font-semibold mb-1 mr-1">Sólista</span>
                  <span className="text-2xl"> CD Contrabasso/Violone in Presbourg</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutMe

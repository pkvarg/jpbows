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
    <div className="relative min-h-screen  overflow-hidden">
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
            className="text-4xl lg:text-6xl font-bold text-center text-[#fee081] mb-16 font-serif"
          >
            O mne
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Section */}
            <motion.div variants={imageAnimation} className="relative">
              <div className="relative bg-gradient-to-br from-amber-200 to-orange-300 rounded-3xl p-6 shadow-2xl">
                <Image
                  src="/foto2.jpg"
                  alt="Ján Prievozník"
                  width={500}
                  height={500}
                  className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
                />
                {/* Decorative element */}
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.h3 variants={fadeInUp} className="text-3xl font-bold text-white font-serif">
                Ján Prievozník
              </motion.h3>

              <motion.div variants={fadeInUp} className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">Špecialista na historické kontrabasy a sláčiky</p>
                <p>
                  Viac ako 20-rokov skúseností v oblasti starej hudby a autentickej interpretácie.
                </p>

                <p>
                  Absolvent Akadémie umení v Banskej Bystrici, aktívny člen prestížnych súborov ako
                  <span className="text-[#fee081] font-semibold ml-1">Musica Aeterna</span>,{' '}
                  <span className="text-[#fee081] font-semibold">Wiener Akademie</span> a{' '}
                  <span className="text-[#fee081] font-semibold">Il pomo d&apos;oro</span>.
                </p>

                <p>
                  Účinkoval na významných európskych pódiách vrátane{' '}
                  <span className="text-amber-400">Wiener Musikverein</span>,{' '}
                  <span className="text-amber-400">Opera national de Paris</span> a festivaloch ako{' '}
                  <span className="text-amber-400">Salzburg Festspiele</span> či{' '}
                  <span className="text-amber-400">Pražské jaro</span>.
                </p>

                <p>
                  Zakladateľ{' '}
                  <span className="text-[#fee081] font-semibold">
                    Slovenského kontrabasového klubu
                  </span>{' '}
                  (2010) a organizátor medzinárodných podujatí BASS FEST+ a Medzinárodnej
                  kontrabasovej súťaže K. D. v. Dittersdorfa.
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-[#fee081] font-semibold mb-1 mr-1">Pedagóg</span>
                  Súkromné konzervatórium Nitra
                </p>

                <p className="text-sm text-gray-300">
                  <span className="text-[#fee081] font-semibold mb-1 mr-1">Sólista</span>
                  CD Contrabasso/Violone in Presbourg
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={fadeInUp} className="pt-6 flex justify-center items-center">
                <motion.button
                  className="bg-[#fee081] hover:bg-transparent hover:text-[#fee081] border-2 hover:border-[#fee081] text-black px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Viac o mojej práci
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutMe

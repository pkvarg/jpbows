'use client'
import React from 'react'
import { Link } from '@/i18n/routing'
import { motion } from 'framer-motion'

const Intro = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: 'easeOut' },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-[#fefefe] py-20">
      <div className="container mx-auto px-6 mt-16">
        <motion.div
          className="text-center space-y-12"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp} className="space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              Výroba Sláčikov
            </h2>
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              Exkluzívne kontrabasové sláčiky, kópie podľa dochovaných originálov a nákresov obdobia
              baroka, klasicizmu a raného romantizmu.
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              Rekonštrukcie a opravy
            </h2>
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              Rekonštrukcie a opravy sláčikov. Prineste svoj starý, poškodený či znehodnotený sláčik
              a ja mu pri rešpektovaní jeho originálnych „proporcií“ a pôvodného využitia vdýchnem
              nový život.
            </p>

            <h2 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider">
              Kontrabasy
            </h2>
            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              Hľadáte nový nástroj? Prídte si vybrať svoj nový nástroj z dieľne{' '}
              <Link
                href="/bivaj-art"
                className="text-[#e80e19] hover:underline transition-all duration-200"
              >
                &ldquo;Bivaj Art Luthery&rdquo;
              </Link>
              . Ide o majstrovské nástroje z dielne Ferenca Vajaia a Istvana Biróa. Pri rešpektovaní
              tradičných postupov, prvotriedneho materiálu a poctivej práce títo majstri produkujú
              prvotriedne majstrovské kontrabasy rôznych foriem od tradičných Talianskych a
              Francúzskych modelov, cez Viedenské modely nástrojov až po variácie tvarov. Nástroje
              si môžete vybrať podľa vlastných požiadaviek či vkusu, povrchovej úpravy, prísť si ich
              vyskúšať a na základe vašich preferencií bude nástroj nastavený. Na nástroje sa
              vzťahuje doživotná záruka.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default Intro

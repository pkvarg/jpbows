'use client'
import React from 'react'
//import { motion } from 'framer-motion'
import About_Me from '@/app/components/AboutMe'

const AboutMe = () => {
  // const fadeInUp = {
  //   initial: { opacity: 0, y: 60 },
  //   animate: { opacity: 1, y: 0 },
  //   transition: { duration: 0.8, ease: 'easeOut' },
  // }

  // const staggerContainer = {
  //   animate: {
  //     transition: {
  //       staggerChildren: 0.3,
  //     },
  //   },
  // }

  return (
    <div className="relative min-h-screen bg-[#fefefe]">
      {/* <h1 className="text-xl lg:text-5xl font-semibold text-[#e80e19] leading-tight text-center my-16">
        O mne
      </h1> */}
      <div className="container mx-auto px-6">
        {/* <motion.div
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
              Sláčik ako neoddeliteľná súčasť nástroja a hry na „sláčikový hudobný nástroj“ je azda
              najdôležitejším elementom pri tvorbe tónu, umeleckej interpretácii a zdrojom
              neuveriteľných artikulačných možností. Toto azda vystihuje najviac moju životnú
              filozofiu v hre na dobové či moderné nástroje od violone, barokového kontrabasu,
              kontrabasu tzv. viedenskéh ladenia či moderných nástrojov –orchestrálnych a sólových.
              V mojej bohatej orchestrálnej, komornej a sólovej praxi som si čoraz viac uvedomoval
              potrebu a dôležitosť sláčika a to bol aj impulz, prečo som sa začal viac do hľbky
              zaoberať jeho špecifikami a následnou výrobou a servisom sláčikov.
            </p>

            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              Ako hráč na prakticky všetky basové nástroje od baroka až po súčastnosť si uvedomujem
              obrovskú rôznorodosť, farebnú škálu (zvukovú) ako i neuveriteľné možnosti a využitie
              sláčika naprieč hudobnými štýlmi, použitia v orchestrálnej, komornej či sólovej hre a
              pod. V neposlednom rade pohnútkou prečo sa viac do hľbky venovať sláčikom, bola
              potreba spraviť si „servis“ a jeho údržbu, vymeniť vlasy, vyčistiť a vedieť ho správne
              a účelne použiť a udržať sláčik v správnej a zdravej kondícii.
            </p>

            <p className="text-2xl leading-relaxed text-[#2f0000] font-bold">
              Sláčiky z mojej produkcie vyrábam ručne, na základe vlastných interpretačných
              skúseností, špecifík použitia a potrieb hudobného nástroja. Každý sláčik je jedinečný
              originálny výtvor a robený na mieru. Má inú zvukovosť – farbu, dokáže vytiahnuť z
              vášho nástroja to čo hľadáte, alebo vám pomôcť pri správnom tvorení tónu, technike hry
              a dokonalejšej interretácii na vašom obľúbenom nástroji. Sláčik vzniká na základe
              objednávky a špecifických potrieb a prianí zákazníka. Výsledný produkt je konzultovaný
              a skúšaný mnou a samozrejme zákazníkom.
            </p>
          </motion.div>
        </motion.div> */}

        <About_Me />
      </div>
    </div>
  )
}

export default AboutMe

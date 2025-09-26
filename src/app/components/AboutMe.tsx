'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const About_Me = () => {
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
    <div className="relative min-h-screen bg-[#fefefe] overflow-hidden">
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
            className="text-4xl lg:text-5xl font-bold text-center text-[#e80e19] mb-16"
          >
            O mne
          </motion.h2>

          <motion.div variants={fadeInUp} className="space-y-8 max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-semibold text-[#e80e19] tracking-wider text-center">
              Ján Prievozník
            </h3>

            <motion.div variants={fadeInUp} className="text-[#2f0000] leading-relaxed">
              <motion.div
                variants={imageAnimation}
                className="hidden lg:float-left lg:mr-12 lg:mb-8 lg:block"
              >
                <Image
                  src="/foto1.jpg"
                  alt="Ján Prievozník"
                  width={300}
                  height={300}
                  className="w-[300px] h-[350px] object-cover rounded-2xl shadow-lg"
                />
              </motion.div>

              <div className="space-y-6 text-center lg:text-justify">
                <p className="text-2xl leading-relaxed font-bold">
                  Študoval na súkromnom konzervatóriu Dezidera Kardoša v Topoľčanoch, Cirkevnom
                  konzervatóriu v Bratislave a na Akadémii umení v Banskej Bystrici (ped. vedenie
                  Ján Krigovský). Ako kontrabasista pôsobil v orchestroch Štátnej opery v Banskej
                  Bystrici, v orchestri Slovenského národného divadla a v Symfonickom orchestri
                  Slovenského rozhlasu - SOSR.
                </p>

                <motion.div
                  variants={imageAnimation}
                  className="lg:hidden flex justify-center my-8"
                >
                  <Image
                    src="/foto1.jpg"
                    alt="Ján Prievozník"
                    width={300}
                    height={300}
                    className="w-[250px] h-[300px] object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>

                <p className="text-2xl leading-relaxed font-bold">
                  Už počas štúdií na vysokej škole sa venoval interpretácii starej hudby. Začal
                  spolupracovať so súborom{' '}
                  <span className="text-[#e80e19] font-semibold">Musica Aeterna</span> pod vedením
                  Petra Zajíčka, čo odštartovalo jeho aktivity v oblasti starej hudby a autentickej
                  interpretácie, ktorej sa venuje dodnes.
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  Od roku 2006 je členom a pravidelne spolupracuje so súbormi:{' '}
                  <span className="text-[#e80e19] font-semibold">Musica Aeterna</span> /SK,{' '}
                  <span className="text-[#e80e19] font-semibold">Wiener Akademie</span> /AT,{' '}
                  <span className="text-[#e80e19] font-semibold">Hoffkapelle Esterházy</span> /HU,{' '}
                  <span className="text-[#e80e19] font-semibold">Ars Antiqua Austria</span> /AT,{' '}
                  <span className="text-[#e80e19] font-semibold">Czech Ensemble Baroque</span> /CZ,{' '}
                  <span className="text-[#e80e19] font-semibold">Il pomo d&apos;oro</span> /IT a
                  mnohými ďalšími.
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  Predstavil sa na významných pódiách a festivaloch:{' '}
                  <span className="text-[#e80e19] font-semibold">
                    Bratislavské Hudobné Slávnosti
                  </span>
                  , <span className="text-[#e80e19] font-semibold">Pražské Jaro</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Salzburg Festspiele</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Bach Fest Lipsko</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Early music festival Utrecht</span>{' '}
                  a mnohých ďalších.
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  Účinkoval na pódiách:{' '}
                  <span className="text-[#e80e19] font-semibold">Wiener Musikverein</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Koncerthaus Wien</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Opera national de Paris</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Tchaikovski Concert Hall</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Palau de la Música Catalana</span>,
                  ale i na mnohých koncertných pódiách v celej Európe, Japonsku, Amerike, Mexiku,
                  Guatemale, Ekvádore a Chile.
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  Spolupracoval s dirigentskými osobnosťami:{' '}
                  <span className="text-[#e80e19] font-semibold">sir Andrew Parrot</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Jaap ter Linden</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Giovanni Antonini</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Martin Haselböck</span>, ako i
                  sólistami: <span className="text-[#e80e19] font-semibold">Monica Hugget</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">John Holloway</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Enrico Onofri</span>,{' '}
                  <span className="text-[#e80e19] font-semibold">Joyce DiDonato</span> a mnohými
                  ďalšími.
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  Od roku 2000 je lektorom na{' '}
                  <span className="text-[#e80e19] font-semibold">
                    Letnej škole barokní hudby v Holešove
                  </span>{' '}
                  (ČR). Ako pedagóg kontrabasu pôsobil na Cirkevnom konzervatóriu v Bratislave,
                  Hudobnej a umeleckej akadémii Jána Albrechta v Banskej Štiavnici. Od roku 2004
                  pôsobí ako pedagóg kontrabasu na{' '}
                  <span className="text-[#e80e19] font-semibold">
                    Súkromnom konzervatóriu v Nitre
                  </span>
                  .
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  Ako sólista sa predstavil so Štátnym orchestrom Žilina, Musicou Aeternou a
                  Slovenskou filharmóniou. V roku 2022 vydal svoje profilové CD{' '}
                  <span className="text-[#e80e19] font-semibold">
                    „Contrabasso/ Violone in Presbourg"
                  </span>
                  .
                </p>

                <p className="text-2xl leading-relaxed font-bold">
                  V roku 2010 založil spolu so svojim pedagógom a priateľom Jánom Krigovským{' '}
                  <span className="text-[#e80e19] font-semibold">
                    Slovenský kontrabasový klub – Slovak Double Bass Club
                  </span>
                  , ktorý za posledných 14 rokov zorganizoval niekoľko medzinárodných podujatí ako
                  napr.: kontrabasové kurzy a koncerty –{' '}
                  <span className="text-[#e80e19] font-semibold">BASS FEST+</span> (14 ročníkov),
                  hudobný festival{' '}
                  <span className="text-[#e80e19] font-semibold">„Musica Perennis Iuventutis"</span>{' '}
                  (10 ročníkov),{' '}
                  <span className="text-[#e80e19] font-semibold">
                    Medzinárodnú kontrabasovú súťaž K. D. v. Dittersdorfa
                  </span>{' '}
                  (13 ročníkov) a mnoho ďalších podujatí na Slovensku.
                </p>
              </div>

              <div className="clear-left"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About_Me

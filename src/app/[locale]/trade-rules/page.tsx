'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TradeRules = () => {
  const pathname = usePathname()
  const isEnglish = pathname.includes('/en/')

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero */}
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <h2 className="text-[#8b6914] tracking-[0.3em] text-base lg:text-lg uppercase" style={{fontFamily:'var(--font-poiret-one)'}}>
              {isEnglish ? 'TERMS' : 'PODMIENKY'}
            </h2>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>
          <h1 className="text-3xl lg:text-5xl text-[#1c1208] italic leading-tight" style={{fontFamily:'var(--font-cormorant)'}}>
            {isEnglish ? 'Terms and Conditions' : 'Obchodné podmienky'}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
        <div className="bg-[#faf8f5] border border-[#e0d8ce] p-8 lg:p-12 text-[#1c1208]">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
              Tieto obchodné podmienky upravujú vzťahy medzi spoločnosťou Ján Prievozník s.r.o. a zákazníkmi pri nákupe hudobných nástrojov, sláčikov a poskytovaní súvisiacich služieb.
            </p>
          </div>

          {/* Company info */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Údaje o predávajúcom
              </h2>
            </div>
            <div className="bg-[#f0ece6] border-l-4 border-[#e80e19] p-6">
              <p className="text-lg leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Obchodné meno:</strong> Ján Prievozník s.r.o.<br/>
                <strong>Sídlo:</strong> Sadová 1034/19, Vrbové 922 03, Slovensko<br/>
                <strong>IČO:</strong> 53 075 471<br/>
                <strong>Zodpovedná osoba:</strong> Mgr.Art. Ján Prievozník<br/>
                <strong>Email:</strong> info@bow4bass.com<br/>
                <strong>Web:</strong> bow4bass.com
              </p>
            </div>
          </section>

          {/* Orders and delivery */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Objednávky a dodanie
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Objednávky:</strong> Zákazník môže objednať nástroje alebo služby prostredníctvom kontaktného formulára na našej webstránke alebo priamym kontaktom na uvedený email.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Potvrdenie objednávky:</strong> Každá objednávka bude potvrdená emailom s uvedením konkrétnych podmienok, ceny a termínu dodania.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Dodacie lehoty:</strong> Dodacie lehoty sa líšia v závislosti od typu nástroja a požadovaných úprav. Presný termín bude uvedený v potvrdení objednávky.
              </p>
            </div>
          </section>

          {/* Pricing and payment */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Ceny a platby
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Cenník:</strong> Ceny sú individuálne stanovené pre každý nástroj na základe materiálu, práce a špecifikácií zákazníka.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Záloha:</strong> Pri objednávke nástroja na mieru je vyžadovaná záloha vo výške 50% z celkovej ceny.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Doplatenie:</strong> Zvyšná suma je splatná pri prevzatí nástroja alebo pred jeho odoslaním.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Spôsoby platby:</strong> Bankový prevod, hotovosť pri osobnom odbere.
              </p>
            </div>
          </section>

          {/* Warranty */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                {isEnglish ? 'Warranty and Service' : 'Záruka a servis'}
              </h2>
            </div>
            <div className="bg-[#f0ece6] border-l-4 border-[#8b6914] p-6 mb-6">
              <p className="text-lg leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                {isEnglish
                  ? 'All products have a warranty according to the law: 24 months for individuals, 12 months for legal entities. The warranty certificate must be reported within 48 hours of receipt — after this period, complaints are no longer accepted. Complaints are sent to the specified address. The customer must comply with them — failure to comply with them may result in the loss of the warranty. The warranty only for the product is used according to the instructions, the correctly completed certificate is returned and the product has been exposed to fire, bad weather or misused; repairs were made by unauthorized persons. The warranty is not valid if the product is used according to the instructions, it is valid only if the product has been exposed to fire, bad weather or misused; repairs were made by unauthorized technicians. The warranty does not cover problems caused by the product that has been exposed to humidity, extreme temperatures, sun, sweat or corrosion.'
                  : 'Všetky produkty majú záruku podľa zákona: 24 mesiacov pre fyzické osoby, 12 mesiacov pre právnické subjekty. Záručná doba začína bežať po okamihu prevzatia tovaru — po uplynutí tejto doby sa reklamácie tovaru už neprijímajú. Reklamácie sa posielajú na adresu uvedenú nižšie. Zákazník musí zaslať záručný certifikát — nesplnenie tohto požiadavku môže viesť k strate záruky. Záruka sa vzťahuje iba na chyby materiálu alebo výroby. Platí len vtedy, ak bol produkt používaný v súlade s návodom, riadne vyplnený záručný certifikát je zaslaný s produktom a produkt nebol vystavený ohňu, zlému počasiu alebo zneužitiu; opravy boli vykonané neautorizovanými technikmi. Záruka sa nevzťahuje na problémy spôsobené produktom, ktorý bol vystavený vlhkosti, extrémnym teplotám, slnku, potu alebo korózii.'
                }
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>{isEnglish ? 'Service:' : 'Servisné služby:'}</strong> {isEnglish ? 'We offer maintenance, repairs and reconstructions of instruments from other manufacturers.' : 'Ponúkame údržbu, opravy a rekonštrukcie nástrojov aj od iných výrobcov.'}
              </p>
            </div>
          </section>

          {/* Returns and exchanges */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Vrátenie a výmena
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Skúšobná doba:</strong> Zákazník má právo na 14-dňovú skúšobnú dobu pre hotové nástroje.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Nástroje na mieru:</strong> Individuálne vyrobené nástroje podľa špecifikácií zákazníka nie je možné vrátiť, pokiaľ nevykazujú výrobné defekty.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Stav nástroja:</strong> Vrátený nástroj musí byť v pôvodnom stave bez poškodení.
              </p>
            </div>
          </section>

          {/* Shipping */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Dodanie a preprava
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Osobný odber:</strong> Možný v našej dielni po predchádzajúcej dohode.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Zasielanie:</strong> Nástroje zasielame špeciálne zabaleným kuriérom s poistením.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Náklady na dopravu:</strong> Hradí zákazník, výška závisí od veľkosti a hmotnosti nástroja.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Poistenie:</strong> Všetky zasielané nástroje sú poistené na plnú hodnotu.
              </p>
            </div>
          </section>

          {/* Instruments testing */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Vyskúšanie nástrojov
              </h2>
            </div>
            <div className="bg-[#f0ece6] border-l-4 border-[#8b6914] p-6">
              <p className="text-lg leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                Zákazníci si môžu nástroje prísť vyskúšať do našej dielne. Vyskúšanie je možné po predchádzajúcej dohode.
                Nástroj bude nastavený podľa preferencií zákazníka pred finálnym prevzatím.
              </p>
            </div>
          </section>

          {/* Complaints */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Reklamácie
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Podanie reklamácie:</strong> Reklamáciu je možné podať emailom alebo osobne v našej dielni.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Lehota na vybavenie:</strong> Reklamácie vybavujeme do 30 dní od podania.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Spôsob vybavenia:</strong> Oprava, výmena alebo vrátenie peňazí podľa charakteru problému.
              </p>
            </div>
          </section>

          {/* Final provisions */}
          <section className="mb-12">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <h2 className="text-xl lg:text-2xl text-[#1c1208] italic" style={{fontFamily:'var(--font-cormorant)'}}>
                Záverečné ustanovenia
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Platnosť:</strong> Tieto obchodné podmienky sú platné od 1.1.2024.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Zmeny:</strong> Predávajúci si vyhradzuje právo na zmenu obchodných podmienok. Zákazníci budú o zmenách informovaní emailom.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Riešenie sporov:</strong> Všetky spory budú riešené v súlade so zákonmi Slovenskej republiky.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                <strong>Kontakt pre otázky:</strong> V prípade otázok nás kontaktujte na info@bow4bass.com
              </p>
            </div>
          </section>

          {/* Back to contact */}
          <div className="text-center pt-8 border-t border-[#e0d8ce]">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#e80e19] text-white py-3 px-8 tracking-[0.15em] uppercase font-bold hover:bg-[#1c1208] transition-colors"
              style={{fontFamily:'var(--font-poiret-one)'}}
            >
              Kontaktovať nás
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeRules

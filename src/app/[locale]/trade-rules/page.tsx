'use client'
import React from 'react'
import Link from 'next/link'

const TradeRules = () => {

  return (
    <div className="min-h-screen bg-[#fefefe]">
      {/* Header */}
      <div className="bg-white border-b border-[#2f0000]/10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] tracking-wide">
              Obchodné podmienky
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 lg:p-12 text-[#2f0000]">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg lg:text-xl leading-relaxed">
              Tieto obchodné podmienky upravujú vzťahy medzi spoločnosťou Ján Prievozník s.r.o. a zákazníkmi pri nákupe hudobných nástrojov, sláčikov a poskytovaní súvisiacich služieb.
            </p>
          </div>

          {/* Company info */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Údaje o predávajúcom
            </h2>
            <div className="bg-[#e80e19]/5 border-l-4 border-[#e80e19] rounded-md p-6">
              <p className="text-lg leading-relaxed">
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
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Objednávky a dodanie
            </h2>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Objednávky:</strong> Zákazník môže objednať nástroje alebo služby prostredníctvom kontaktného formulára na našej webstránke alebo priamym kontaktom na uvedený email.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Potvrdenie objednávky:</strong> Každá objednávka bude potvrdená emailom s uvedením konkrétnych podmienok, ceny a termínu dodania.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Dodacie lehoty:</strong> Dodacie lehoty sa líšia v závislosti od typu nástroja a požadovaných úprav. Presný termín bude uvedený v potvrdení objednávky.
              </p>
            </div>
          </section>

          {/* Pricing and payment */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Ceny a platby
            </h2>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Cenník:</strong> Ceny sú individuálne stanovené pre každý nástroj na základe materiálu, práce a špecifikácií zákazníka.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Záloha:</strong> Pri objednávke nástroja na mieru je vyžadovaná záloha vo výške 50% z celkovej ceny.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Doplatenie:</strong> Zvyšná suma je splatná pri prevzatí nástroja alebo pred jeho odoslaním.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Spôsoby platby:</strong> Bankový prevod, hotovosť pri osobnom odbere.
              </p>
            </div>
          </section>

          {/* Warranty */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Záruka a servis
            </h2>
            <div className="bg-green-50 border-l-4 border-green-500 rounded-md p-6 mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-[#2f0000] mb-4">
                Doživotná záruka
              </h3>
              <p className="text-lg leading-relaxed">
                Na všetky nástroje z dielne Bivaj Art Luthery poskytujeme doživotnú záruku na materiál a remeselné spracovanie.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Záruka zahŕňa:</strong> Bezplatné opravy defektov materiálu a výrobných chýb.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Záruka nezahŕňa:</strong> Poškodenia spôsobené nesprávnym používaním, pádom, vlhkosťou alebo bežným opotrebovaním.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Servisné služby:</strong> Ponúkame údržbu, opravy a rekonštrukcie nástrojov aj od iných výrobcov.
              </p>
            </div>
          </section>

          {/* Returns and exchanges */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Vrátenie a výmena
            </h2>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Skúšobná doba:</strong> Zákazník má právo na 14-dňovú skúšobnú dobu pre hotové nástroje.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Nástroje na mieru:</strong> Individuálne vyrobené nástroje podľa špecifikácií zákazníka nie je možné vrátiť, pokiaľ nevykazujú výrobné defekty.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Stav nástroja:</strong> Vrátený nástroj musí byť v pôvodnom stave bez poškodení.
              </p>
            </div>
          </section>

          {/* Shipping */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Dodanie a preprava
            </h2>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Osobný odber:</strong> Možný v našej dielni po predchádzajúcej dohode.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Zasielanie:</strong> Nástroje zasielame špeciálne zabaleným kuriérom s poistením.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Náklady na dopravu:</strong> Hradí zákazník, výška závisí od veľkosti a hmotnosti nástroja.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Poistenie:</strong> Všetky zasielané nástroje sú poistené na plnú hodnotu.
              </p>
            </div>
          </section>

          {/* Instruments testing */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Vyskúšanie nástrojov
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-md p-6">
              <p className="text-lg leading-relaxed">
                Zákazníci si môžu nástroje prísť vyskúšať do našej dielne. Vyskúšanie je možné po predchádzajúcej dohode. 
                Nástroj bude nastavený podľa preferencií zákazníka pred finálnym prevzatím.
              </p>
            </div>
          </section>

          {/* Complaints */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Reklamácie
            </h2>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Podanie reklamácie:</strong> Reklamáciu je možné podať emailom alebo osobne v našej dielni.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Lehota na vybavenie:</strong> Reklamácie vybavujeme do 30 dní od podania.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Spôsob vybavenia:</strong> Oprava, výmena alebo vrátenie peňazí podľa charakteru problému.
              </p>
            </div>
          </section>

          {/* Final provisions */}
          <section className="mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[#e80e19] mb-6">
              Záverečné ustanovenia
            </h2>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Platnosť:</strong> Tieto obchodné podmienky sú platné od 1.1.2024.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Zmeny:</strong> Predávajúci si vyhradzuje právo na zmenu obchodných podmienok. Zákazníci budú o zmenách informovaní emailom.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Riešenie sporov:</strong> Všetky spory budú riešené v súlade so zákonmi Slovenskej republiky.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed">
                <strong>Kontakt pre otázky:</strong> V prípade otázok nás kontaktujte na info@bow4bass.com
              </p>
            </div>
          </section>

          {/* Back to contact */}
          <div className="text-center pt-8 border-t border-[#2f0000]/10">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-[#e80e19] hover:bg-white hover:text-[#e80e19] text-white py-3 px-8 rounded-lg text-lg transition-colors font-bold border-1"
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

'use client'

import Image from 'next/image'
import { useState } from 'react'

const demoData = {
  title: 'Prírodné krásy Slovenska',
  subtitle: 'Objavujte najkrajšie zákutia našej domoviny',
  description:
    'Slovensko je krajina plná prírodných krás, od majestátnych hôr až po pokojné údolia a jazerá. V tomto článku vám ukážeme niekoľko miest, ktoré určite stoja za návštevu.',
  blogtext:
    'Vysoké Tatry sú bezpochyby dominantou slovenskej prírody. Tieto majestátne vrcholy ponúkajú úžasné turistické trasy a dychberúce výhľady. Či už ste skúsený horolezec alebo len príležitostný turista, v Tatrách si nájde každý to svoje.\n\nSlovenský raj je ďalším skvostom našej prírody. Sústava kaňonov, vodopádov a roklín vytvára jedinečný zážitok pre všetkých návštevníkov. Rebríky, mostíky a iné technické pomôcky umožňujú prechod aj cez tie najnáročnejšie úseky.\n\nPieniny a splavovanie Dunajca na tradičných pltiach je zážitkom, ktorý by si nemal nechať ujsť žiadny milovník prírody. Pokojná plavba medzi vápencovými skalami vám poskytne úplne iný pohľad na krásy slovenskej prírody.\n\nNa južnom Slovensku nájdete úchvatné jaskyne, ako napríklad Domica alebo Gombasecká jaskyňa. Tieto podzemné priestory vytvorené počas tisícročí ponúkajú fascinujúci pohľad do histórie našej planéty.',
  imageUrl: 'https://picsum.photos/seed/slovakia/800/500',
  active: true,
}

type BlogTemplate = 'classic' | 'modern' | 'minimal'

export default function BlogTemplatesDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState<BlogTemplate>('classic')

  // Classic template
  const ClassicTemplate = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Image */}
      <div className="w-full h-64 relative">
        <Image
          src={demoData.imageUrl}
          alt={demoData.title}
          width={800}
          height={400}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="text-sm text-gray-500 mb-3">
          Publikované: {new Date().toLocaleDateString('sk-SK')}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{demoData.title}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{demoData.subtitle}</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-700 italic">{demoData.description}</p>
        </div>

        <div className="prose max-w-none text-gray-800">
          {demoData.blogtext.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )

  // Modern template
  const ModernTemplate = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-t-lg">
        <div className="text-purple-100 mb-3">{new Date().toLocaleDateString('sk-SK')}</div>
        <h1 className="text-4xl font-bold text-white mb-2">{demoData.title}</h1>
        <h2 className="text-xl text-purple-100">{demoData.subtitle}</h2>
      </div>

      {/* Image and content in grid layout */}
      <div className="bg-white p-8 rounded-b-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-80 w-full rounded-lg overflow-hidden">
          <Image
            src={demoData.imageUrl}
            alt={demoData.title}
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <div className="bg-purple-50 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <p className="text-purple-800">{demoData.description}</p>
          </div>

          <div className="prose text-gray-700">
            {demoData.blogtext.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Minimal template
  const MinimalTemplate = () => (
    <div className="max-w-2xl mx-auto bg-gray-50 p-8">
      <div className="text-gray-400 text-sm mb-4">{new Date().toLocaleDateString('sk-SK')}</div>

      <h1 className="text-3xl font-light text-gray-800 mb-2 border-b pb-2">{demoData.title}</h1>
      <h2 className="text-lg text-gray-600 mb-8 italic">{demoData.subtitle}</h2>

      <div className="my-6 relative h-60 w-full">
        <Image
          src={demoData.imageUrl}
          alt={demoData.title}
          width={700}
          height={350}
          className="object-contain max-h-60"
        />
      </div>

      <div className="text-lg text-gray-700 mb-8">{demoData.description}</div>

      <div className="prose prose-sm max-w-none text-gray-800">
        {demoData.blogtext.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold text-center mb-8">Blog Templates Demo</h1>

      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTemplate === 'classic' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedTemplate('classic')}
        >
          Klasická šablóna
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTemplate === 'modern' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedTemplate('modern')}
        >
          Moderná šablóna
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedTemplate === 'minimal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
          }`}
          onClick={() => setSelectedTemplate('minimal')}
        >
          Minimalistická šablóna
        </button>
      </div>

      <div className="mb-8">
        {selectedTemplate === 'classic' && <ClassicTemplate />}
        {selectedTemplate === 'modern' && <ModernTemplate />}
        {selectedTemplate === 'minimal' && <MinimalTemplate />}
      </div>

      <h2 className="text-xl font-bold text-center mt-16 mb-8">Všetky šablóny vedľa seba</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-center font-bold mb-4">Klasická šablóna</h3>
          <div className="transform scale-50 origin-top">
            <ClassicTemplate />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-center font-bold mb-4">Moderná šablóna</h3>
          <div className="transform scale-50 origin-top">
            <ModernTemplate />
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="text-center font-bold mb-4">Minimalistická šablóna</h3>
          <div className="transform scale-50 origin-top">
            <MinimalTemplate />
          </div>
        </div>
      </div>
    </div>
  )
}

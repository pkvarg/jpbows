import { Link } from '@/i18n/routing'
import React from 'react'
import SliderManager from '@/app/components/SliderCreator'

const AdminSlider = () => {
  return (
    <main className="mx-8">
      <Link href={'/admin'} className="text-white text-[30px] text-center cursor-pointer">
        Naspäť
      </Link>
      <SliderManager />
    </main>
  )
}

export default AdminSlider

import { Link } from '@/i18n/routing'
import React from 'react'
import BassManager from '@/app/components/BassManager'

const AdminProduct = () => {
  return (
    <main className="mx-8">
      <Link href={'/admin'} className="text-white text-[30px] text-center cursor-pointer">
        Naspäť
      </Link>
      <BassManager />
    </main>
  )
}

export default AdminProduct

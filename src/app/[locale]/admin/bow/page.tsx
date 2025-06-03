import { Link } from '@/i18n/routing'
import React from 'react'
import BowManager from '@/app/components/BowManager'

const AdminProduct = () => {
  return (
    <main className="px-8 pt-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Link href={'/admin'} className="text-white text-[20px] text-center cursor-pointer">
        Naspäť
      </Link>
      <div className="pb-12">
        <BowManager />
      </div>
    </main>
  )
}

export default AdminProduct

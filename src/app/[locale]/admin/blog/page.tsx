import { Link } from '@/i18n/routing'
import React from 'react'
import BlogCreator from '@/app/components/BlogCreator'

const AdminBlog = () => {
  return (
    <main className="px-8 pt-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Link href={'/admin'} className="text-white text-[30px] text-center cursor-pointer">
        Naspäť
      </Link>
      <BlogCreator />
    </main>
  )
}

export default AdminBlog

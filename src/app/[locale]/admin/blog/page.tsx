import { Link } from '@/i18n/routing'
import React from 'react'
import BlogCreator from '@/app/components/BlogCreator'

const AdminBlog = () => {
  return (
    <main className="mx-8">
      <Link href={'/admin'} className="text-white text-[30px] text-center cursor-pointer">
        Naspäť
      </Link>
      <BlogCreator />
    </main>
  )
}

export default AdminBlog

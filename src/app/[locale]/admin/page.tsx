import React from 'react'
import AuthButton from '@/auth/AuthButton.server'
import { auth } from '@/auth'
//import SimpleTest from '@/app/components/SimpleTest'
import VisitorCounter from '@/app/components/Visitor'

//import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'
import { Link } from '@/i18n/routing'

const Admin = async () => {
  const session = await auth()
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto py-8 space-y-8">
        <AuthButton key={session?.user ? 'signed-in' : 'signed-out'} />
        <h1 className="text-center text-[32px]">Ahoj admin</h1>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-72 py-16">
          <div className="flex flex-col gap-4 text-[#fee081] text-xl font-bold">
            {/* <Link href={`/admin/file-upload`}>File Upload</Link> */}
            <Link href={`/admin/bass`}>Basses</Link>
            <Link href={`/admin/bow`}>Bows</Link>
            <Link href={`/admin/slider`}>Sliders</Link>
            <Link href={`/admin/blog`}>Blogs</Link>
          </div>

          <div className="flex flex-col gap-4">
            <VisitorCounter />
            {/* <SimpleTest /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

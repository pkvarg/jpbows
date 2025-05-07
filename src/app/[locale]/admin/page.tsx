import React from 'react'
import AuthButton from '@/auth/AuthButton.server'
import { auth } from '@/auth'
import SimpleTest from '@/app/components/SimpleTest'
import VisitorCounter from '@/app/components/Visitor'
import ProductCreator from '@/app/components/Product'
import PagesNavbarServer from '@/app/components/translationServerComponents/PagesNavbarServer'
import { Link } from '@/i18n/routing'

const Admin = async () => {
  const session = await auth()
  return (
    <main className="footer-gradient text-white px-6">
      <PagesNavbarServer />
      <div className="container py-8 space-y-8">
        <h1>Admin</h1>

        <Link href={`/admin/file-upload`}>File Upload</Link>
        <ProductCreator />

        <VisitorCounter />
        <SimpleTest />
        <AuthButton key={session?.user ? 'signed-in' : 'signed-out'} />
      </div>
    </main>
  )
}

export default Admin

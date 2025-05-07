'use client'
import { useSession } from 'next-auth/react'
import { Button } from '@/app/components/ui/button'
import { signIn, signOut } from '@/auth/helpers'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
  const session = useSession()
  const router = useRouter()

  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut() // Redirect to /sk after sign-out
        router.push('/')
      }}
    >
      {session.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  )
}

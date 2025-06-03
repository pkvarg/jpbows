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
      className="cursor-pointer text-2xl"
    >
      {session.data?.user?.name} : Odhlásiť sa
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Prihlásiť sa</Button>
  )
}

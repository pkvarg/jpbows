'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/sk/admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl,
      redirect: false,
    })

    if (res?.error) {
      setError('Nesprávny email alebo heslo.')
      setLoading(false)
    } else if (res?.url) {
      window.location.href = res.url
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#0f0d0a' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #faf8f5 0px,
            #faf8f5 1px,
            transparent 1px,
            transparent 12px
          )`,
        }}
      />

      <div className="relative w-full max-w-md px-6">

        {/* Logo */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl font-light italic mb-2"
            style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}
          >
            bow<span style={{ color: '#e80e19', fontStyle: 'normal', fontWeight: 700 }}>4</span>bass
          </h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-8" style={{ background: '#2a2018' }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914' }}
            >
              Admin Panel
            </span>
            <div className="h-px w-8" style={{ background: '#2a2018' }} />
          </div>
        </div>

        {/* Card */}
        <div
          className="p-10"
          style={{
            background: '#1a1510',
            border: '1px solid #2a2018',
          }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-0.5" style={{ background: '#e80e19' }} />
            <span
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914' }}
            >
              Prihlásenie
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84' }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 text-base outline-none transition-all duration-200"
                style={{
                  background: '#0f0d0a',
                  border: '1px solid #2a2018',
                  color: '#faf8f5',
                  fontFamily: 'var(--font-cormorant)',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#e80e19')}
                onBlur={(e) => (e.target.style.borderColor = '#2a2018')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84' }}
              >
                Heslo
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 text-base outline-none transition-all duration-200"
                style={{
                  background: '#0f0d0a',
                  border: '1px solid #2a2018',
                  color: '#faf8f5',
                  fontFamily: 'var(--font-cormorant)',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#e80e19')}
                onBlur={(e) => (e.target.style.borderColor = '#2a2018')}
              />
            </div>

            {error && (
              <p
                className="text-sm"
                style={{ color: '#e80e19', fontFamily: 'var(--font-cormorant)' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 mt-2"
              style={{
                fontFamily: 'var(--font-poiret-one)',
                background: loading ? '#2a2018' : '#e80e19',
                color: '#faf8f5',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Prihlasovanie...' : 'Prihlásiť sa'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs tracking-widest uppercase mt-8"
          style={{ fontFamily: 'var(--font-poiret-one)', color: '#3d3228' }}
        >
          bow4bass.com
        </p>
      </div>
    </div>
  )
}

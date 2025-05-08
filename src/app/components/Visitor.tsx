'use client'

import { useEffect, useState } from 'react'
import formatDate from '@/lib/formatDate'

export default function VisitorCounter() {
  const [lastUpdate, setLastUpdate] = useState('')
  const [count, setCount] = useState<number>(0)
  // eslint-disable-next-line
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // uncomment at setup only
  // const createVisitor = async () => {
  //   try {
  //     setLoading(true)
  //     setError(null)

  //     const response = await fetch('/api/visitors', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ count: 0 }),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Failed to create visitor')
  //     }

  //     const data = await response.json()

  //     setCount(data.count)
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'An unknown error occurred')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const getVisitor = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/visitors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to get visitor')
      }

      const data = await response.json()
      setCount(data.count)
      const date = formatDate(data.updatedAt)
      setLastUpdate(date)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getVisitor()
  }, [])

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto">
      <div className="mb-4">
        <p className="text-2xl font-bold mt-2">Visitors Count: {count}</p>
        <p className="text-2xl font-bold mt-2">Last visit: {lastUpdate}</p>
      </div>

      {/* <div className="flex flex-col gap-2">
        <button
          onClick={createVisitor}
          disabled={loading}
          className="bg-green-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Visitor'}
        </button>
      </div> */}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  )
}

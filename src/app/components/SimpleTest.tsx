'use client'
import { useState } from 'react'

export default function SimpleTest() {
  const [result, setResult] = useState<object | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const testVisitorCreation = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/test-visitor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test: true }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to test connection')
      }

      console.log('type of data', typeof data)
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Prisma MongoDB Test</h2>

      <button
        onClick={testVisitorCreation}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Connection'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-bold">Success:</p>
          <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

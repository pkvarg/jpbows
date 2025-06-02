'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useParams, useRouter } from 'next/navigation'

type BlogTemplate = 'classic' | 'modern' | 'minimal'

interface Blog {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  description: string
  blogtext: string
  active: boolean
  template: BlogTemplate
  createdAt: Date
  updatedAt: Date
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!params.id) return

      try {
        setLoading(true)
        const response = await fetch(`/api/blogs/${params.id}`)

        if (!response.ok) {
          throw new Error('Failed to fetch blog')
        }

        const data = await response.json()

        // If blog is not active, redirect to blog list
        if (!data.active) {
          router.push('/blog')
          return
        }

        setBlog(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [params.id, router])

  // Format date
  const formatDate = (dateString: string | Date) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg border border-red-200">
        <h1 className="text-xl font-semibold text-red-700 mb-2">Error</h1>
        <p className="text-red-600">{error || 'Blog not found'}</p>
        <Link href="/blog" className="inline-block mt-4 text-blue-600 hover:underline">
          Späť na blogy
        </Link>
      </div>
    )
  }

  // Classic template
  const ClassicTemplate = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Image */}
      {blog.imageUrl && (
        <div className="w-full h-64 relative">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={800}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        <div className="text-sm text-gray-500 mb-3">Publikované: {formatDate(blog.createdAt)}</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{blog.title}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{blog.subtitle}</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-700 italic">{blog.description}</p>
        </div>

        <div className="prose max-w-none text-gray-800">
          {blog.blogtext.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )

  // Modern template
  const ModernTemplate = () => (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-t-lg">
        <div className="text-purple-100 mb-3">{formatDate(blog.createdAt)}</div>
        <h1 className="text-4xl font-bold text-white mb-2">{blog.title}</h1>
        <h2 className="text-xl text-purple-100">{blog.subtitle}</h2>
      </div>

      {/* Image and content in grid layout */}
      <div className="bg-white p-8 rounded-b-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {blog.imageUrl && (
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={500}
              height={500}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        )}

        <div>
          <div className="bg-purple-50 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <p className="text-purple-800">{blog.description}</p>
          </div>

          <div className="prose text-gray-700">
            {blog.blogtext.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Minimal template
  const MinimalTemplate = () => (
    <div className="max-w-2xl mx-auto bg-gray-50 p-8">
      <div className="text-gray-400 text-sm mb-4">{formatDate(blog.createdAt)}</div>

      <h1 className="text-3xl font-light text-gray-800 mb-2 border-b pb-2">{blog.title}</h1>
      <h2 className="text-lg text-gray-600 mb-8 italic">{blog.subtitle}</h2>

      {blog.imageUrl && (
        <div className="my-6 relative h-60 w-full">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={700}
            height={350}
            className="object-contain max-h-60"
            priority
          />
        </div>
      )}

      <div className="text-lg text-gray-700 mb-8">{blog.description}</div>

      <div className="prose prose-sm max-w-none text-gray-800">
        {blog.blogtext.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-4">
          <Link href="/blog" className="text-white hover:underline flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Späť na blogy
          </Link>
        </div>

        {blog.template === 'classic' && <ClassicTemplate />}
        {blog.template === 'modern' && <ModernTemplate />}
        {blog.template === 'minimal' && <MinimalTemplate />}
      </div>
    </div>
  )
}

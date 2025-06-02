'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/blogs')

        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }

        const data = await response.json()

        // Filter to include only active blogs
        const activeBlogs = data.filter((blog: Blog) => blog.active)
        setBlogs(activeBlogs)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Function to truncate text for preview
  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || ''
    return text.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 rounded-lg border border-red-200">
        <h1 className="text-xl font-semibold text-red-700 mb-2">Error</h1>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200 text-center">
        <h1 className="text-xl font-semibold text-gray-700 mb-2">Žiadne blogy</h1>
        <p className="text-gray-600">Momentálne nie sú k dispozícii žiadne publikované blogy.</p>
      </div>
    )
  }

  // Different card designs based on template
  const ClassicBlogCard = ({ blog }: { blog: Blog }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      {blog.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            width={500}
            height={300}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">{formatDate(blog.createdAt)}</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
        <p className="text-gray-600 mb-4">{truncateText(blog.description, 120)}</p>
        <Link
          href={`/blog/${blog.id}`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          Čítať viac
        </Link>
      </div>
    </div>
  )

  const ModernBlogCard = ({ blog }: { blog: Blog }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
        <div className="text-sm opacity-80 mb-1">{formatDate(blog.createdAt)}</div>
        <h2 className="text-xl font-bold">{blog.title}</h2>
      </div>
      <div className="p-5">
        <div className="flex gap-4">
          {blog.imageUrl && (
            <div className="relative h-24 w-24 flex-shrink-0 rounded overflow-hidden">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <p className="text-gray-600 mb-3">{truncateText(blog.description, 100)}</p>
            <Link
              href={`/blog/${blog.id}`}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-full text-sm transition-colors duration-300"
            >
              Čítať článok →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const MinimalBlogCard = ({ blog }: { blog: Blog }) => (
    <div className="bg-gray-50 p-6 border-l-4 border-gray-300 hover:border-gray-800 transition-all duration-300">
      <div className="text-sm text-gray-400 mb-2">{formatDate(blog.createdAt)}</div>
      <h2 className="text-xl font-light text-gray-800 mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4 text-sm">{truncateText(blog.description, 140)}</p>
      <Link
        href={`/blog/${blog.id}`}
        className="text-gray-800 hover:text-gray-600 font-medium transition-colors duration-300"
      >
        Čítať článok →
      </Link>
    </div>
  )

  const getBlogCard = (blog: Blog) => {
    switch (blog.template) {
      case 'classic':
        return <ClassicBlogCard blog={blog} />
      case 'modern':
        return <ModernBlogCard blog={blog} />
      case 'minimal':
        return <MinimalBlogCard blog={blog} />
      default:
        return <ClassicBlogCard blog={blog} />
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="container mx-auto py-10 px-4 ">
        <h1 className="text-3xl font-bold text-center mb-2">Blog</h1>
        <p className="text-gray-600 text-center mb-10">Najnovšie príspevky a zaujímavosti</p>

        {/* Featured blog - most recent one */}
        {blogs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Najnovší príspevok</h2>
            <div className="max-w-4xl mx-auto">{getBlogCard(blogs[0])}</div>
          </div>
        )}

        {/* All other blogs */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Všetky príspevky</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id}>{getBlogCard(blog)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

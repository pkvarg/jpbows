'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type BlogTemplate = 'classic' | 'modern' | 'minimal'

interface Blog {
  id: string
  imageUrl: string
  title: string
  enTitle: string
  subtitle: string
  enSubtitle: string
  description: string
  enDescription: string
  blogtext: string
  enBlogtext: string
  active: boolean
  template: BlogTemplate
  createdAt: Date
  updatedAt: Date
}

interface BlogDisplayProps {
  blogId: string
}

export default function BlogDisplay({ blogId }: BlogDisplayProps) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  // Determine if we're on the English version based on URL
  const isEnglish = pathname.includes('/en/')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/blogs/${blogId}`)

        if (!response.ok) {
          throw new Error('Failed to fetch blog')
        }

        const data = await response.json()
        setBlog(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

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
        <h1 className="text-xl font-semibold text-red-700 mb-2">{isEnglish ? 'Error' : 'Chyba'}</h1>
        <p className="text-red-600">
          {error || (isEnglish ? 'Blog not found' : 'Blog nebol nájdený')}
        </p>
      </div>
    )
  }

  // Get the appropriate content based on language
  const getContent = () => {
    if (isEnglish) {
      return {
        title: blog.enTitle || blog.title,
        subtitle: blog.enSubtitle || blog.subtitle,
        description: blog.enDescription || blog.description,
        blogtext: blog.enBlogtext || blog.blogtext,
      }
    }
    return {
      title: blog.title,
      subtitle: blog.subtitle,
      description: blog.description,
      blogtext: blog.blogtext,
    }
  }

  const content = getContent()

  // Format date
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    if (isEnglish) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
    return date.toLocaleDateString('sk-SK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Classic template
  const ClassicTemplate = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Image */}
      {blog.imageUrl && (
        <div className="w-full h-64 relative">
          <Image
            src={blog.imageUrl}
            alt={content.title}
            width={800}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-8">
        <div className="text-sm text-gray-500 mb-3">
          {isEnglish ? 'Published:' : 'Publikované:'} {formatDate(blog.createdAt)}
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{content.subtitle}</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-700 italic">{content.description}</p>
        </div>

        <div className="prose max-w-none text-gray-800">
          {content.blogtext.split('\n').map((paragraph, idx) => (
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
        <div className="text-purple-100 mb-3">
          {isEnglish ? 'Published:' : 'Publikované:'} {formatDate(blog.createdAt)}
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
        <h2 className="text-xl text-purple-100">{content.subtitle}</h2>
      </div>

      {/* Image and content in grid layout */}
      <div className="bg-white p-8 rounded-b-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {blog.imageUrl && (
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={content.title}
              width={500}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div>
          <div className="bg-purple-50 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <p className="text-purple-800">{content.description}</p>
          </div>

          <div className="prose text-gray-700">
            {content.blogtext.split('\n').map((paragraph, idx) => (
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
      <div className="text-gray-400 text-sm mb-4">
        {isEnglish ? 'Published:' : 'Publikované:'} {formatDate(blog.createdAt)}
      </div>

      <h1 className="text-3xl font-light text-gray-800 mb-2 border-b pb-2">{content.title}</h1>
      <h2 className="text-lg text-gray-600 mb-8 italic">{content.subtitle}</h2>

      {blog.imageUrl && (
        <div className="my-6 relative h-60 w-full">
          <Image
            src={blog.imageUrl}
            alt={content.title}
            width={700}
            height={350}
            className="object-contain max-h-60"
          />
        </div>
      )}

      <div className="text-lg text-gray-700 mb-8">{content.description}</div>

      <div className="prose prose-sm max-w-none text-gray-800">
        {content.blogtext.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )

  // Render the blog in the appropriate template
  return (
    <div className="py-8 px-4">
      {blog.template === 'classic' && <ClassicTemplate />}
      {blog.template === 'modern' && <ModernTemplate />}
      {blog.template === 'minimal' && <MinimalTemplate />}
    </div>
  )
}

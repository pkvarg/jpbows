'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const pathname = usePathname()

  // Determine if we're on the English version based on URL
  const isEnglish = pathname.includes('/en/')

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/blogs')

        if (!response.ok) {
          throw new Error('Failed to fetch blogs')
        }

        const data = await response.json()

        // Filter to include only active blogs (order is preserved from API)
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

  // Get appropriate content based on language
  const getBlogContent = (blog: Blog) => {
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

  // Function to truncate text for preview
  const truncateText = (text: string, maxLength: number) => {
    if (!text || text.length <= maxLength) return text || ''
    return text.substring(0, maxLength) + '...'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fefefe] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e80e19]"></div>
          <p className="text-[#2f0000] mt-4 text-base lg:text-lg font-medium">
            {isEnglish ? 'Loading blogs...' : 'Načítavam blogy...'}
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fefefe] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#e80e19] text-lg lg:text-xl font-medium mb-4">{error}</p>
        </div>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen bg-[#fefefe]">
        <div className="relative py-12 px-4 text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] mb-3 tracking-wide">
              {isEnglish ? 'Blog' : 'Blog'}
            </h1>
            <p className="text-lg lg:text-2xl font-bold text-[#2f0000] leading-relaxed">
              {isEnglish
                ? 'There are currently no published blogs available.'
                : 'Momentálne nie sú k dispozícii žiadne publikované blogy.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Different card designs based on template
  const ClassicBlogCard = ({ blog }: { blog: Blog }) => {
    const content = getBlogContent(blog)
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 flex flex-col h-full">
        {blog.imageUrl && (
          <div className="relative h-48 w-full flex-shrink-0">
            <Image
              src={blog.imageUrl}
              alt={content.title}
              width={500}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <div className="text-sm text-gray-500 mb-2">{formatDate(blog.createdAt)}</div>
          <h2 className="text-xl font-semibold text-[#e80e19] mb-2">{content.title}</h2>
          <p className="text-[#2f0000] mb-4 leading-relaxed text-xl flex-grow">
            {truncateText(content.description, 120)}
          </p>
          <Link
            href={`/blog/${blog.id}`}
            className="inline-block bg-[#e80e19] hover:bg-[#2f0000] text-white py-2 px-4 rounded transition-colors duration-300 font-bold mt-auto self-start"
          >
            {isEnglish ? 'Read More' : 'Čítať viac'}
          </Link>
        </div>
      </div>
    )
  }

  const ModernBlogCard = ({ blog }: { blog: Blog }) => {
    const content = getBlogContent(blog)
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-all duration-300 border border-gray-100 flex flex-col h-full">
        <div className="bg-gradient-to-r from-[#e80e19] to-[#2f0000] p-4 text-white flex-shrink-0">
          <div className="text-sm opacity-80 mb-1">{formatDate(blog.createdAt)}</div>
          <h2 className="text-xl font-bold">{content.title}</h2>
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex gap-4 flex-grow">
            {blog.imageUrl && (
              <div className="relative h-24 w-24 flex-shrink-0 rounded overflow-hidden">
                <Image
                  src={blog.imageUrl}
                  alt={content.title}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex flex-col flex-grow">
              <p className="text-[#2f0000] mb-3 leading-relaxed flex-grow">
                {truncateText(content.description, 100)}
              </p>
              <Link
                href={`/blog/${blog.id}`}
                className="inline-block bg-[#e80e19] hover:bg-[#2f0000] text-white py-1 px-4 rounded-full text-sm transition-colors duration-300 self-start"
              >
                {isEnglish ? 'Read Article →' : 'Čítať článok →'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const MinimalBlogCard = ({ blog }: { blog: Blog }) => {
    const content = getBlogContent(blog)
    return (
      <div className="bg-white p-6 border-l-4 border-gray-300 hover:border-[#e80e19] transition-all duration-300 shadow-sm flex flex-col h-full">
        <div className="text-sm text-gray-400 mb-2">{formatDate(blog.createdAt)}</div>
        <h2 className="text-xl font-semibold text-[#e80e19] mb-2">{content.title}</h2>
        <p className="text-[#2f0000] mb-4 text-sm leading-relaxed flex-grow">
          {truncateText(content.description, 140)}
        </p>
        <Link
          href={`/blog/${blog.id}`}
          className="text-[#e80e19] hover:text-[#2f0000] font-medium transition-colors duration-300 mt-auto self-start"
        >
          {isEnglish ? 'Read Article →' : 'Čítať článok →'}
        </Link>
      </div>
    )
  }

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
    <div className="min-h-screen bg-[#fefefe]">
      {/* Header Section */}
      <div className="relative py-12 px-4 text-center">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] mb-3 tracking-wide">
            {isEnglish ? 'Blog' : 'Blog'}
          </h1>
          <p className="text-lg lg:text-2xl font-bold text-[#2f0000] leading-relaxed">
            {isEnglish
              ? 'Latest posts and interesting content'
              : 'Najnovšie príspevky a zaujímavosti'}
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-6xl mx-auto pb-12 px-4">
        {/* Featured blog - most recent one */}
        {blogs.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#e80e19]">
              {isEnglish ? 'Latest Post' : 'Najnovší príspevok'}
            </h2>
            <div className="max-w-4xl mx-auto">{getBlogCard(blogs[0])}</div>
          </div>
        )}

        {/* All other blogs */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-[#e80e19]">
            {isEnglish ? 'All Posts' : 'Všetky príspevky'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex">
                {getBlogCard(blog)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

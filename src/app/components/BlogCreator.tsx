'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

// Blog template options
type BlogTemplate = 'classic' | 'modern' | 'minimal'

interface BlogFormData {
  title: string
  enTitle: string
  subtitle: string
  enSubtitle: string
  description: string
  enDescription: string
  blogtext: string
  enBlogtext: string
  imageUrl: string
  active: boolean
  template: BlogTemplate
  metadata: string
}

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
  metadata: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export default function BlogCreator() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    enTitle: '',
    subtitle: '',
    enSubtitle: '',
    description: '',
    enDescription: '',
    blogtext: '',
    enBlogtext: '',
    imageUrl: '',
    active: true,
    template: 'classic',
    metadata: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<boolean>(false)
  const [previewLanguage, setPreviewLanguage] = useState<'sk' | 'en'>('sk')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({
      title: '',
      enTitle: '',
      subtitle: '',
      enSubtitle: '',
      description: '',
      enDescription: '',
      blogtext: '',
      enBlogtext: '',
      imageUrl: '',
      active: true,
      template: 'classic',
      metadata: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setPreviewTemplate(false)
    setPreviewLanguage('sk')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    setImageFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      let finalImageUrl = formData.imageUrl

      // If there's a file to upload, upload it first
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`

        const response = await fetch(apiUrl, {
          method: 'POST',
          body: uploadFormData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()
        finalImageUrl = data.imageUrl
      }

      const blogData = {
        title: formData.title,
        enTitle: formData.enTitle,
        subtitle: formData.subtitle,
        enSubtitle: formData.enSubtitle,
        description: formData.description,
        enDescription: formData.enDescription,
        blogtext: formData.blogtext,
        enBlogtext: formData.enBlogtext,
        imageUrl: finalImageUrl,
        active: formData.active,
        template: formData.template,
        metadata: formData.metadata,
      }

      // Determine if we're creating or updating
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} blog`)
      }

      const resultBlog = await response.json()

      if (editingId) {
        // Update blogs list with edited blog
        setBlogs(blogs.map((b) => (b.id === editingId ? resultBlog : b)))
        setSuccessMessage('Blog updated successfully!')
      } else {
        // Add new blog to list
        setBlogs([...blogs, resultBlog])
        setSuccessMessage('Blog created successfully!')
      }

      // Reset the form
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/blogs')

      if (!response.ok) {
        throw new Error('Failed to fetch blogs')
      }

      const data = await response.json()
      setBlogs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      enTitle: blog.enTitle || '',
      subtitle: blog.subtitle,
      enSubtitle: blog.enSubtitle || '',
      description: blog.description,
      enDescription: blog.enDescription || '',
      blogtext: blog.blogtext,
      enBlogtext: blog.enBlogtext || '',
      imageUrl: blog.imageUrl,
      active: blog.active,
      template: blog.template,
      metadata: blog.metadata || '',
    })
    setEditingId(blog.id)
    setImagePreview(blog.imageUrl)
    setPreviewTemplate(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete blog')
      }

      // Remove from blogs list
      setBlogs(blogs.filter((b) => b.id !== id))
      setSuccessMessage('Blog deleted successfully!')

      // Reset form if we were editing the deleted blog
      if (editingId === id) {
        resetForm()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    resetForm()
  }

  const togglePreview = () => {
    setPreviewTemplate(!previewTemplate)
  }

  // Drag and drop handlers for reordering
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return

    const newBlogs = [...blogs]
    const draggedBlog = newBlogs[draggedIndex]
    newBlogs.splice(draggedIndex, 1)
    newBlogs.splice(index, 0, draggedBlog)

    setBlogs(newBlogs)
    setDraggedIndex(index)
  }

  const handleDragEnd = async () => {
    if (draggedIndex === null) return

    // Update order in database
    const blogsWithNewOrder = blogs.map((blog, index) => ({
      id: blog.id,
      order: index,
    }))

    try {
      const response = await fetch('/api/blogs/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blogs: blogsWithNewOrder }),
      })

      if (!response.ok) {
        throw new Error('Failed to update blog order')
      }

      // Update local state with new order values
      setBlogs(blogs.map((blog, index) => ({ ...blog, order: index })))
    } catch (error) {
      console.error('Error updating blog order:', error)
      setError('Failed to update blog order')
    }

    setDraggedIndex(null)
  }

  // Function to truncate text for preview
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Get content based on preview language
  const getPreviewContent = () => {
    if (previewLanguage === 'en') {
      return {
        title: formData.enTitle || formData.title,
        subtitle: formData.enSubtitle || formData.subtitle,
        description: formData.enDescription || formData.description,
        blogtext: formData.enBlogtext || formData.blogtext,
      }
    }
    return {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      blogtext: formData.blogtext,
    }
  }

  // Classic template
  const ClassicTemplate = () => {
    const content = getPreviewContent()
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Image */}
        {imagePreview && (
          <div className="w-full h-64 relative">
            <Image
              src={imagePreview}
              alt={content.title}
              layout="fill"
              objectFit="cover"
              width={800}
              height={400}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h1>
          <h2 className="text-xl text-gray-600 mb-6">{content.subtitle}</h2>

          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-xl">
            <p className="text-black italic font-bold">{content.description}</p>
          </div>

          <div className="prose max-w-none text-gray-800 text-xl">
            {content.blogtext.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Modern template
  const ModernTemplate = () => {
    const content = getPreviewContent()
    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-t-lg">
          <h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1>
          <h2 className="text-xl text-purple-100">{content.subtitle}</h2>
        </div>

        {/* Image and content in grid layout */}
        <div className="bg-white p-8 rounded-b-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {imagePreview && (
            <div className="relative h-80 w-full rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt={content.title}
                width={500}
                height={500}
                style={{ objectFit: 'cover' }}
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
  }

  // Minimal template
  const MinimalTemplate = () => {
    const content = getPreviewContent()
    return (
      <div className="max-w-2xl mx-auto bg-gray-50 p-8">
        <h1 className="text-3xl font-light text-gray-800 mb-2 border-b pb-2">{content.title}</h1>
        <h2 className="text-lg text-gray-600 mb-8 italic">{content.subtitle}</h2>

        {imagePreview && (
          <div className="my-6 relative h-60 w-full">
            <Image
              src={imagePreview}
              alt={content.title}
              width={700}
              height={350}
              style={{ objectFit: 'contain' }}
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
  }

  // Render the selected template preview
  const renderTemplatePreview = () => {
    switch (formData.template) {
      case 'classic':
        return <ClassicTemplate />
      case 'modern':
        return <ModernTemplate />
      case 'minimal':
        return <MinimalTemplate />
      default:
        return <ClassicTemplate />
    }
  }

  return (
    <div className="px-6 py-6 border rounded-lg shadow-md max-w-2xl mx-auto text-black">
      <h2 className="text-xl text-white font-bold mb-4">
        {editingId ? 'Upraviť blog' : 'Vytvoriť blog'}
      </h2>

      {!previewTemplate ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400">
              Titulok (SK)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="enTitle" className="block text-sm font-medium text-gray-400">
              Titulok (EN)
            </label>
            <input
              type="text"
              id="enTitle"
              name="enTitle"
              value={formData.enTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-400">
              Podtitulok (SK)
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="enSubtitle" className="block text-sm font-medium text-gray-400">
              Podtitulok (EN)
            </label>
            <input
              type="text"
              id="enSubtitle"
              name="enSubtitle"
              value={formData.enSubtitle}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-400">
              Krátky popis (SK)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="enDescription" className="block text-sm font-medium text-gray-400">
              Krátky popis (EN)
            </label>
            <textarea
              id="enDescription"
              name="enDescription"
              value={formData.enDescription}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="blogtext" className="block text-sm font-medium text-gray-400">
              Obsah blogu (SK)
            </label>
            <textarea
              id="blogtext"
              name="blogtext"
              value={formData.blogtext}
              onChange={handleInputChange}
              required
              rows={8}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="enBlogtext" className="block text-sm font-medium text-gray-400">
              Obsah blogu (EN)
            </label>
            <textarea
              id="enBlogtext"
              name="enBlogtext"
              value={formData.enBlogtext}
              onChange={handleInputChange}
              rows={8}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-400">
              Šablóna
            </label>
            <select
              id="template"
              name="template"
              value={formData.template}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            >
              <option value="classic">Klasická</option>
              <option value="modern">Moderná</option>
              <option value="minimal">Minimalistická</option>
            </select>
          </div>

          <div>
            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-400">
              Obrázok
            </label>
            <input
              type="file"
              id="imageUpload"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <div className="relative h-40 w-full border">
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    width={200}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor="active" className="ml-2 block text-sm text-gray-400">
              Publikovaný
            </label>
          </div>

          <div>
            <label htmlFor="metadata" className="block text-sm font-medium text-gray-400">
              Metadata
            </label>
            <textarea
              id="metadata"
              name="metadata"
              value={formData.metadata}
              onChange={handleInputChange}
              rows={2}
              placeholder="JSON metadata alebo doplňujúce informácie"
              className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
            />
            <p className="text-xs text-gray-500 mt-1">Doplňujúce údaje vo formáte JSON</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={togglePreview}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
            >
              Zobraziť náhľad
            </button>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Ukladám...' : editingId ? 'Upraviť blog' : 'Vytvoriť blog'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Zrušiť
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Náhľad šablóny:{' '}
              {formData.template === 'classic'
                ? 'Klasická'
                : formData.template === 'modern'
                ? 'Moderná'
                : 'Minimalistická'}
            </h3>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setPreviewLanguage('sk')}
                className={`px-4 py-2 rounded ${
                  previewLanguage === 'sk'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                SK
              </button>
              <button
                onClick={() => setPreviewLanguage('en')}
                className={`px-4 py-2 rounded ${
                  previewLanguage === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={togglePreview}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Späť k formuláru
            </button>
          </div>
          <div className="border rounded-lg p-2 bg-white overflow-auto max-h-[70vh]">
            {renderTemplatePreview()}
          </div>
        </div>
      )}

      {successMessage && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={fetchBlogs}
          disabled={loading}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Načítavam...' : 'Všetky blogy'}
        </button>

        {blogs.length > 0 && (
          <div className="mt-4 space-y-6">
            <h3 className="text-xl font-bold text-yellow-500 border-b border-yellow-500 pb-2">
              Všetky blogy ({blogs.length})
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              ℹ️ Pretiahnite blogy na zmenu poradia zobrazenia
            </p>

            {/* Display blogs in current order */}
            {blogs.map((blog, index) => (
              <div
                key={blog.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`p-4 border-2 rounded-lg transition-all duration-200 cursor-move ${
                  blog.active ? 'border-green-500 bg-green-50/5' : 'border-red-400 bg-red-50/5'
                } ${draggedIndex === index ? 'opacity-50' : ''}`}
              >
                {/* Header with title and status badges */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    {/* Order indicator */}
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-black font-bold rounded-full flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">{blog.title}</h4>
                      {blog.enTitle && (
                        <h5 className="text-md text-gray-300 italic">{blog.enTitle}</h5>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    {/* Published Status - Most Prominent */}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        blog.active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {blog.active ? '✓ PUBLIKOVANÝ' : '✗ NEPUBLIKOVANÝ'}
                    </span>

                    {/* Additional badges */}
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs">
                        {blog.template === 'classic'
                          ? 'KLASICKÁ'
                          : blog.template === 'modern'
                          ? 'MODERNÁ'
                          : 'MINIMALISTICKÁ'}
                      </span>
                      <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs">
                        {new Date(blog.createdAt).toLocaleDateString('sk-SK')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtitles */}
                <div className="mb-3">
                  <p className="text-lg text-gray-300 font-medium">{blog.subtitle}</p>
                  {blog.enSubtitle && (
                    <p className="text-md text-gray-400 italic">{blog.enSubtitle}</p>
                  )}
                </div>

                {/* Descriptions */}
                <div className="mb-3">
                  <p className="text-white mb-2">{truncateText(blog.description, 120)}</p>
                  {blog.enDescription && (
                    <p className="text-gray-300 italic text-sm">
                      {truncateText(blog.enDescription, 120)}
                    </p>
                  )}
                </div>

                {/* Image */}
                {blog.imageUrl && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Obrázok:</p>
                    <div className="relative h-32 w-48 border-2 border-gray-600 rounded">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        width={192}
                        height={128}
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Blog content preview */}
                <div className="mb-4 border-t border-gray-600 pt-3">
                  <p className="text-sm text-gray-400 mb-2">Obsah:</p>
                  <div className="bg-gray-800/50 p-3 rounded">
                    <p className="text-sm text-gray-300">{truncateText(blog.blogtext, 180)}</p>
                    {blog.enBlogtext && (
                      <p className="text-xs text-gray-500 italic mt-2">
                        {truncateText(blog.enBlogtext, 180)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2 border-t border-gray-600">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded font-medium transition-colors"
                  >
                    ✏️ Upraviť
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded font-medium transition-colors"
                  >
                    🗑️ Vymazať
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

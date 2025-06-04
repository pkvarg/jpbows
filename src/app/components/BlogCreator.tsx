'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

// Blog template options
type BlogTemplate = 'classic' | 'modern' | 'minimal'

interface BlogFormData {
  title: string
  subtitle: string
  description: string
  blogtext: string
  imageUrl: string
  active: boolean
  template: BlogTemplate
  metadata: string
}

interface Blog {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  description: string
  blogtext: string
  active: boolean
  template: BlogTemplate
  metadata: string
  createdAt: Date
  updatedAt: Date
}

export default function BlogCreator() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    subtitle: '',
    description: '',
    blogtext: '',
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
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      blogtext: '',
      imageUrl: '',
      active: true,
      template: 'classic',
      metadata: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
    setPreviewTemplate(false)
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

        const apiUrl = 'https://hono-api.pictusweb.com/api/upload/jpbows'
        // const apiUrl = 'http://localhost:3013/api/upload/jpbows'

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
        subtitle: formData.subtitle,
        description: formData.description,
        blogtext: formData.blogtext,
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
      subtitle: blog.subtitle,
      description: blog.description,
      blogtext: blog.blogtext,
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

  // Function to truncate text for preview
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  // Classic template
  const ClassicTemplate = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header Image */}
      {imagePreview && (
        <div className="w-full h-64 relative">
          <Image
            src={imagePreview}
            alt={formData.title}
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.title}</h1>
        <h2 className="text-xl text-gray-600 mb-6">{formData.subtitle}</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-700 italic">{formData.description}</p>
        </div>

        <div className="prose max-w-none text-gray-800">
          {formData.blogtext.split('\n').map((paragraph, idx) => (
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
        <h1 className="text-4xl font-bold text-white mb-2">{formData.title}</h1>
        <h2 className="text-xl text-purple-100">{formData.subtitle}</h2>
      </div>

      {/* Image and content in grid layout */}
      <div className="bg-white p-8 rounded-b-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {imagePreview && (
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            <Image
              src={imagePreview}
              alt={formData.title}
              width={500}
              height={500}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <div>
          <div className="bg-purple-50 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <p className="text-purple-800">{formData.description}</p>
          </div>

          <div className="prose text-gray-700">
            {formData.blogtext.split('\n').map((paragraph, idx) => (
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
      <h1 className="text-3xl font-light text-gray-800 mb-2 border-b pb-2">{formData.title}</h1>
      <h2 className="text-lg text-gray-600 mb-8 italic">{formData.subtitle}</h2>

      {imagePreview && (
        <div className="my-6 relative h-60 w-full">
          <Image
            src={imagePreview}
            alt={formData.title}
            width={700}
            height={350}
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <div className="text-lg text-gray-700 mb-8">{formData.description}</div>

      <div className="prose prose-sm max-w-none text-gray-800">
        {formData.blogtext.split('\n').map((paragraph, idx) => (
          <p key={idx} className="mb-4 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )

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
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto text-black">
      <h2 className="text-xl text-white font-bold mb-4">
        {editingId ? 'Upraviť blog' : 'Vytvoriť blog'}
      </h2>

      {!previewTemplate ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400">
              Titulok
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
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-400">
              Podtitulok
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-400">
              Krátky popis
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
            <label htmlFor="blogtext" className="block text-sm font-medium text-gray-400">
              Obsah blogu
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
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium text-yellow-500">Blogy ({blogs.length})</h3>
            {blogs.map((blog) => (
              <div key={blog.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <h4 className="font-bold text-white">{blog.title}</h4>
                  <div className="flex gap-1">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        blog.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {blog.active ? 'Publikovaný' : 'Nepublikovaný'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                      {blog.template === 'classic'
                        ? 'Klasická'
                        : blog.template === 'modern'
                        ? 'Moderná'
                        : 'Minimalistická'}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-1">{blog.subtitle}</p>
                <p className="text-md text-white mt-1">{truncateText(blog.description, 100)}</p>

                {blog.imageUrl && (
                  <div className="mt-2 relative h-40 w-full">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      width={200}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                <p className="text-sm text-gray-400 mt-2 border-t pt-2">
                  {truncateText(blog.blogtext, 150)}
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 bg-yellow-900 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Upraviť
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Vymazať
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

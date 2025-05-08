'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

interface SliderFormData {
  title: string
  subtitle: string
  description: string
  imageUrl: string
  active: boolean
}

interface Slider {
  id: string
  imageUrl: string
  title: string
  subtitle: string
  description: string
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export default function SliderManager() {
  const [formData, setFormData] = useState<SliderFormData>({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    active: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [sliders, setSliders] = useState<Slider[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      imageUrl: '',
      active: true,
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingId(null)
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
        const formData = new FormData()
        formData.append('file', imageFile)

        const apiUrl = 'http://localhost:3013/api/upload/jpbows'

        const response = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          throw new Error('Failed to upload image')
        }

        const data = await response.json()
        finalImageUrl = data.imageUrl
      }

      const sliderData = {
        ...formData,
        imageUrl: finalImageUrl, // Use the uploaded image URL or existing one
      }

      // Determine if we're creating or updating
      const url = editingId ? `/api/sliders/${editingId}` : '/api/sliders'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sliderData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} slider`)
      }

      const resultSlider = await response.json()

      if (editingId) {
        // Update sliders list with edited slider
        setSliders(sliders.map((s) => (s.id === editingId ? resultSlider : s)))
        setSuccessMessage('Slider updated successfully!')
      } else {
        // Add new slider to list
        setSliders([...sliders, resultSlider])
        setSuccessMessage('Slider created successfully!')
      }

      // Reset the form
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchSliders = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/sliders')

      if (!response.ok) {
        throw new Error('Failed to fetch sliders')
      }

      const data = await response.json()
      setSliders(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (slider: Slider) => {
    setFormData({
      title: slider.title,
      subtitle: slider.subtitle,
      description: slider.description,
      imageUrl: slider.imageUrl,
      active: slider.active,
    })
    setEditingId(slider.id)
    setImagePreview(slider.imageUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slider?')) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/sliders/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete slider')
      }

      // Remove from sliders list
      setSliders(sliders.filter((s) => s.id !== id))
      setSuccessMessage('Slider deleted successfully!')

      // Reset form if we were editing the deleted slider
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

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto text-black">
      <h2 className="text-xl text-white font-bold mb-4">
        {editingId ? 'Upraviť slider' : 'Vytvoriť slider'}
      </h2>

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
            Popis
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
                  width={100}
                  height={100}
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
            Aktívny
          </label>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Ukladám...' : editingId ? 'Upraviť slider' : 'Vytvoriť slider'}
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
          onClick={fetchSliders}
          disabled={loading}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Načítavam...' : 'Všetky slidery'}
        </button>

        {sliders.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium text-yellow-500">Slidery ({sliders.length})</h3>
            {sliders.map((slider) => (
              <div key={slider.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <h4 className="font-bold text-white">{slider.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      slider.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {slider.active ? 'Aktívny' : 'Neaktívny'}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{slider.subtitle}</p>
                <p className="text-md text-white mt-1">{slider.description}</p>

                {slider.imageUrl && (
                  <div className="mt-2 relative h-40 w-full">
                    <Image
                      src={slider.imageUrl}
                      alt={slider.title}
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(slider)}
                    className="flex-1 bg-yellow-900 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Upraviť
                  </button>
                  <button
                    onClick={() => handleDelete(slider.id)}
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

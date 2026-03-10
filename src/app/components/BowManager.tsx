'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

interface BowFormData {
  name: string
  enName: string
  description: string
  enDescription: string
  images: string[]
  price: string
  priceEnglish: string
  published: boolean
  new: boolean
  metadata: string
  videoUrl: string
  availability: 'available' | 'sold'
}

interface Bow {
  id: string
  images: string[]
  name: string
  enName: string
  description: string
  enDescription: string
  price: string
  priceEnglish: string
  published: boolean
  new: boolean
  metadata: string
  videoUrl: string
  availability: 'available' | 'sold'
  order: number
  createdAt: Date
  updatedAt: Date
}

export default function BowManager() {
  const [formData, setFormData] = useState<BowFormData>({
    name: '',
    enName: '',
    description: '',
    enDescription: '',
    images: [],
    price: '',
    priceEnglish: '',
    published: false,
    new: false,
    metadata: '',
    videoUrl: '',
    availability: 'available',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [bows, setBows] = useState<Bow[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({
      name: '',
      enName: '',
      description: '',
      enDescription: '',
      images: [],
      price: '',
      priceEnglish: '',
      published: false,
      new: false,
      metadata: '',
      videoUrl: '',
      availability: 'available',
    })
    setImageFiles([])
    setImagePreviews([])
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    // Validate file types
    const invalidFiles = files.filter((file) => !file.type.startsWith('image/'))
    if (invalidFiles.length > 0) {
      setError('Please upload only image files')
      return
    }

    // Create previews for new files
    const newPreviews: string[] = []
    const fileReaders: Promise<void>[] = []

    files.forEach((file, index) => {
      const reader = new FileReader()
      const promise = new Promise<void>((resolve) => {
        reader.onloadend = () => {
          newPreviews[index] = reader.result as string
          resolve()
        }
      })
      fileReaders.push(promise)
      reader.readAsDataURL(file)
    })

    Promise.all(fileReaders).then(() => {
      setImageFiles((prevFiles) => [...prevFiles, ...files])
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews])
    })
  }

  const removeImage = (index: number) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index))

    // If editing and removing an existing image
    if (editingId && index < formData.images.length) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }))
    }
  }

  const moveImageUp = (index: number) => {
    if (index === 0) return // Can't move first image up

    // Swap with previous image in previews
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews]
      ;[newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]]
      return newPreviews
    })

    // Swap in image files if they exist
    setImageFiles((prevFiles) => {
      const newFiles = [...prevFiles]
      if (newFiles[index] && newFiles[index - 1]) {
        ;[newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]]
      }
      return newFiles
    })

    // Swap in formData.images if editing existing images
    if (editingId) {
      setFormData((prev) => {
        const newImages = [...prev.images]
        if (newImages[index] && newImages[index - 1]) {
          ;[newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]
        }
        return { ...prev, images: newImages }
      })
    }
  }

  const moveImageDown = (index: number) => {
    if (index === imagePreviews.length - 1) return // Can't move last image down

    // Swap with next image in previews
    setImagePreviews((prevPreviews) => {
      const newPreviews = [...prevPreviews]
      ;[newPreviews[index], newPreviews[index + 1]] = [newPreviews[index + 1], newPreviews[index]]
      return newPreviews
    })

    // Swap in image files if they exist
    setImageFiles((prevFiles) => {
      const newFiles = [...prevFiles]
      if (newFiles[index] && newFiles[index + 1]) {
        ;[newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]]
      }
      return newFiles
    })

    // Swap in formData.images if editing existing images
    if (editingId) {
      setFormData((prev) => {
        const newImages = [...prev.images]
        if (newImages[index] && newImages[index + 1]) {
          ;[newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
        }
        return { ...prev, images: newImages }
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      let uploadedImageUrls: string[] = [...formData.images]

      // Upload new image files
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file) => {
          const formData = new FormData()
          formData.append('file', file)

          const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`

          const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            throw new Error('Failed to upload image')
          }

          const data = await response.json()
          return data.imageUrl
        })

        const newImageUrls = await Promise.all(uploadPromises)
        uploadedImageUrls = [...uploadedImageUrls, ...newImageUrls]
      }

      // Get the highest order number and add 1 for new items
      const maxOrder = editingId ? undefined : Math.max(0, ...bows.map((b) => b.order)) + 1

      const bowData = {
        name: formData.name,
        enName: formData.enName,
        description: formData.description,
        enDescription: formData.enDescription,
        images: uploadedImageUrls,
        price: formData.price,
        priceEnglish: formData.priceEnglish,
        published: formData.published,
        new: formData.new,
        metadata: formData.metadata,
        videoUrl: formData.videoUrl,
        availability: formData.availability,
        ...(maxOrder !== undefined && { order: maxOrder }),
      }

      // Determine if we're creating or updating
      const url = editingId ? `/api/bows/${editingId}` : '/api/bows'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bowData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} bow`)
      }

      const resultBow = await response.json()

      if (editingId) {
        // Update bows list with edited bow
        setBows(bows.map((b) => (b.id === editingId ? resultBow : b)))
        setSuccessMessage('Product updated successfully!')
      } else {
        // Add new product to list
        setBows([...bows, resultBow])
        setSuccessMessage('Bow created successfully!')
      }

      // Reset the form
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchBows = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/bows')

      if (!response.ok) {
        throw new Error('Failed to fetch bows')
      }

      const data = await response.json()
      setBows(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (bow: Bow) => {
    setFormData({
      name: bow.name,
      enName: bow.enName || '',
      description: bow.description,
      enDescription: bow.enDescription || '',
      images: bow.images || [],
      price: bow.price || '',
      priceEnglish: bow.priceEnglish || '',
      published: bow.published || false,
      new: bow.new || false,
      metadata: bow.metadata || '',
      videoUrl: bow.videoUrl || '',
      availability: bow.availability || 'available',
    })
    setEditingId(bow.id)
    setImagePreviews(bow.images || [])
    setImageFiles([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bow?')) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/bows/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete bow')
      }

      // Remove from products list
      setBows(bows.filter((b) => b.id !== id))
      setSuccessMessage('Bow deleted successfully!')

      // Reset form if we were editing the deleted product
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

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      return
    }

    // Create new array with updated order
    const updatedBows = [...bows]
    const [draggedItem] = updatedBows.splice(draggedIndex, 1)
    updatedBows.splice(dropIndex, 0, draggedItem)

    // Update order values for all items
    const bowsWithNewOrder = updatedBows.map((bow, index) => ({
      ...bow,
      order: index + 1,
    }))

    // Optimistically update UI
    setBows(bowsWithNewOrder)
    setDraggedIndex(null)

    // Send update to server
    try {
      const response = await fetch('/api/bows/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bows: bowsWithNewOrder.map((b) => ({ id: b.id, order: b.order })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update order')
      }

      setSuccessMessage('Order updated successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch {
      setError('Failed to update order. Please refresh the page.')
      // Revert on error
      fetchBows()
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="p-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
      <h2 className="text-2xl italic mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}>
        {editingId ? 'Upravit slacik' : 'Vytvorit slacik'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Nazov (SK)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
        </div>

        <div>
          <label htmlFor="enName" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Nazov (EN)
          </label>
          <input
            type="text"
            id="enName"
            name="enName"
            value={formData.enName}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Popis (SK)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={3}
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
        </div>

        <div>
          <label htmlFor="enDescription" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Popis (EN)
          </label>
          <textarea
            id="enDescription"
            name="enDescription"
            value={formData.enDescription}
            onChange={handleInputChange}
            rows={3}
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
        </div>

        <div>
          <label htmlFor="price" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Cena (SK)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="napr. 1500"
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
        </div>

        <div>
          <label htmlFor="priceEnglish" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Cena (EN)
          </label>
          <input
            type="text"
            id="priceEnglish"
            name="priceEnglish"
            value={formData.priceEnglish}
            onChange={handleInputChange}
            placeholder="napr. 1500"
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            placeholder="napr. https://www.youtube.com/watch?v=..."
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Volitelne - odkaz na video</p>
        </div>

        <div>
          <label htmlFor="imageUpload" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Obrazky
          </label>
          <input
            type="file"
            id="imageUpload"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="block w-full px-4 py-3 outline-none transition-colors text-[#faf8f5]"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018' }}
          />
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Mozete vybrat viacero obrazkov naraz</p>

          {imagePreviews.length > 0 && (
            <div className="mt-3">
              <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>
                Nahlad ({imagePreviews.length} obrazkov):
              </p>
              <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto p-2" style={{ border: '1px solid #2a2018' }}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-24 w-24" style={{ border: '1px solid #2a2018' }}>
                      <Image
                        src={preview}
                        alt={`Image preview ${index + 1}`}
                        width={96}
                        height={96}
                        style={{ objectFit: 'cover' }}
                      />
                      {/* Image position indicator */}
                      <div className="absolute bottom-0 left-0 text-xs px-1" style={{ background: 'rgba(15, 13, 10, 0.8)', color: '#9b8f84' }}>
                        #{index + 1}
                      </div>
                    </div>
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: '#e80e19', color: '#faf8f5' }}
                      title="Odstranit"
                    >
                      x
                    </button>
                    {/* Move up button */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImageUp(index)}
                        className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: '#8b6914', color: '#faf8f5' }}
                        title="Posunut hore"
                      >
                        &uarr;
                      </button>
                    )}
                    {/* Move down button */}
                    {index < imagePreviews.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImageDown(index)}
                        className="absolute bottom-0 left-0 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: '#8b6914', color: '#faf8f5' }}
                        title="Posunut dole"
                      >
                        &darr;
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="published" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Publikovany
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-[#2a2018] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e80e19]"></div>
              <span className="ml-3 text-sm font-medium" style={{ color: '#c4b49a' }}>
                {formData.published ? 'Ano' : 'Nie'}
              </span>
            </label>
            <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Zobrazi sa na webstranke</p>
          </div>
        </div>

        <div>
          <label htmlFor="new" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Novy produkt
          </label>
          <div className="mt-1">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="new"
                name="new"
                checked={formData.new}
                onChange={(e) => setFormData((prev) => ({ ...prev, new: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-[#2a2018] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e80e19]"></div>
              <span className="ml-3 text-sm font-medium" style={{ color: '#c4b49a' }}>
                {formData.new ? 'Ano' : 'Nie'}
              </span>
            </label>
            <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Oznaci produkt ako novy</p>
          </div>
        </div>

        <div>
          <label htmlFor="availability" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Dostupnost
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          >
            <option value="available">Dostupny</option>
            <option value="sold">Predany - na objednavku</option>
          </select>
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Stav dostupnosti slacika</p>
        </div>

        <div>
          <label htmlFor="metadata" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
            Metadata
          </label>
          <textarea
            id="metadata"
            name="metadata"
            value={formData.metadata}
            onChange={handleInputChange}
            rows={2}
            placeholder="JSON metadata alebo doplnujuce informacie"
            className="block w-full px-4 py-3 outline-none transition-colors"
            style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}
            onFocus={(e) => e.target.style.borderColor = '#e80e19'}
            onBlur={(e) => e.target.style.borderColor = '#2a2018'}
          />
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Doplnujuce udaje vo formate JSON</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer"
            style={{ fontFamily: 'var(--font-poiret-one)', background: '#e80e19', color: '#faf8f5' }}
          >
            {loading ? 'Ukladam...' : editingId ? 'Upravit slacik' : 'Vytvorit slacik'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}
            >
              Zrusit
            </button>
          )}
        </div>
      </form>

      {successMessage && (
        <div className="mt-6 p-4" style={{ background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', color: '#4ade80' }}>
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4" style={{ background: 'rgba(232, 14, 25, 0.1)', border: '1px solid rgba(232, 14, 25, 0.3)', color: '#fca5a5' }}>
          {error}
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={fetchBows}
          disabled={loading}
          className="w-full py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer"
          style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}
        >
          {loading ? 'Nacitavam...' : 'Vsetky slaciky'}
        </button>

        {bows.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-4 pb-3" style={{ borderBottom: '1px solid #2a2018' }}>
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.15em', fontSize: '13px', textTransform: 'uppercase' }}>
                Vsetky slaciky ({bows.length})
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>
              Presunте slaciky tahanim pre zmenu poradia zobrazenia
            </p>

            {/* Sort bows: by order first, then by creation date */}
            {[...bows]
              .sort((a, b) => {
                // First sort by order (ascending - lower numbers first)
                if (a.order !== b.order) {
                  return a.order - b.order
                }
                // Then sort by creation date (newest first)
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              })
              .map((bow, index) => (
                <div
                  key={bow.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 transition-all duration-200 cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                  style={{
                    background: '#1a1510',
                    border: '1px solid #2a2018',
                    borderLeft: bow.published ? '2px solid #16a34a' : '2px solid #e80e19',
                  }}
                >
                  {/* Header with title and status badges */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-xl mb-1" style={{ color: '#faf8f5', fontFamily: 'var(--font-cormorant)' }}>{bow.name}</h4>
                      {bow.enName && <h5 className="text-md italic" style={{ color: '#c4b49a' }}>{bow.enName}</h5>}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {/* Published Status */}
                      <span
                        className="px-3 py-1 text-xs font-bold uppercase tracking-wider"
                        style={{
                          background: bow.published ? '#16a34a' : '#e80e19',
                          color: '#faf8f5',
                        }}
                      >
                        {bow.published ? 'PUBLIKOVANY' : 'NEPUBLIKOVANY'}
                      </span>

                      {/* Additional badges */}
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-xs font-bold" style={{ background: '#2a2018', color: '#9b8f84' }}>
                          #{bow.order}
                        </span>
                        {bow.new && (
                          <span className="px-2 py-1 text-xs font-bold uppercase" style={{ background: '#8b6914', color: '#faf8f5' }}>
                            NOVY
                          </span>
                        )}
                        <span
                          className="px-2 py-1 text-xs font-medium uppercase"
                          style={{
                            background: bow.availability === 'available' ? 'rgba(22, 163, 74, 0.2)' : 'rgba(155, 143, 132, 0.2)',
                            color: bow.availability === 'available' ? '#16a34a' : '#9b8f84',
                          }}
                        >
                          {bow.availability === 'available' ? 'DOSTUPNY' : 'PREDANY'}
                        </span>
                        <span className="px-2 py-1 text-xs" style={{ background: '#2a2018', color: '#9b8f84' }}>
                          {new Date(bow.createdAt).toLocaleDateString('sk-SK')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <p style={{ color: '#faf8f5' }} className="mb-2">{bow.description}</p>
                    {bow.enDescription && (
                      <p className="italic text-sm" style={{ color: '#c4b49a' }}>{bow.enDescription}</p>
                    )}
                  </div>

                  {/* Price */}
                  {bow.price && (
                    <p className="font-semibold mb-3" style={{ color: '#8b6914' }}>{bow.price}</p>
                  )}

                  {/* Video URL */}
                  {bow.videoUrl && (
                    <div className="mb-3">
                      <a
                        href={bow.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                        style={{ color: '#8b6914' }}
                      >
                        Pozriet video
                      </a>
                    </div>
                  )}

                  {/* Images */}
                  {bow.images && bow.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Obrazky ({bow.images.length}):</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {bow.images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative h-24 w-24 flex-shrink-0"
                            style={{ border: '1px solid #2a2018' }}
                          >
                            <Image
                              src={imageUrl}
                              alt={`${bow.name} - ${index + 1}`}
                              width={96}
                              height={96}
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-3 pt-3" style={{ borderTop: '1px solid #2a2018' }}>
                    <button
                      onClick={() => handleEdit(bow)}
                      className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer"
                      style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(139, 105, 20, 0.4)', color: '#8b6914', background: 'transparent' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#8b6914'; e.currentTarget.style.color = '#faf8f5' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b6914' }}
                    >
                      Upravit
                    </button>
                    <button
                      onClick={() => handleDelete(bow.id)}
                      className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer"
                      style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(232, 14, 25, 0.4)', color: '#e80e19', background: 'transparent' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#e80e19'; e.currentTarget.style.color = '#faf8f5' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e80e19' }}
                    >
                      Vymazat
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

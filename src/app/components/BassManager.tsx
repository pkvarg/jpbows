'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

interface BassFormData {
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
  instrumentType: 'bass' | 'violone' | 'gamba' | 'cello'
}

interface Bass {
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
  instrumentType: 'bass' | 'violone' | 'gamba' | 'cello'
  order: number
  createdAt: Date
  updatedAt: Date
}

export default function BassManager() {
  const [formData, setFormData] = useState<BassFormData>({
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
    instrumentType: 'bass',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [basses, setBasses] = useState<Bass[]>([])
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
      instrumentType: 'bass',
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
      const maxOrder = editingId ? undefined : Math.max(0, ...basses.map((b) => b.order)) + 1

      const bassData = {
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
        instrumentType: formData.instrumentType,
        ...(maxOrder !== undefined && { order: maxOrder }),
      }

      // Determine if we're creating or updating
      const url = editingId ? `/api/basses/${editingId}` : '/api/basses'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bassData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} bass`)
      }

      const resultBass = await response.json()

      if (editingId) {
        // Update basses list with edited bass
        setBasses(basses.map((b) => (b.id === editingId ? resultBass : b)))
        setSuccessMessage('Product updated successfully!')
      } else {
        // Add new product to list
        setBasses([...basses, resultBass])
        setSuccessMessage('Bass created successfully!')
      }

      // Reset the form
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchBasses = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/basses')

      if (!response.ok) {
        throw new Error('Failed to fetch basses')
      }

      const data = await response.json()
      setBasses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (bass: Bass) => {
    setFormData({
      name: bass.name,
      enName: bass.enName || '',
      description: bass.description,
      enDescription: bass.enDescription || '',
      images: bass.images || [],
      price: bass.price || '',
      priceEnglish: bass.priceEnglish || '',
      published: bass.published || false,
      new: bass.new || false,
      metadata: bass.metadata || '',
      videoUrl: bass.videoUrl || '',
      availability: bass.availability || 'available',
      instrumentType: bass.instrumentType || 'bass',
    })
    setEditingId(bass.id)
    setImagePreviews(bass.images || [])
    setImageFiles([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this bass?')) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/basses/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete bass')
      }

      // Remove from products list
      setBasses(basses.filter((b) => b.id !== id))
      setSuccessMessage('Bass deleted successfully!')

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
    const updatedBasses = [...basses]
    const [draggedItem] = updatedBasses.splice(draggedIndex, 1)
    updatedBasses.splice(dropIndex, 0, draggedItem)

    // Update order values for all items
    const bassesWithNewOrder = updatedBasses.map((bass, index) => ({
      ...bass,
      order: index + 1,
    }))

    // Optimistically update UI
    setBasses(bassesWithNewOrder)
    setDraggedIndex(null)

    // Send update to server
    try {
      const response = await fetch('/api/basses/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basses: bassesWithNewOrder.map((b) => ({ id: b.id, order: b.order })),
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
      fetchBasses()
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  return (
    <div className="px-6 py-6 border rounded-lg shadow-md max-w-2xl mx-auto text-black">
      <h2 className="text-xl text-white font-bold mb-4">
        {editingId ? 'Upraviť nástroj' : 'Vytvoriť nástroj'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
            Názov (SK)
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="enName" className="block text-sm font-medium text-gray-400">
            Názov (EN)
          </label>
          <input
            type="text"
            id="enName"
            name="enName"
            value={formData.enName}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-400">
            Popis (SK)
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
            Popis (EN)
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
          <label htmlFor="price" className="block text-sm font-medium text-gray-400">
            Cena (SK)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="napr. 1500€"
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="priceEnglish" className="block text-sm font-medium text-gray-400">
            Cena (EN)
          </label>
          <input
            type="text"
            id="priceEnglish"
            name="priceEnglish"
            value={formData.priceEnglish}
            onChange={handleInputChange}
            placeholder="napr. 1500€"
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-400">
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            placeholder="napr. https://www.youtube.com/watch?v=..."
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
          <p className="text-xs text-gray-500 mt-1">Voliteľné - odkaz na video</p>
        </div>

        <div>
          <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-400">
            Obrázky
          </label>
          <input
            type="file"
            id="imageUpload"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
          <p className="text-xs text-gray-500 mt-1">Môžete vybrať viacero obrázkov naraz</p>

          {imagePreviews.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">
                Náhľad ({imagePreviews.length} obrázkov):
              </p>
              <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto border border-gray-600 p-2 rounded">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-24 w-24 border">
                      <Image
                        src={preview}
                        alt={`Image preview ${index + 1}`}
                        width={96}
                        height={96}
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                      {/* Image position indicator */}
                      <div className="absolute bottom-0 left-0 bg-black/70 text-white text-xs px-1 rounded-tr">
                        #{index + 1}
                      </div>
                    </div>
                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Odstrániť"
                    >
                      ×
                    </button>
                    {/* Move up button */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveImageUp(index)}
                        className="absolute top-0 left-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Posunúť hore"
                      >
                        ↑
                      </button>
                    )}
                    {/* Move down button */}
                    {index < imagePreviews.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveImageDown(index)}
                        className="absolute bottom-0 left-0 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Posunúť dole"
                      >
                        ↓
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="published" className="block text-sm font-medium text-gray-400">
            Publikovaný
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
              <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">
                {formData.published ? 'Áno' : 'Nie'}
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">Zobrazí sa na webstránke</p>
          </div>
        </div>

        <div>
          <label htmlFor="new" className="block text-sm font-medium text-gray-400">
            Nový produkt
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
              <div className="relative w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-300">
                {formData.new ? 'Áno' : 'Nie'}
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">Označí produkt ako nový</p>
          </div>
        </div>

        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-400">
            Dostupnosť
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          >
            <option value="available">Dostupný</option>
            <option value="sold">Predaný</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Stav dostupnosti nástroja</p>
        </div>

        <div>
          <label htmlFor="instrumentType" className="block text-sm font-medium text-gray-400">
            Typ nástroja
          </label>
          <select
            id="instrumentType"
            name="instrumentType"
            value={formData.instrumentType}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          >
            <option value="bass">Bass</option>
            <option value="violone">Violone</option>
            <option value="gamba">Gamba</option>
            <option value="cello">Cello</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Typ sláčikového nástroja</p>
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
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Ukladám...' : editingId ? 'Upraviť nástroj' : 'Vytvoriť nástroj'}
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
          onClick={fetchBasses}
          disabled={loading}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Načítavam...' : 'Všetky nástroje'}
        </button>

        {basses.length > 0 && (
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-bold text-yellow-500 border-b border-yellow-500 pb-2">
              Všetky nástroje ({basses.length})
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              💡 Presuňte nástroje ťahaním pre zmenu poradia zobrazenia
            </p>

            {/* Sort basses: by order first, then by creation date */}
            {[...basses]
              .sort((a, b) => {
                // First sort by order (ascending - lower numbers first)
                if (a.order !== b.order) {
                  return a.order - b.order
                }
                // Then sort by creation date (newest first)
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              })
              .map((bass, index) => (
                <div
                  key={bass.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 cursor-move hover:shadow-lg ${
                    bass.published ? 'border-green-500 bg-green-50/5' : 'border-red-400 bg-red-50/5'
                  } ${draggedIndex === index ? 'opacity-50' : ''}`}
                >
                  {/* Header with title and status badges */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-xl text-white mb-1">{bass.name}</h4>
                      {bass.enName && (
                        <h5 className="text-md text-gray-300 italic">{bass.enName}</h5>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      {/* Published Status - Most Prominent */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          bass.published ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {bass.published ? '✓ PUBLIKOVANÝ' : '✗ NEPUBLIKOVANÝ'}
                      </span>

                      {/* Additional badges */}
                      <div className="flex gap-2">
                        <span className="px-2 py-1 rounded bg-purple-600 text-white text-xs font-bold">
                          #{bass.order}
                        </span>
                        <span className="px-2 py-1 rounded bg-yellow-600 text-white text-xs font-bold uppercase">
                          {bass.instrumentType}
                        </span>
                        {bass.new && (
                          <span className="px-2 py-1 rounded bg-blue-600 text-white text-xs">
                            NOVÝ
                          </span>
                        )}
                        <span
                          className={`px-2 py-1 rounded text-white text-xs font-medium ${
                            bass.availability === 'available' ? 'bg-green-600' : 'bg-red-600'
                          }`}
                        >
                          {bass.availability === 'available'
                            ? 'DOSTUPNÝ'
                            : 'PREDANÝ - NA OBJEDNÁVKU'}
                        </span>
                        <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-xs">
                          {new Date(bass.createdAt).toLocaleDateString('sk-SK')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-3">
                    <p className="text-white mb-2">{bass.description}</p>
                    {bass.enDescription && (
                      <p className="text-gray-300 italic text-sm">{bass.enDescription}</p>
                    )}
                  </div>

                  {/* Price */}
                  {bass.price && (
                    <p className="text-yellow-400 font-semibold mb-3">💰 {bass.price}</p>
                  )}

                  {/* Video URL */}
                  {bass.videoUrl && (
                    <div className="mb-3">
                      <p className="text-blue-400 font-semibold">
                        🎥{' '}
                        <a
                          href={bass.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          Pozrieť video
                        </a>
                      </p>
                    </div>
                  )}

                  {/* Images */}
                  {bass.images && bass.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">Obrázky ({bass.images.length}):</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {bass.images.map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative h-24 w-24 flex-shrink-0 border-2 border-gray-600 rounded"
                          >
                            <Image
                              src={imageUrl}
                              alt={`${bass.name} - ${index + 1}`}
                              width={96}
                              height={96}
                              style={{ objectFit: 'cover' }}
                              className="rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-2 border-t border-gray-600">
                    <button
                      onClick={() => handleEdit(bass)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded font-medium transition-colors"
                    >
                      ✏️ Upraviť
                    </button>
                    <button
                      onClick={() => handleDelete(bass.id)}
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

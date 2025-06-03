'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

interface BowFormData {
  name: string
  description: string
  images: string[]
  available: string
  price: string
  published: boolean
}

interface Bow {
  id: string
  images: string[]
  name: string
  description: string
  available: string
  price: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export default function BowManager() {
  const [formData, setFormData] = useState<BowFormData>({
    name: '',
    description: '',
    images: [],
    available: 'áno',
    price: '',
    published: false,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [bows, setBows] = useState<Bow[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      images: [],
      available: 'áno',
      price: '',
      published: false,
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

          const apiUrl = 'https://hono-api.pictusweb.com/api/upload/jpbows'
          //const apiUrl = 'http://localhost:3013/api/upload/jpbows'

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

      const bowData = {
        name: formData.name,
        description: formData.description,
        images: uploadedImageUrls,
        available: formData.available,
        price: formData.price,
        published: formData.published,
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
      description: bow.description,
      images: bow.images || [],
      available: bow.available,
      price: bow.price || '',
      published: bow.published || false,
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

  return (
    <div className="p-6 border rounded-lg shadow-md max-w-md mx-auto text-black">
      <h2 className="text-xl text-white font-bold mb-4">
        {editingId ? 'Upraviť sláčik' : 'Vytvoriť sláčik'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
            Názov
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
          <label htmlFor="price" className="block text-sm font-medium text-gray-400">
            Cena
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="napr. €1500"
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          />
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
              <div className="grid grid-cols-3 gap-2 h-[200px]">
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
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="available" className="block text-sm font-medium text-gray-400">
            Dostupnosť
          </label>
          <select
            id="available"
            name="available"
            value={formData.available}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 text-white rounded-md shadow-sm p-2"
          >
            <option value="áno">Áno</option>
            <option value="nie">Nie</option>
            <option value="obmedzená">Obmedzená</option>
          </select>
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

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Ukladám...' : editingId ? 'Upraviť sláčik' : 'Vytvoriť sláčik'}
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
          onClick={fetchBows}
          disabled={loading}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Načítavam...' : 'Všetky sláčiky'}
        </button>

        {bows.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium text-yellow-500">Produkty ({bows.length})</h3>
            {bows.map((bow) => (
              <div key={bow.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <h4 className="font-bold text-white">{bow.name}</h4>
                  <div className="flex items-center gap-2">
                    {!bow.published && (
                      <span className="text-xs px-2 py-1 rounded bg-gray-600 text-gray-300">
                        Nepublikovaný
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        bow.available === 'áno'
                          ? 'bg-green-100 text-green-800'
                          : bow.available === 'obmedzená'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {bow.available}
                    </span>
                  </div>
                </div>
                <p className="text-md text-white mt-1">{bow.description}</p>
                {bow.price && <p className="text-sm text-gray-300 mt-1">Cena: {bow.price}</p>}

                {bow.images && bow.images.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-2 overflow-x-auto">
                      {bow.images.map((imageUrl, index) => (
                        <div key={index} className="relative h-32 w-32 flex-shrink-0">
                          <Image
                            src={imageUrl}
                            alt={`${bow.name} - ${index + 1}`}
                            width={128}
                            height={128}
                            style={{ objectFit: 'cover' }}
                            className="rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(bow)}
                    className="flex-1 bg-yellow-900 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Upraviť
                  </button>
                  <button
                    onClick={() => handleDelete(bow.id)}
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

'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

interface ProductFormData {
  name: string
  description: string
  imageUrl: string
  available: string
}

interface Product {
  id: string
  imageUrl: string
  name: string
  description: string
  available: string
  createdAt: Date
  updatedAt: Date
}

export default function ProductManager() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    imageUrl: '',
    available: 'áno',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      imageUrl: '',
      available: 'áno',
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

      const productData = {
        ...formData,
        imageUrl: finalImageUrl, // Use the uploaded image URL or existing one
      }

      // Determine if we're creating or updating
      const url = editingId ? `/api/products/${editingId}` : '/api/products'
      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} product`)
      }

      const resultProduct = await response.json()

      if (editingId) {
        // Update products list with edited product
        setProducts(products.map((p) => (p.id === editingId ? resultProduct : p)))
        setSuccessMessage('Product updated successfully!')
      } else {
        // Add new product to list
        setProducts([...products, resultProduct])
        setSuccessMessage('Product created successfully!')
      }

      // Reset the form
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/products')

      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }

      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      available: product.available,
    })
    setEditingId(product.id)
    setImagePreview(product.imageUrl)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      // Remove from products list
      setProducts(products.filter((p) => p.id !== id))
      setSuccessMessage('Product deleted successfully!')

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
        {editingId ? 'Upraviť produkt' : 'Vytvoriť produkt'}
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
            className="mt-1 block w-full border border-gray-300 text-white  rounded-md shadow-sm p-2"
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
            className="mt-1 block w-full border border-gray-300 text-white  rounded-md shadow-sm p-2"
          />
          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <div className="relative h-40 w-40 border">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={100}
                  height={100}
                  style={{ objectFit: 'contain' }}
                />
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
            className="mt-1 block w-full border border-gray-300 text-white  rounded-md shadow-sm p-2"
          >
            <option value="áno">Áno</option>
            <option value="nie">Nie</option>
            <option value="obmedzená">Obmedzená</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Ukladám...' : editingId ? 'Upraviť produkt' : 'Vytvoriť produkt'}
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
          onClick={fetchProducts}
          disabled={loading}
          className="w-full bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Načítavam...' : 'Všetky produkty'}
        </button>

        {products.length > 0 && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-medium text-yellow-500">Produkty ({products.length})</h3>
            {products.map((product) => (
              <div key={product.id} className="p-3 border rounded">
                <div className="flex justify-between">
                  <h4 className="font-bold text-white">{product.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.available === 'áno'
                        ? 'bg-green-100 text-green-800'
                        : product.available === 'obmedzená'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.available}
                  </span>
                </div>
                <p className="text-md text-white mt-1">{product.description}</p>

                {product.imageUrl && (
                  <div className="mt-2 relative h-40 w-full">
                    {/* <p className="text-white">url: {product.imageUrl}</p> */}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={100}
                      height={100}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-yellow-900 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Upraviť
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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

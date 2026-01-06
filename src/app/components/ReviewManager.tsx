'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent, useEffect } from 'react'

interface ReviewFormData {
  customerName: string
  customerDescription: string
  customerDescription2: string
  customerDescriptionEnglish: string
  customerDescription2English: string
  reviewText: string
  reviewTextEnglish: string
  photo: string
  active: boolean
  reviewOriginLink: string
  reviewType: 'bows' | 'instruments' | 'repairs' | 'rental'
}

interface Review {
  id: string
  customerName: string
  customerDescription: string
  customerDescription2: string | null
  customerDescriptionEnglish: string | null
  customerDescription2English: string | null
  reviewText: string
  reviewTextEnglish: string
  photo: string
  active: boolean
  reviewOriginLink: string
  reviewType: 'bows' | 'instruments' | 'repairs' | 'rental'
  createdAt: Date
  updatedAt: Date
}

export default function ReviewManager() {
  const [formData, setFormData] = useState<ReviewFormData>({
    customerName: '',
    customerDescription: '',
    customerDescription2: '',
    customerDescriptionEnglish: '',
    customerDescription2English: '',
    reviewText: '',
    reviewTextEnglish: '',
    photo: '',
    active: true,
    reviewOriginLink: '',
    reviewType: 'bows',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      if (!response.ok) throw new Error('Failed to fetch reviews')
      const data = await response.json()
      setReviews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews')
    }
  }

  const resetForm = () => {
    setFormData({
      customerName: '',
      customerDescription: '',
      customerDescription2: '',
      customerDescriptionEnglish: '',
      customerDescription2English: '',
      reviewText: '',
      reviewTextEnglish: '',
      photo: '',
      active: true,
      reviewOriginLink: '',
      reviewType: 'bows',
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
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload only image files')
      return
    }

    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Image upload failed')
    const { imageUrl } = await response.json()
    return imageUrl
  }

  const removePhoto = () => {
    setImageFile(null)
    setImagePreview(null)
    setFormData((prev) => ({ ...prev, photo: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      let photoUrl = formData.photo

      if (imageFile) {
        photoUrl = await uploadImage(imageFile)
      }

      const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews'
      const method = editingId ? 'PUT' : 'POST'

      const reviewData = {
        ...formData,
        photo: photoUrl,
        // Convert empty strings to undefined for optional fields
        customerDescription2: formData.customerDescription2 || undefined,
        customerDescriptionEnglish: formData.customerDescriptionEnglish || undefined,
        customerDescription2English: formData.customerDescription2English || undefined,
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save review')
      }

      setSuccessMessage(editingId ? 'Review updated successfully!' : 'Review created successfully!')
      resetForm()
      fetchReviews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (review: Review) => {
    setFormData({
      customerName: review.customerName,
      customerDescription: review.customerDescription,
      customerDescription2: review.customerDescription2 || '',
      customerDescriptionEnglish: review.customerDescriptionEnglish || '',
      customerDescription2English: review.customerDescription2English || '',
      reviewText: review.reviewText,
      reviewTextEnglish: review.reviewTextEnglish,
      photo: review.photo,
      active: review.active,
      reviewOriginLink: review.reviewOriginLink,
      reviewType: review.reviewType,
    })
    setEditingId(review.id)
    setImagePreview(review.photo)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete review')

      setSuccessMessage('Review deleted successfully!')
      fetchReviews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete review')
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (review: Review) => {
    try {
      const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...review,
          active: !review.active,
        }),
      })

      if (!response.ok) throw new Error('Failed to update review')
      fetchReviews()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update review')
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Review Management</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? 'Edit Review' : 'Add New Review'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              placeholder="Name Surname"
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Type</label>
            <select
              name="reviewType"
              value={formData.reviewType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="bows">Bows</option>
              <option value="instruments">Instruments</option>
              <option value="repairs">Repairs</option>
              <option value="rental">Rental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Description 1 (Slovak)
            </label>
            <input
              type="text"
              name="customerDescription"
              value={formData.customerDescription}
              placeholder="kontrabasista..."
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Description 2 (Slovak) - optional
            </label>
            <input
              type="text"
              name="customerDescription2"
              value={formData.customerDescription2}
              placeholder="majiteľ modelu..."
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Description (English) - optional
            </label>
            <input
              type="text"
              name="customerDescriptionEnglish"
              value={formData.customerDescriptionEnglish}
              placeholder="double bass player..."
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Description 2 (English) - optional
            </label>
            <input
              type="text"
              name="customerDescription2English"
              value={formData.customerDescription2English}
              placeholder="owner of model..."
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Text (Slovak)
            </label>
            <textarea
              name="reviewText"
              value={formData.reviewText}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Text (English)
            </label>
            <textarea
              name="reviewTextEnglish"
              value={formData.reviewTextEnglish}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review Origin Link (for ex. Google)
            </label>
            <input
              type="url"
              name="reviewOriginLink"
              value={formData.reviewOriginLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer Photo (optional)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          {(imagePreview || formData.photo) && (
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo Preview</label>
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-32">
                  <Image
                    src={imagePreview || formData.photo}
                    alt="Customer photo"
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm h-fit"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          )}
          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Review' : 'Add Review'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Existing Reviews</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    {review.photo && (
                      <Image
                        src={review.photo}
                        alt={review.customerName}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">{review.customerName}</h3>
                      <p className="text-gray-600">{review.customerDescription}</p>
                      <p className="text-gray-600">{review.customerDescription2}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded mt-1 ${
                          review.reviewType === 'bows'
                            ? 'bg-purple-100 text-purple-700'
                            : review.reviewType === 'instruments'
                            ? 'bg-blue-100 text-blue-700'
                            : review.reviewType === 'repairs'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {review.reviewType.charAt(0).toUpperCase() + review.reviewType.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.reviewText}</p>
                  {review.reviewOriginLink && (
                    <a
                      href={review.reviewOriginLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View original review
                    </a>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleActive(review)}
                    className={`px-3 py-1 rounded text-sm ${
                      review.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {review.active ? 'Active' : 'Inactive'}
                  </button>
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

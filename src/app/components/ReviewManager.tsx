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
    setFormData({ customerName: '', customerDescription: '', customerDescription2: '', customerDescriptionEnglish: '', customerDescription2English: '', reviewText: '', reviewTextEnglish: '', photo: '', active: true, reviewOriginLink: '', reviewType: 'bows' })
    setImageFile(null); setImagePreview(null); setEditingId(null)
    if (fileInputRef.current) { fileInputRef.current.value = '' }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    if (!file.type.startsWith('image/')) { setError('Please upload only image files'); return }
    setImageFile(file)
    const reader = new FileReader(); reader.onloadend = () => { setImagePreview(reader.result as string) }; reader.readAsDataURL(file)
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData(); formData.append('file', file)
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`
    const response = await fetch(apiUrl, { method: 'POST', body: formData })
    if (!response.ok) throw new Error('Image upload failed')
    const { imageUrl } = await response.json(); return imageUrl
  }

  const removePhoto = () => {
    setImageFile(null); setImagePreview(null); setFormData((prev) => ({ ...prev, photo: '' }))
    if (fileInputRef.current) { fileInputRef.current.value = '' }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccessMessage(null)
    try {
      let photoUrl = formData.photo
      if (imageFile) { photoUrl = await uploadImage(imageFile) }
      const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews'; const method = editingId ? 'PUT' : 'POST'
      const reviewData = { ...formData, photo: photoUrl, customerDescription2: formData.customerDescription2 || undefined, customerDescriptionEnglish: formData.customerDescriptionEnglish || undefined, customerDescription2English: formData.customerDescription2English || undefined }
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(reviewData) })
      if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || 'Failed to save review') }
      setSuccessMessage(editingId ? 'Review updated successfully!' : 'Review created successfully!')
      resetForm(); fetchReviews()
    } catch (err) { setError(err instanceof Error ? err.message : 'An error occurred') } finally { setLoading(false) }
  }

  const handleEdit = (review: Review) => {
    setFormData({ customerName: review.customerName, customerDescription: review.customerDescription, customerDescription2: review.customerDescription2 || '', customerDescriptionEnglish: review.customerDescriptionEnglish || '', customerDescription2English: review.customerDescription2English || '', reviewText: review.reviewText, reviewTextEnglish: review.reviewTextEnglish, photo: review.photo, active: review.active, reviewOriginLink: review.reviewOriginLink, reviewType: review.reviewType })
    setEditingId(review.id); setImagePreview(review.photo); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return
    setLoading(true); setError(null)
    try { const response = await fetch(`/api/reviews/${id}`, { method: 'DELETE' }); if (!response.ok) throw new Error('Failed to delete review'); setSuccessMessage('Review deleted successfully!'); fetchReviews() } catch (err) { setError(err instanceof Error ? err.message : 'Failed to delete review') } finally { setLoading(false) }
  }

  const toggleActive = async (review: Review) => {
    try { const response = await fetch(`/api/reviews/${review.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...review, active: !review.active }) }); if (!response.ok) throw new Error('Failed to update review'); fetchReviews() } catch (err) { setError(err instanceof Error ? err.message : 'Failed to update review') }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-8 mb-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
        <h2 className="text-2xl italic mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}>
          {editingId ? 'Edit Review' : 'Add New Review'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Customer Name</label>
            <input type="text" name="customerName" value={formData.customerName} placeholder="Name Surname" onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} required />
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Review Type</label>
            <select name="reviewType" value={formData.reviewType} onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} required>
              <option value="bows">Bows</option>
              <option value="instruments">Instruments</option>
              <option value="repairs">Repairs</option>
              <option value="rental">Rental</option>
            </select>
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Customer Description 1 (Slovak)</label>
            <input type="text" name="customerDescription" value={formData.customerDescription} placeholder="kontrabasista..." onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} required />
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Customer Description 2 (Slovak) - optional</label>
            <input type="text" name="customerDescription2" value={formData.customerDescription2} placeholder="majitel modelu..." onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Customer Description (English) - optional</label>
            <input type="text" name="customerDescriptionEnglish" value={formData.customerDescriptionEnglish} placeholder="double bass player..." onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Customer Description 2 (English) - optional</label>
            <input type="text" name="customerDescription2English" value={formData.customerDescription2English} placeholder="owner of model..." onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Review Text (Slovak)</label>
            <textarea name="reviewText" value={formData.reviewText} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} required />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Review Text (English)</label>
            <textarea name="reviewTextEnglish" value={formData.reviewTextEnglish} onChange={handleInputChange} rows={4} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} required />
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Review Origin Link (for ex. Google)</label>
            <input type="url" name="reviewOriginLink" value={formData.reviewOriginLink} onChange={handleInputChange} className="w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} placeholder="https://..." />
          </div>
          <div>
            <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Customer Photo (optional)</label>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="w-full px-4 py-3 outline-none transition-colors text-[#faf8f5]" style={{ background: '#0f0d0a', border: '1px solid #2a2018' }} />
          </div>
          {(imagePreview || formData.photo) && (
            <div className="col-span-1 md:col-span-2">
              <label className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Photo Preview</label>
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-32" style={{ border: '1px solid #2a2018' }}>
                  <Image src={imagePreview || formData.photo} alt="Customer photo" fill className="object-cover" />
                </div>
                <button type="button" onClick={removePhoto} className="px-4 py-2 text-sm tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(232, 14, 25, 0.4)', color: '#e80e19', background: 'transparent' }}>Remove Photo</button>
              </div>
            </div>
          )}
          <div className="col-span-1 md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="active" checked={formData.active} onChange={handleInputChange} className="h-4 w-4 accent-[#e80e19]" />
              <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Active</span>
            </label>
          </div>
        </div>

        {error && (<div className="mt-6 p-4" style={{ background: 'rgba(232, 14, 25, 0.1)', border: '1px solid rgba(232, 14, 25, 0.3)', color: '#fca5a5' }}>{error}</div>)}
        {successMessage && (<div className="mt-6 p-4" style={{ background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', color: '#4ade80' }}>{successMessage}</div>)}

        <div className="mt-6 flex gap-4">
          <button type="submit" disabled={loading} className="py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', background: '#e80e19', color: '#faf8f5' }}>
            {loading ? 'Saving...' : editingId ? 'Update Review' : 'Add Review'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>Cancel</button>
          )}
        </div>
      </form>

      <div className="p-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-6 h-0.5 bg-[#e80e19]" />
          <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.15em', fontSize: '13px', textTransform: 'uppercase' }}>Existing Reviews</span>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4" style={{ background: '#0f0d0a', border: '1px solid #2a2018', borderLeft: review.active ? '2px solid #16a34a' : '2px solid #e80e19' }}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    {review.photo && (
                      <Image src={review.photo} alt={review.customerName} width={60} height={60} className="object-cover" style={{ borderRadius: '0' }} />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: '#faf8f5', fontFamily: 'var(--font-cormorant)' }}>{review.customerName}</h3>
                      <p style={{ color: '#c4b49a' }}>{review.customerDescription}</p>
                      <p style={{ color: '#c4b49a' }}>{review.customerDescription2}</p>
                      <span className="inline-block px-2 py-1 text-xs mt-1 uppercase font-bold" style={{ background: '#2a2018', color: '#8b6914' }}>
                        {review.reviewType.charAt(0).toUpperCase() + review.reviewType.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="mb-2" style={{ color: '#faf8f5' }}>{review.reviewText}</p>
                  {review.reviewOriginLink && (
                    <a href={review.reviewOriginLink} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: '#8b6914' }}>View original review</a>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => toggleActive(review)} className="px-3 py-1 text-sm font-bold uppercase tracking-wider cursor-pointer" style={{ background: review.active ? 'rgba(22, 163, 74, 0.2)' : 'rgba(155, 143, 132, 0.2)', color: review.active ? '#16a34a' : '#9b8f84' }}>
                    {review.active ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => handleEdit(review)} className="px-3 py-1 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer" style={{ border: '1px solid rgba(139, 105, 20, 0.4)', color: '#8b6914', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#8b6914'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b6914' }}>Edit</button>
                  <button onClick={() => handleDelete(review.id)} className="px-3 py-1 text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer" style={{ border: '1px solid rgba(232, 14, 25, 0.4)', color: '#e80e19', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e80e19'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e80e19' }}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

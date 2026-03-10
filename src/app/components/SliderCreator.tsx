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
  const [formData, setFormData] = useState<SliderFormData>({ title: '', subtitle: '', description: '', imageUrl: '', active: true })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [sliders, setSliders] = useState<Slider[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => { setFormData({ title: '', subtitle: '', description: '', imageUrl: '', active: true }); setImageFile(null); setImagePreview(null); setEditingId(null); if (fileInputRef.current) { fileInputRef.current.value = '' } }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })) }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, checked } = e.target; setFormData((prev) => ({ ...prev, [name]: checked })) }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; if (!file.type.startsWith('image/')) { setError('Please upload an image file'); return }; const reader = new FileReader(); reader.onloadend = () => { setImagePreview(reader.result as string) }; reader.readAsDataURL(file); setImageFile(file) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccessMessage(null)
    try {
      let finalImageUrl = formData.imageUrl
      if (imageFile) { const formData = new FormData(); formData.append('file', imageFile); const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`; const response = await fetch(apiUrl, { method: 'POST', body: formData }); if (!response.ok) { throw new Error('Failed to upload image') }; const data = await response.json(); finalImageUrl = data.imageUrl }
      const sliderData = { ...formData, imageUrl: finalImageUrl }
      const url = editingId ? `/api/sliders/${editingId}` : '/api/sliders'; const method = editingId ? 'PUT' : 'POST'
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sliderData) })
      if (!response.ok) { throw new Error(`Failed to ${editingId ? 'update' : 'create'} slider`) }
      const resultSlider = await response.json()
      if (editingId) { setSliders(sliders.map((s) => (s.id === editingId ? resultSlider : s))); setSuccessMessage('Slider updated successfully!') } else { setSliders([...sliders, resultSlider]); setSuccessMessage('Slider created successfully!') }
      resetForm()
    } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) }
  }

  const fetchSliders = async () => { try { setLoading(true); setError(null); const response = await fetch('/api/sliders'); if (!response.ok) { throw new Error('Failed to fetch sliders') }; const data = await response.json(); setSliders(data) } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) } }

  const handleEdit = (slider: Slider) => { setFormData({ title: slider.title, subtitle: slider.subtitle, description: slider.description, imageUrl: slider.imageUrl, active: slider.active }); setEditingId(slider.id); setImagePreview(slider.imageUrl); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleDelete = async (id: string) => { if (!confirm('Are you sure you want to delete this slider?')) return; try { setLoading(true); setError(null); const response = await fetch(`/api/sliders/${id}`, { method: 'DELETE' }); if (!response.ok) { throw new Error('Failed to delete slider') }; setSliders(sliders.filter((s) => s.id !== id)); setSuccessMessage('Slider deleted successfully!'); if (editingId === id) { resetForm() } } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) } }

  const cancelEdit = () => { resetForm() }

  return (
    <div className="p-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
      <h2 className="text-2xl italic mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}>
        {editingId ? 'Upravit slider' : 'Vytvorit slider'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Titulok</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="subtitle" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Podtitulok</label>
          <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} required className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Popis</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="imageUpload" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Obrazok</label>
          <input type="file" id="imageUpload" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="block w-full px-4 py-3 outline-none transition-colors text-[#faf8f5]" style={{ background: '#0f0d0a', border: '1px solid #2a2018' }} />
          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Nahlad:</p>
              <div className="relative h-40 w-full" style={{ border: '1px solid #2a2018' }}>
                <Image src={imagePreview} alt="Image preview" width={100} height={100} style={{ objectFit: 'cover' }} />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleCheckboxChange} className="h-4 w-4 accent-[#e80e19]" />
          <label htmlFor="active" className="text-sm" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Aktivny</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', background: '#e80e19', color: '#faf8f5' }}>
            {loading ? 'Ukladam...' : editingId ? 'Upravit slider' : 'Vytvorit slider'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>Zrusit</button>
          )}
        </div>
      </form>

      {successMessage && (<div className="mt-6 p-4" style={{ background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', color: '#4ade80' }}>{successMessage}</div>)}
      {error && (<div className="mt-6 p-4" style={{ background: 'rgba(232, 14, 25, 0.1)', border: '1px solid rgba(232, 14, 25, 0.3)', color: '#fca5a5' }}>{error}</div>)}

      <div className="mt-8">
        <button onClick={fetchSliders} disabled={loading} className="w-full py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>
          {loading ? 'Nacitavam...' : 'Vsetky slidery'}
        </button>

        {sliders.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-4 pb-3" style={{ borderBottom: '1px solid #2a2018' }}>
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.15em', fontSize: '13px', textTransform: 'uppercase' }}>Slidery ({sliders.length})</span>
            </div>
            {sliders.map((slider) => (
              <div key={slider.id} className="p-4" style={{ background: '#1a1510', border: '1px solid #2a2018', borderLeft: slider.active ? '2px solid #16a34a' : '2px solid #e80e19' }}>
                <div className="flex justify-between">
                  <h4 className="font-bold" style={{ color: '#faf8f5', fontFamily: 'var(--font-cormorant)' }}>{slider.title}</h4>
                  <span className="text-xs px-2 py-1 font-bold uppercase" style={{ background: slider.active ? '#16a34a' : '#e80e19', color: '#faf8f5' }}>
                    {slider.active ? 'Aktivny' : 'Neaktivny'}
                  </span>
                </div>
                <p className="text-sm mt-1" style={{ color: '#c4b49a' }}>{slider.subtitle}</p>
                <p className="text-md mt-1" style={{ color: '#faf8f5' }}>{slider.description}</p>

                {slider.imageUrl && (
                  <div className="mt-3 relative h-40 w-full" style={{ border: '1px solid #2a2018' }}>
                    <Image src={slider.imageUrl} alt={slider.title} width={100} height={100} style={{ objectFit: 'cover' }} />
                  </div>
                )}

                <div className="mt-3 flex gap-3" style={{ borderTop: '1px solid #2a2018', paddingTop: '12px' }}>
                  <button onClick={() => handleEdit(slider)} className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(139, 105, 20, 0.4)', color: '#8b6914', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#8b6914'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b6914' }}>Upravit</button>
                  <button onClick={() => handleDelete(slider.id)} className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(232, 14, 25, 0.4)', color: '#e80e19', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e80e19'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e80e19' }}>Vymazat</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

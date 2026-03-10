'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'

interface RentalInstrumentFormData {
  name: string
  enName: string
  description: string
  enDescription: string
  images: string[]
  published: boolean
  metadata: string
  status: 'available' | 'rented' | 'maintenance'
}

interface RentalInstrument {
  id: string
  images: string[]
  name: string
  enName: string
  description: string
  enDescription: string
  published: boolean
  metadata: string
  status: 'available' | 'rented' | 'maintenance'
  order: number
  createdAt: Date
  updatedAt: Date
}

export default function RentalInstrumentManager() {
  const [formData, setFormData] = useState<RentalInstrumentFormData>({
    name: '',
    enName: '',
    description: '',
    enDescription: '',
    images: [],
    published: false,
    metadata: '',
    status: 'available',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [rentalInstruments, setRentalInstruments] = useState<RentalInstrument[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => { setFormData({ name: '', enName: '', description: '', enDescription: '', images: [], published: false, metadata: '', status: 'available' }); setImageFiles([]); setImagePreviews([]); setEditingId(null); if (fileInputRef.current) { fileInputRef.current.value = '' } }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })) }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { const files = Array.from(e.target.files || []); if (files.length === 0) return; const invalidFiles = files.filter((file) => !file.type.startsWith('image/')); if (invalidFiles.length > 0) { setError('Please upload only image files'); return }; const newPreviews: string[] = []; const fileReaders: Promise<void>[] = []; files.forEach((file, index) => { const reader = new FileReader(); const promise = new Promise<void>((resolve) => { reader.onloadend = () => { newPreviews[index] = reader.result as string; resolve() } }); fileReaders.push(promise); reader.readAsDataURL(file) }); Promise.all(fileReaders).then(() => { setImageFiles((prevFiles) => [...prevFiles, ...files]); setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]) }) }

  const removeImage = (index: number) => { setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index)); if (editingId && index < formData.images.length) { setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) })) } }

  const moveImageUp = (index: number) => { if (index === 0) return; setImagePreviews((prevPreviews) => { const newPreviews = [...prevPreviews]; [newPreviews[index - 1], newPreviews[index]] = [newPreviews[index], newPreviews[index - 1]]; return newPreviews }); setImageFiles((prevFiles) => { const newFiles = [...prevFiles]; if (newFiles[index] && newFiles[index - 1]) { [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]] }; return newFiles }); if (editingId) { setFormData((prev) => { const newImages = [...prev.images]; if (newImages[index] && newImages[index - 1]) { [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]] }; return { ...prev, images: newImages } }) } }

  const moveImageDown = (index: number) => { if (index === imagePreviews.length - 1) return; setImagePreviews((prevPreviews) => { const newPreviews = [...prevPreviews]; [newPreviews[index], newPreviews[index + 1]] = [newPreviews[index + 1], newPreviews[index]]; return newPreviews }); setImageFiles((prevFiles) => { const newFiles = [...prevFiles]; if (newFiles[index] && newFiles[index + 1]) { [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]] }; return newFiles }); if (editingId) { setFormData((prev) => { const newImages = [...prev.images]; if (newImages[index] && newImages[index + 1]) { [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]] }; return { ...prev, images: newImages } }) } }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccessMessage(null)
    try {
      let uploadedImageUrls: string[] = [...formData.images]
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(async (file) => { const formData = new FormData(); formData.append('file', file); const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/upload/jpbows`; const response = await fetch(apiUrl, { method: 'POST', body: formData }); if (!response.ok) { throw new Error('Failed to upload image') }; const data = await response.json(); return data.imageUrl })
        const newImageUrls = await Promise.all(uploadPromises); uploadedImageUrls = [...uploadedImageUrls, ...newImageUrls]
      }
      const maxOrder = editingId ? undefined : Math.max(0, ...rentalInstruments.map((r) => r.order)) + 1
      const rentalInstrumentData = { name: formData.name, enName: formData.enName, description: formData.description, enDescription: formData.enDescription, images: uploadedImageUrls, published: formData.published, metadata: formData.metadata, status: formData.status, ...(maxOrder !== undefined && { order: maxOrder }) }
      const url = editingId ? `/api/rental-instruments/${editingId}` : '/api/rental-instruments'; const method = editingId ? 'PUT' : 'POST'
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rentalInstrumentData) })
      if (!response.ok) { throw new Error(`Failed to ${editingId ? 'update' : 'create'} rental instrument`) }
      const resultRentalInstrument = await response.json()
      if (editingId) { setRentalInstruments(rentalInstruments.map((item) => (item.id === editingId ? resultRentalInstrument : item))); setSuccessMessage('Rental instrument updated successfully!') } else { setRentalInstruments([...rentalInstruments, resultRentalInstrument]); setSuccessMessage('Rental instrument created successfully!') }
      resetForm()
    } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) }
  }

  const fetchRentalInstruments = async () => { try { setLoading(true); setError(null); const response = await fetch('/api/rental-instruments'); if (!response.ok) { throw new Error('Failed to fetch rental instruments') }; const data = await response.json(); setRentalInstruments(data) } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) } }

  const handleEdit = (rentalInstrument: RentalInstrument) => { setFormData({ name: rentalInstrument.name, enName: rentalInstrument.enName || '', description: rentalInstrument.description, enDescription: rentalInstrument.enDescription || '', images: rentalInstrument.images || [], published: rentalInstrument.published || false, metadata: rentalInstrument.metadata || '', status: rentalInstrument.status || 'available' }); setEditingId(rentalInstrument.id); setImagePreviews(rentalInstrument.images || []); setImageFiles([]); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleDelete = async (id: string) => { if (!confirm('Are you sure you want to delete this rental instrument?')) return; try { setLoading(true); setError(null); const response = await fetch(`/api/rental-instruments/${id}`, { method: 'DELETE' }); if (!response.ok) { throw new Error('Failed to delete rental instrument') }; setRentalInstruments(rentalInstruments.filter((item) => item.id !== id)); setSuccessMessage('Rental instrument deleted successfully!'); if (editingId === id) { resetForm() } } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) } }

  const cancelEdit = () => { resetForm() }
  const handleDragStart = (index: number) => { setDraggedIndex(index) }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault() }

  const handleDrop = async (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) { setDraggedIndex(null); return }
    const updatedRentalInstruments = [...rentalInstruments]; const [draggedItem] = updatedRentalInstruments.splice(draggedIndex, 1); updatedRentalInstruments.splice(dropIndex, 0, draggedItem)
    const rentalInstrumentsWithNewOrder = updatedRentalInstruments.map((item, index) => ({ ...item, order: index + 1 }))
    setRentalInstruments(rentalInstrumentsWithNewOrder); setDraggedIndex(null)
    try { const response = await fetch('/api/rental-instruments/reorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rentalInstruments: rentalInstrumentsWithNewOrder.map((r) => ({ id: r.id, order: r.order })) }) }); if (!response.ok) { throw new Error('Failed to update order') }; setSuccessMessage('Order updated successfully!'); setTimeout(() => setSuccessMessage(null), 3000) } catch { setError('Failed to update order. Please refresh the page.'); fetchRentalInstruments() }
  }

  const handleDragEnd = () => { setDraggedIndex(null) }

  return (
    <div className="p-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
      <h2 className="text-2xl italic mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}>
        {editingId ? 'Upraviť nástroj na prenájom' : 'Vytvoriť nástroj na prenájom'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Nazov (SK)</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="enName" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Nazov (EN)</label>
          <input type="text" id="enName" name="enName" value={formData.enName} onChange={handleInputChange} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Popis (SK)</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="enDescription" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Popis (EN)</label>
          <textarea id="enDescription" name="enDescription" value={formData.enDescription} onChange={handleInputChange} rows={3} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
        </div>

        <div>
          <label htmlFor="imageUpload" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Obrazky</label>
          <input type="file" id="imageUpload" ref={fileInputRef} onChange={handleFileChange} accept="image/*" multiple className="block w-full px-4 py-3 outline-none transition-colors text-[#faf8f5]" style={{ background: '#0f0d0a', border: '1px solid #2a2018' }} />
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Mozete vybrat viacero obrazkov naraz</p>

          {imagePreviews.length > 0 && (
            <div className="mt-3">
              <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Nahlad ({imagePreviews.length} obrazkov):</p>
              <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto p-2" style={{ border: '1px solid #2a2018' }}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="relative h-24 w-24" style={{ border: '1px solid #2a2018' }}>
                      <Image src={preview} alt={`Image preview ${index + 1}`} width={96} height={96} style={{ objectFit: 'cover' }} />
                      <div className="absolute bottom-0 left-0 text-xs px-1" style={{ background: 'rgba(15, 13, 10, 0.8)', color: '#9b8f84' }}>#{index + 1}</div>
                    </div>
                    <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#e80e19', color: '#faf8f5' }} title="Odstranit">x</button>
                    {index > 0 && (<button type="button" onClick={() => moveImageUp(index)} className="absolute top-0 left-0 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#8b6914', color: '#faf8f5' }} title="Posunut hore">&uarr;</button>)}
                    {index < imagePreviews.length - 1 && (<button type="button" onClick={() => moveImageDown(index)} className="absolute bottom-0 left-0 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: '#8b6914', color: '#faf8f5' }} title="Posunut dole">&darr;</button>)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="published" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Publikovany</label>
          <div className="mt-1">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" id="published" name="published" checked={formData.published} onChange={(e) => setFormData((prev) => ({ ...prev, published: e.target.checked }))} className="sr-only peer" />
              <div className="relative w-11 h-6 bg-[#2a2018] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e80e19]"></div>
              <span className="ml-3 text-sm font-medium" style={{ color: '#c4b49a' }}>{formData.published ? 'Ano' : 'Nie'}</span>
            </label>
            <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Zobrazi sa na webstranke</p>
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Stav</label>
          <select id="status" name="status" value={formData.status} onChange={handleInputChange} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'}>
            <option value="available">Dostupny</option>
            <option value="rented">Prenajaty</option>
            <option value="maintenance">Udrzba</option>
          </select>
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Stav dostupnosti nastroja</p>
        </div>

        <div>
          <label htmlFor="metadata" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Metadata</label>
          <textarea id="metadata" name="metadata" value={formData.metadata} onChange={handleInputChange} rows={2} placeholder="JSON metadata alebo doplnujuce informacie" className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Doplnujuce udaje vo formate JSON</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', background: '#e80e19', color: '#faf8f5' }}>
            {loading ? 'Ukladam...' : editingId ? 'Upravit nastroj' : 'Vytvorit nastroj'}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>Zrusit</button>
          )}
        </div>
      </form>

      {successMessage && (<div className="mt-6 p-4" style={{ background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', color: '#4ade80' }}>{successMessage}</div>)}
      {error && (<div className="mt-6 p-4" style={{ background: 'rgba(232, 14, 25, 0.1)', border: '1px solid rgba(232, 14, 25, 0.3)', color: '#fca5a5' }}>{error}</div>)}

      <div className="mt-8">
        <button onClick={fetchRentalInstruments} disabled={loading} className="w-full py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>
          {loading ? 'Načítavam...' : 'Všetky nástroje na prenájom'}
        </button>

        {rentalInstruments.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-4 pb-3" style={{ borderBottom: '1px solid #2a2018' }}>
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.15em', fontSize: '13px', textTransform: 'uppercase' }}>Všetky nástroje na prenájom ({rentalInstruments.length})</span>
            </div>
            <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Presunте nastroje tahanim pre zmenu poradia zobrazenia</p>

            {[...rentalInstruments]
              .sort((a, b) => { if (a.order !== b.order) return a.order - b.order; return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() })
              .map((rentalInstrument, index) => (
                <div key={rentalInstrument.id} draggable onDragStart={() => handleDragStart(index)} onDragOver={handleDragOver} onDrop={() => handleDrop(index)} onDragEnd={handleDragEnd}
                  className={`p-4 transition-all duration-200 cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                  style={{ background: '#1a1510', border: '1px solid #2a2018', borderLeft: rentalInstrument.published ? '2px solid #16a34a' : '2px solid #e80e19' }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-xl mb-1" style={{ color: '#faf8f5', fontFamily: 'var(--font-cormorant)' }}>{rentalInstrument.name}</h4>
                      {rentalInstrument.enName && <h5 className="text-md italic" style={{ color: '#c4b49a' }}>{rentalInstrument.enName}</h5>}
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: rentalInstrument.published ? '#16a34a' : '#e80e19', color: '#faf8f5' }}>
                        {rentalInstrument.published ? 'PUBLIKOVANY' : 'NEPUBLIKOVANY'}
                      </span>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 text-xs font-bold" style={{ background: '#2a2018', color: '#9b8f84' }}>#{rentalInstrument.order}</span>
                        <span className="px-2 py-1 text-xs font-medium uppercase" style={{
                          background: rentalInstrument.status === 'available' ? 'rgba(22, 163, 74, 0.2)' : rentalInstrument.status === 'rented' ? 'rgba(234, 88, 12, 0.2)' : 'rgba(155, 143, 132, 0.2)',
                          color: rentalInstrument.status === 'available' ? '#16a34a' : rentalInstrument.status === 'rented' ? '#ea580c' : '#9b8f84'
                        }}>
                          {rentalInstrument.status === 'available' ? 'DOSTUPNY' : rentalInstrument.status === 'rented' ? 'PRENAJATY' : 'UDRZBA'}
                        </span>
                        <span className="px-2 py-1 text-xs" style={{ background: '#2a2018', color: '#9b8f84' }}>{new Date(rentalInstrument.createdAt).toLocaleDateString('sk-SK')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p style={{ color: '#faf8f5' }} className="mb-2">{rentalInstrument.description}</p>
                    {rentalInstrument.enDescription && <p className="italic text-sm" style={{ color: '#c4b49a' }}>{rentalInstrument.enDescription}</p>}
                  </div>

                  {rentalInstrument.images && rentalInstrument.images.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Obrazky ({rentalInstrument.images.length}):</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {rentalInstrument.images.map((imageUrl, index) => (
                          <div key={index} className="relative h-24 w-24 flex-shrink-0" style={{ border: '1px solid #2a2018' }}>
                            <Image src={imageUrl} alt={`${rentalInstrument.name} - ${index + 1}`} width={96} height={96} style={{ objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-3" style={{ borderTop: '1px solid #2a2018' }}>
                    <button onClick={() => handleEdit(rentalInstrument)} className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(139, 105, 20, 0.4)', color: '#8b6914', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#8b6914'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b6914' }}>Upravit</button>
                    <button onClick={() => handleDelete(rentalInstrument.id)} className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(232, 14, 25, 0.4)', color: '#e80e19', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e80e19'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e80e19' }}>Vymazat</button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { useState, useRef, ChangeEvent } from 'react'
import { uploadImage, MAX_UPLOAD_BYTES } from '@/lib/uploadImage'

// Blog template options
type BlogTemplate = 'classic' | 'modern' | 'minimal'

interface BlogFormData {
  title: string
  enTitle: string
  subtitle: string
  enSubtitle: string
  description: string
  enDescription: string
  blogtext: string
  enBlogtext: string
  imageUrl: string
  active: boolean
  template: BlogTemplate
  metadata: string
}

interface Blog {
  id: string
  imageUrl: string
  title: string
  enTitle: string
  subtitle: string
  enSubtitle: string
  description: string
  enDescription: string
  blogtext: string
  enBlogtext: string
  active: boolean
  template: BlogTemplate
  metadata: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export default function BlogCreator() {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    enTitle: '',
    subtitle: '',
    enSubtitle: '',
    description: '',
    enDescription: '',
    blogtext: '',
    enBlogtext: '',
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
  const [previewLanguage, setPreviewLanguage] = useState<'sk' | 'en'>('sk')
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetForm = () => {
    setFormData({ title: '', enTitle: '', subtitle: '', enSubtitle: '', description: '', enDescription: '', blogtext: '', enBlogtext: '', imageUrl: '', active: true, template: 'classic', metadata: '' })
    setImageFile(null); setImagePreview(null); setEditingId(null); setPreviewTemplate(false); setPreviewLanguage('sk')
    if (fileInputRef.current) { fileInputRef.current.value = '' }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })) }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => { const { name, checked } = e.target; setFormData((prev) => ({ ...prev, [name]: checked })) }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (!file) return; if (!file.type.startsWith('image/')) { setError('Prosím, nahrajte súbor s obrázkom'); return }; if (file.size > MAX_UPLOAD_BYTES) { setError(`Súbor je príliš veľký (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum je ${(MAX_UPLOAD_BYTES / (1024 * 1024)).toFixed(0)} MB.`); return }; const reader = new FileReader(); reader.onloadend = () => { setImagePreview(reader.result as string) }; reader.readAsDataURL(file); setImageFile(file) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(null); setSuccessMessage(null)
    try {
      let finalImageUrl = formData.imageUrl
      if (imageFile) { const { imageUrl } = await uploadImage(imageFile); finalImageUrl = imageUrl }
      const blogData = { title: formData.title, enTitle: formData.enTitle, subtitle: formData.subtitle, enSubtitle: formData.enSubtitle, description: formData.description, enDescription: formData.enDescription, blogtext: formData.blogtext, enBlogtext: formData.enBlogtext, imageUrl: finalImageUrl, active: formData.active, template: formData.template, metadata: formData.metadata }
      const url = editingId ? `/api/blogs/${editingId}` : '/api/blogs'; const method = editingId ? 'PUT' : 'POST'
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogData) })
      if (!response.ok) { throw new Error(`Failed to ${editingId ? 'update' : 'create'} blog`) }
      const resultBlog = await response.json()
      if (editingId) { setBlogs(blogs.map((b) => (b.id === editingId ? resultBlog : b))); setSuccessMessage('Blog updated successfully!') } else { setBlogs([...blogs, resultBlog]); setSuccessMessage('Blog created successfully!') }
      resetForm()
    } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) }
  }

  const fetchBlogs = async () => { try { setLoading(true); setError(null); const response = await fetch('/api/blogs'); if (!response.ok) { throw new Error('Failed to fetch blogs') }; const data = await response.json(); setBlogs(data) } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) } }

  const handleEdit = (blog: Blog) => { setFormData({ title: blog.title, enTitle: blog.enTitle || '', subtitle: blog.subtitle, enSubtitle: blog.enSubtitle || '', description: blog.description, enDescription: blog.enDescription || '', blogtext: blog.blogtext, enBlogtext: blog.enBlogtext || '', imageUrl: blog.imageUrl, active: blog.active, template: blog.template, metadata: blog.metadata || '' }); setEditingId(blog.id); setImagePreview(blog.imageUrl); setPreviewTemplate(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const handleDelete = async (id: string) => { if (!confirm('Are you sure you want to delete this blog?')) return; try { setLoading(true); setError(null); const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' }); if (!response.ok) { throw new Error('Failed to delete blog') }; setBlogs(blogs.filter((b) => b.id !== id)); setSuccessMessage('Blog deleted successfully!'); if (editingId === id) { resetForm() } } catch (err) { setError(err instanceof Error ? err.message : 'An unknown error occurred') } finally { setLoading(false) } }

  const cancelEdit = () => { resetForm() }
  const togglePreview = () => { setPreviewTemplate(!previewTemplate) }

  const handleDragStart = (index: number) => { setDraggedIndex(index) }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    const newBlogs = [...blogs]; const draggedBlog = newBlogs[draggedIndex]; newBlogs.splice(draggedIndex, 1); newBlogs.splice(index, 0, draggedBlog)
    setBlogs(newBlogs); setDraggedIndex(index)
  }

  const handleDragEnd = async () => {
    if (draggedIndex === null) return
    const blogsWithNewOrder = blogs.map((blog, index) => ({ id: blog.id, order: index }))
    try { const response = await fetch('/api/blogs/reorder', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ blogs: blogsWithNewOrder }) }); if (!response.ok) { throw new Error('Failed to update blog order') }; setBlogs(blogs.map((blog, index) => ({ ...blog, order: index }))) } catch (error) { console.error('Error updating blog order:', error); setError('Failed to update blog order') }
    setDraggedIndex(null)
  }

  const truncateText = (text: string, maxLength: number) => { if (text.length <= maxLength) return text; return text.substring(0, maxLength) + '...' }

  const getPreviewContent = () => {
    if (previewLanguage === 'en') { return { title: formData.enTitle || formData.title, subtitle: formData.enSubtitle || formData.subtitle, description: formData.enDescription || formData.description, blogtext: formData.enBlogtext || formData.blogtext } }
    return { title: formData.title, subtitle: formData.subtitle, description: formData.description, blogtext: formData.blogtext }
  }

  const ClassicTemplate = () => {
    const content = getPreviewContent()
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {imagePreview && (<div className="w-full h-64 relative"><Image src={imagePreview} alt={content.title} layout="fill" objectFit="cover" width={800} height={400} style={{ objectFit: 'cover' }} /></div>)}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{content.title}</h1>
          <h2 className="text-xl text-gray-600 mb-6">{content.subtitle}</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 text-xl"><p className="text-black italic font-bold">{content.description}</p></div>
          <div className="prose max-w-none text-gray-800 text-xl">{content.blogtext.split('\n').map((paragraph, idx) => (<p key={idx} className="mb-4">{paragraph}</p>))}</div>
        </div>
      </div>
    )
  }

  const ModernTemplate = () => {
    const content = getPreviewContent()
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-t-lg"><h1 className="text-4xl font-bold text-white mb-2">{content.title}</h1><h2 className="text-xl text-purple-100">{content.subtitle}</h2></div>
        <div className="bg-white p-8 rounded-b-lg shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {imagePreview && (<div className="relative h-80 w-full rounded-lg overflow-hidden"><Image src={imagePreview} alt={content.title} width={500} height={500} style={{ objectFit: 'cover' }} /></div>)}
          <div>
            <div className="bg-purple-50 p-4 rounded-lg mb-6 border-l-4 border-purple-500"><p className="text-purple-800">{content.description}</p></div>
            <div className="prose text-gray-700">{content.blogtext.split('\n').map((paragraph, idx) => (<p key={idx} className="mb-4">{paragraph}</p>))}</div>
          </div>
        </div>
      </div>
    )
  }

  const MinimalTemplate = () => {
    const content = getPreviewContent()
    return (
      <div className="max-w-2xl mx-auto bg-gray-50 p-8">
        <h1 className="text-3xl font-light text-gray-800 mb-2 border-b pb-2">{content.title}</h1>
        <h2 className="text-lg text-gray-600 mb-8 italic">{content.subtitle}</h2>
        {imagePreview && (<div className="my-6 relative h-60 w-full"><Image src={imagePreview} alt={content.title} width={700} height={350} style={{ objectFit: 'contain' }} /></div>)}
        <div className="text-lg text-gray-700 mb-8">{content.description}</div>
        <div className="prose prose-sm max-w-none text-gray-800">{content.blogtext.split('\n').map((paragraph, idx) => (<p key={idx} className="mb-4 leading-relaxed">{paragraph}</p>))}</div>
      </div>
    )
  }

  const renderTemplatePreview = () => {
    switch (formData.template) { case 'classic': return <ClassicTemplate />; case 'modern': return <ModernTemplate />; case 'minimal': return <MinimalTemplate />; default: return <ClassicTemplate /> }
  }

  return (
    <div className="p-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
      <h2 className="text-2xl italic mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}>
        {editingId ? 'Upravit blog' : 'Vytvorit blog'}
      </h2>

      {!previewTemplate ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Titulok (SK)</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="enTitle" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Titulok (EN)</label>
            <input type="text" id="enTitle" name="enTitle" value={formData.enTitle} onChange={handleInputChange} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="subtitle" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Podtitulok (SK)</label>
            <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} required className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="enSubtitle" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Podtitulok (EN)</label>
            <input type="text" id="enSubtitle" name="enSubtitle" value={formData.enSubtitle} onChange={handleInputChange} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Kratky popis (SK)</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="enDescription" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Kratky popis (EN)</label>
            <textarea id="enDescription" name="enDescription" value={formData.enDescription} onChange={handleInputChange} rows={3} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="blogtext" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Obsah blogu (SK)</label>
            <textarea id="blogtext" name="blogtext" value={formData.blogtext} onChange={handleInputChange} required rows={8} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="enBlogtext" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Obsah blogu (EN)</label>
            <textarea id="enBlogtext" name="enBlogtext" value={formData.enBlogtext} onChange={handleInputChange} rows={8} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
          </div>

          <div>
            <label htmlFor="template" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Sablona</label>
            <select id="template" name="template" value={formData.template} onChange={handleInputChange} className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'}>
              <option value="classic">Klasicka</option>
              <option value="modern">Moderna</option>
              <option value="minimal">Minimalisticka</option>
            </select>
          </div>

          <div>
            <label htmlFor="imageUpload" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Obrazok</label>
            <input type="file" id="imageUpload" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="block w-full px-4 py-3 outline-none transition-colors text-[#faf8f5]" style={{ background: '#0f0d0a', border: '1px solid #2a2018' }} />
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Nahlad:</p>
                <div className="relative h-40 w-full" style={{ border: '1px solid #2a2018' }}>
                  <Image src={imagePreview} alt="Image preview" width={200} height={200} style={{ objectFit: 'cover' }} />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="active" name="active" checked={formData.active} onChange={handleCheckboxChange} className="h-4 w-4 accent-[#e80e19]" />
            <label htmlFor="active" className="text-sm" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Publikovany</label>
          </div>

          <div>
            <label htmlFor="metadata" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>Metadata</label>
            <textarea id="metadata" name="metadata" value={formData.metadata} onChange={handleInputChange} rows={2} placeholder="JSON metadata alebo doplnujuce informacie" className="block w-full px-4 py-3 outline-none transition-colors" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }} onFocus={(e) => e.target.style.borderColor = '#e80e19'} onBlur={(e) => e.target.style.borderColor = '#2a2018'} />
            <p className="text-xs mt-1" style={{ color: '#9b8f84' }}>Doplnujuce udaje vo formate JSON</p>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={togglePreview} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #8b6914', color: '#8b6914', background: 'transparent' }}>
              Zobrazit nahlad
            </button>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', background: '#e80e19', color: '#faf8f5' }}>
              {loading ? 'Ukladam...' : editingId ? 'Upravit blog' : 'Vytvorit blog'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>Zrusit</button>
            )}
          </div>
        </form>
      ) : (
        <div className="p-4 mb-4" style={{ background: '#0f0d0a', border: '1px solid #2a2018' }}>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2" style={{ color: '#faf8f5', fontFamily: 'var(--font-cormorant)' }}>
              Nahlad sablony: {formData.template === 'classic' ? 'Klasicka' : formData.template === 'modern' ? 'Moderna' : 'Minimalisticka'}
            </h3>
            <div className="flex gap-3 mb-4">
              <button onClick={() => setPreviewLanguage('sk')} className="px-4 py-2 text-sm tracking-[0.15em] uppercase font-bold cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', background: previewLanguage === 'sk' ? '#e80e19' : 'transparent', color: previewLanguage === 'sk' ? '#faf8f5' : '#9b8f84', border: previewLanguage === 'sk' ? 'none' : '1px solid #2a2018' }}>SK</button>
              <button onClick={() => setPreviewLanguage('en')} className="px-4 py-2 text-sm tracking-[0.15em] uppercase font-bold cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', background: previewLanguage === 'en' ? '#e80e19' : 'transparent', color: previewLanguage === 'en' ? '#faf8f5' : '#9b8f84', border: previewLanguage === 'en' ? 'none' : '1px solid #2a2018' }}>EN</button>
            </div>
            <button onClick={togglePreview} className="w-full py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>Spat k formularu</button>
          </div>
          <div className="p-2 overflow-auto max-h-[70vh]" style={{ border: '1px solid #2a2018', background: '#fff' }}>
            {renderTemplatePreview()}
          </div>
        </div>
      )}

      {successMessage && (<div className="mt-6 p-4" style={{ background: 'rgba(22, 163, 74, 0.1)', border: '1px solid rgba(22, 163, 74, 0.3)', color: '#4ade80' }}>{successMessage}</div>)}
      {error && (<div className="mt-6 p-4" style={{ background: 'rgba(232, 14, 25, 0.1)', border: '1px solid rgba(232, 14, 25, 0.3)', color: '#fca5a5' }}>{error}</div>)}

      <div className="mt-8">
        <button onClick={fetchBlogs} disabled={loading} className="w-full py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}>
          {loading ? 'Nacitavam...' : 'Vsetky blogy'}
        </button>

        {blogs.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-4 pb-3" style={{ borderBottom: '1px solid #2a2018' }}>
              <div className="w-6 h-0.5 bg-[#e80e19]" />
              <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.15em', fontSize: '13px', textTransform: 'uppercase' }}>Vsetky blogy ({blogs.length})</span>
            </div>
            <p className="text-sm mb-4" style={{ color: '#9b8f84' }}>Pretiahnite blogy na zmenu poradia zobrazenia</p>

            {blogs.map((blog, index) => (
              <div key={blog.id} draggable onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOver(e, index)} onDragEnd={handleDragEnd}
                className={`p-4 transition-all duration-200 cursor-move ${draggedIndex === index ? 'opacity-50' : ''}`}
                style={{ background: '#1a1510', border: '1px solid #2a2018', borderLeft: blog.active ? '2px solid #16a34a' : '2px solid #e80e19' }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold" style={{ background: '#2a2018', color: '#8b6914' }}>{index + 1}</div>
                    <div>
                      <h4 className="font-bold text-xl mb-1" style={{ color: '#faf8f5', fontFamily: 'var(--font-cormorant)' }}>{blog.title}</h4>
                      {blog.enTitle && <h5 className="text-md italic" style={{ color: '#c4b49a' }}>{blog.enTitle}</h5>}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider" style={{ background: blog.active ? '#16a34a' : '#e80e19', color: '#faf8f5' }}>
                      {blog.active ? 'PUBLIKOVANY' : 'NEPUBLIKOVANY'}
                    </span>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs uppercase" style={{ background: '#2a2018', color: '#9b8f84' }}>
                        {blog.template === 'classic' ? 'KLASICKA' : blog.template === 'modern' ? 'MODERNA' : 'MINIMALISTICKA'}
                      </span>
                      <span className="px-2 py-1 text-xs" style={{ background: '#2a2018', color: '#9b8f84' }}>{new Date(blog.createdAt).toLocaleDateString('sk-SK')}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-lg font-medium" style={{ color: '#c4b49a' }}>{blog.subtitle}</p>
                  {blog.enSubtitle && <p className="text-md italic" style={{ color: '#9b8f84' }}>{blog.enSubtitle}</p>}
                </div>

                <div className="mb-3">
                  <p className="mb-2" style={{ color: '#faf8f5' }}>{truncateText(blog.description, 120)}</p>
                  {blog.enDescription && <p className="italic text-sm" style={{ color: '#c4b49a' }}>{truncateText(blog.enDescription, 120)}</p>}
                </div>

                {blog.imageUrl && (
                  <div className="mb-4">
                    <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Obrazok:</p>
                    <div className="relative h-32 w-48" style={{ border: '1px solid #2a2018' }}>
                      <Image src={blog.imageUrl} alt={blog.title} width={192} height={128} style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                )}

                <div className="mb-4 pt-3" style={{ borderTop: '1px solid #2a2018' }}>
                  <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Obsah:</p>
                  <div className="p-3" style={{ background: '#0f0d0a' }}>
                    <p className="text-sm" style={{ color: '#c4b49a' }}>{truncateText(blog.blogtext, 180)}</p>
                    {blog.enBlogtext && <p className="text-xs italic mt-2" style={{ color: '#9b8f84' }}>{truncateText(blog.enBlogtext, 180)}</p>}
                  </div>
                </div>

                <div className="flex gap-3 pt-3" style={{ borderTop: '1px solid #2a2018' }}>
                  <button onClick={() => handleEdit(blog)} className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(139, 105, 20, 0.4)', color: '#8b6914', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#8b6914'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8b6914' }}>Upravit</button>
                  <button onClick={() => handleDelete(blog.id)} className="flex-1 py-2 px-4 font-bold text-sm tracking-[0.15em] uppercase transition-colors cursor-pointer" style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid rgba(232, 14, 25, 0.4)', color: '#e80e19', background: 'transparent' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e80e19'; e.currentTarget.style.color = '#faf8f5' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e80e19' }}>Vymazat</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

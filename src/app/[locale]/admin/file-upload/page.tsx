'use client'
import { useState, useRef, ChangeEvent } from 'react'
import { Link } from '@/i18n/routing'
import React from 'react'
import Image from 'next/image'
import { uploadImage, MAX_UPLOAD_BYTES } from '@/lib/uploadImage'

const FileUpload = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const resetUpload = () => {
    setFile(null)
    setFilePreview(null)
    setError(null)
    setSuccessMessage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Validate file type
    // Check if the file is either an image or audio file
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('audio/')) {
      setError('Prosim, nahrajte subor s obrazkom alebo audio subor')
      return
    }

    if (selectedFile.size > MAX_UPLOAD_BYTES) {
      setError(
        `Súbor je príliš veľký (${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB). Maximum je ${(MAX_UPLOAD_BYTES / (1024 * 1024)).toFixed(0)} MB.`,
      )
      return
    }

    setFile(selectedFile)
    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setFilePreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const uploadFile = async () => {
    if (!file) {
      setError('Ziadny subor na nahratie')
      return
    }

    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const { imageUrl } = await uploadImage(file)

      setSuccessMessage('Subor bol uspesne nahrany!')
      setUploadedFileUrl(imageUrl)

      // Reset the file input but keep the success message and URL
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      console.error('Chyba pri nahravani suboru:', err)
      setError(err instanceof Error ? err.message : 'Nastala neznama chyba')
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="min-h-screen px-8 pt-8 pb-16" style={{ background: '#0f0d0a' }}>
      <div className="max-w-3xl mx-auto mb-8">
        <Link href={'/admin'} className="inline-flex items-center gap-2 text-[#9b8f84] hover:text-[#faf8f5] transition-colors mb-8" style={{ fontFamily: 'var(--font-poiret-one)', fontSize: '13px', letterSpacing: '0.15em' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          NASPAT
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-6 h-0.5 bg-[#e80e19]" />
          <span style={{ fontFamily: 'var(--font-poiret-one)', color: '#8b6914', letterSpacing: '0.3em', fontSize: '13px', textTransform: 'uppercase' }}>File Upload</span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="p-8" style={{ background: '#1a1510', border: '1px solid #2a2018' }}>
          <h2 className="text-2xl italic mb-6" style={{ fontFamily: 'var(--font-cormorant)', color: '#faf8f5' }}>
            Nahrat subor
          </h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="fileUpload" className="block mb-2" style={{ fontFamily: 'var(--font-poiret-one)', color: '#9b8f84', letterSpacing: '0.15em', fontSize: '11px', textTransform: 'uppercase' }}>
                Vyberte subor
              </label>
              <input
                type="file"
                id="fileUpload"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full px-4 py-3 outline-none transition-colors text-[#faf8f5]"
                style={{ background: '#0f0d0a', border: '1px solid #2a2018' }}
              />
            </div>

            {filePreview && (
              <div className="mt-2">
                <p className="text-sm mb-1" style={{ color: '#9b8f84' }}>Nahlad:</p>
                <div className="relative h-40 w-40" style={{ border: '1px solid #2a2018' }}>
                  <Image
                    src={filePreview}
                    alt="Nahlad suboru"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={uploadFile}
                disabled={loading || !file}
                className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer"
                style={{ fontFamily: 'var(--font-poiret-one)', background: '#e80e19', color: '#faf8f5' }}
              >
                {loading ? 'Nahravam...' : 'Nahrat subor'}
              </button>

              {file && (
                <button
                  onClick={resetUpload}
                  className="flex-1 py-3 px-6 tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-poiret-one)', border: '1px solid #2a2018', color: '#9b8f84', background: 'transparent' }}
                >
                  Zrusit
                </button>
              )}
            </div>
          </div>

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

          {uploadedFileUrl && (
            <div className="mt-6">
              <p className="text-sm mb-2" style={{ color: '#9b8f84' }}>Odkaz na nahrany subor:</p>
              <div className="p-4 break-all" style={{ background: '#0f0d0a', border: '1px solid #2a2018', color: '#faf8f5' }}>
                {uploadedFileUrl}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default FileUpload

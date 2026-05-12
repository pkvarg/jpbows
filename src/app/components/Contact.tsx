'use client'
import React, { useRef, useState, useEffect, FC } from 'react'
import Message from './Message'
import { MdEmail, MdPhone, MdSend } from 'react-icons/md'
import { useParams } from 'next/navigation'

interface TranslationProps {
  translations: {
    contactTitle: string
    contactName: string
    contactEmail: string
    contactPhone: string
    contactMessage: string
    contactAgree: string
    contactGdpr: string
    contactSend: string
    //contactError2: string
    contactError: string
    contactSuccess: string
    contactGdpr1: string
    //contactGdpr2: string
    contactPlaceholderName: string
    contactPlaceholderEmail: string
    contactPlaceholderPhone: string
    contactPlaceholderMessage: string
    contactSubtitle: string
  }
}

const ContactComponent: FC<TranslationProps> = ({ translations }) => {
  const {
    contactTitle,
    contactName,
    contactEmail,
    contactPhone,
    contactMessage,
    contactAgree,
    contactGdpr,
    contactSend,
    //contactError2,
    contactError,
    contactSuccess,
    contactGdpr1,
    //contactGdpr2,
    contactPlaceholderName,
    contactPlaceholderEmail,
    contactPlaceholderPhone,
    contactPlaceholderMessage,
    contactSubtitle,
  } = translations
  const [message, setMessage] = useState<string | null>(null)
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [mailMessage, setMailMessage] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [checkBox, setCheckBox] = useState<boolean>(false)
  const [showGdpr, setShowGdpr] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Anti-spam: Time-based validation
  const [formStartTime, setFormStartTime] = useState<number>(0)

  // Anti-spam: Honeypot field
  const [honeypot, setHoneypot] = useState('')

  // Initialize form start time on mount
  useEffect(() => {
    setFormStartTime(Date.now())
  }, [])

  const params = useParams()

  // Extract the locale parameter
  // Type assertion needed since params can contain various types
  const locale = typeof params.locale === 'string' ? params.locale : 'sk'

  // Anti-spam: Content validation function
  const isSpamContent = (text: string): boolean => {
    if (!text || text.trim().length < 3) return true

    // Check for excessive special characters (more than 40% of content)
    const specialChars = text.match(/[^a-zA-Z0-9\s]/g) || []
    if (specialChars.length / text.length > 0.4) return true

    // Check for random character patterns (less than 25% vowels for stricter validation)
    const vowels = text.match(/[aeiouAEIOUáéíóúýäëïöüÁÉÍÓÚÝ]/g) || []
    if (vowels.length / text.length < 0.25) return true

    // Check for excessive uppercase (more than 40% uppercase letters for stricter validation)
    const uppercase = text.match(/[A-Z]/g) || []
    const letters = text.match(/[a-zA-Z]/g) || []
    if (letters && letters.length > 0 && uppercase.length / letters.length > 0.4) return true

    // Check for repetitive characters (same char 5+ times in a row)
    if (/(.)\1{4,}/.test(text)) return true

    return false
  }

  // Anti-spam: Rate limiting (client-side)
  const checkRateLimit = (): boolean => {
    const storageKey = 'contact_form_submissions'
    const now = Date.now()
    const oneHour = 60 * 60 * 1000 // 1 hour in milliseconds
    const maxSubmissions = 3

    try {
      const stored = localStorage.getItem(storageKey)
      const submissions: number[] = stored ? JSON.parse(stored) : []

      // Filter out submissions older than 1 hour
      const recentSubmissions = submissions.filter((time) => now - time < oneHour)

      if (recentSubmissions.length >= maxSubmissions) {
        return false // Rate limit exceeded
      }

      // Add current submission and save
      recentSubmissions.push(now)
      localStorage.setItem(storageKey, JSON.stringify(recentSubmissions))
      return true
    } catch (error) {
      // If localStorage is not available, allow submission
      console.error('Rate limit check error:', error)
      return true
    }
  }

  const toggleShowGdpr = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowGdpr((prev) => !prev)
  }

  const handleCheckBox = () => {
    setCheckBox((current) => !current)
  }

  const logBotAttempt = async (
    detectionType: string,
    detectionDetails: string,
    timeSpent?: number,
  ) => {
    try {
      await fetch('/api/bot-log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: mailMessage,
          honeypot,
          detectionType,
          detectionDetails,
          locale,
          origin: 'JPBOWS',
          timeSpent,
        }),
      })
    } catch (error) {
      console.error('Error logging bot attempt:', error)
    }
  }

  const increaseBots = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/bots/jpbows/increase`

    try {
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error increasing bots:', error)
    }
  }

  const increaseEmails = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/emails/jpbows/increase`
    try {
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (error) {
      console.error('Error increasing emails:', error)
    }
  }

  const form = useRef<HTMLFormElement>(null)
  const x = process.env.EMAIL_EXTRA_ONE
  const y = process.env.EMAIL_EXTRA_TWO
  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendEmail = async (e: any) => {
    e.preventDefault()

    // Guard against double-submission while a request is in flight
    if (isSubmitting) return
    setIsSubmitting(true)

    try {

    const origin = 'JPBOWS'
    const subjectTranslations = {
      en: 'Message from bow4bass',

      sk: 'Správa od bow4bass',
    }

    const subject =
      subjectTranslations[locale as keyof typeof subjectTranslations] || subjectTranslations.sk

    // Anti-spam Check 1: Honeypot field
    if (honeypot !== '') {
      const timeSpent = Date.now() - formStartTime
      await logBotAttempt('honeypot', `Honeypot field filled with value: "${honeypot}"`, timeSpent)
      setMessage(contactError)
      setName('')
      setEmail('')
      setPhone('')
      setMailMessage('')
      increaseBots()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // Anti-spam Check 2: Time-based validation (minimum 3 seconds)
    const timeSpent = Date.now() - formStartTime
    if (timeSpent < 3000) {
      await logBotAttempt(
        'time-based',
        `Form submitted too quickly: ${timeSpent}ms (minimum: 3000ms)`,
        timeSpent,
      )
      setMessage(contactError)
      setName('')
      setEmail('')
      setPhone('')
      setMailMessage('')
      increaseBots()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // Anti-spam Check 3: Content validation
    if (isSpamContent(name) || isSpamContent(mailMessage)) {
      const spamReason = isSpamContent(name) ? 'name field' : 'message field'
      await logBotAttempt('content-validation', `Spam content detected in ${spamReason}`, timeSpent)
      setMessage(contactError)
      setName('')
      setEmail('')
      setPhone('')
      setMailMessage('')
      increaseBots()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // Anti-spam Check 4: Rate limiting
    if (!checkRateLimit()) {
      await logBotAttempt(
        'rate-limit',
        'Rate limit exceeded: More than 3 submissions in 1 hour',
        timeSpent,
      )
      setMessage(contactError)
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    // Original honeypot check (keeping for backward compatibility)
    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      await logBotAttempt(
        'honeypot-legacy',
        'Legacy honeypot password fields were modified',
        timeSpent,
      )
      setMessage(contactError)
      setName('')
      setEmail('')
      setPhone('')
      setMailMessage('')
      increaseBots()
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      const options = {
        name,
        email,
        phone,
        mailMessage,
        locale,
        origin,
        subject,
      }

      try {
        const sendData = {
          ...options,
          locale,
          origin,
          subject,
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/contact`

        // Make the API request
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })

        // Check if request was successful
        if (!response.ok) {
          const errorData = await response.json()
          return {
            success: false,
            message: errorData.message || 'Failed to submit form',
          }
        }

        // Return success response
        const data = await response.json()

        setName('')
        setPhone('')
        setEmail('')
        setMailMessage('')
        setMessageSuccess(contactSuccess)
        increaseEmails()

        // Scroll to top to show success message
        const element = document.getElementById('contact')
        element?.scrollIntoView({ behavior: 'smooth' })

        return {
          success: true,
          message: data.message || 'Message sent successfully',
        }
      } catch (error) {
        setMessage(contactError)
        console.log(error)

        // Scroll to top to show error message
        const element = document.getElementById('contact')
        element?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="scroll-mt-14 bg-[#faf8f5]" id="contact">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          {/* Section Header */}
          <div className="flex items-center gap-6 mb-16">
            <div className="w-8 h-0.5 bg-[#e80e19]" />
            <span style={{fontFamily:'var(--font-poiret-one)',color:'#8b6914',letterSpacing:'0.3em',fontSize:'14px',textTransform:'uppercase'}}>
              {contactTitle}
            </span>
            <div className="h-px flex-1 bg-[#e0d8ce]" />
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-xl lg:text-2xl text-[#3d3228] leading-relaxed mb-12 text-center" style={{fontFamily:'var(--font-cormorant)'}}>
              {contactSubtitle}
            </p>

            {/* Contact Form Container */}
            <div className="bg-[#faf8f5] border border-[#e0d8ce] p-8 lg:p-12">
              {/* Success/Error Messages */}
              <div className="mb-6">
                {messageSuccess && <Message variant="success">{messageSuccess}</Message>}
                {message && <Message variant="danger">{message}</Message>}
              </div>
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* Personal Information Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="block mb-2" style={{fontFamily:'var(--font-poiret-one)',color:'#9b8f84',letterSpacing:'0.15em',fontSize:'12px',textTransform:'uppercase'}}>
                      {contactName}
                    </label>
                    <input
                      className="bg-[#faf8f5] border border-[#e0d8ce] text-[#1c1208] px-4 py-3 w-full outline-none focus:border-[#e80e19] transition-colors text-lg"
                      style={{fontFamily:'var(--font-cormorant)'}}
                      type="text"
                      name="user_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder={contactPlaceholderName}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block mb-2" style={{fontFamily:'var(--font-poiret-one)',color:'#9b8f84',letterSpacing:'0.15em',fontSize:'12px',textTransform:'uppercase'}}>
                      {contactEmail}
                    </label>
                    <input
                      className="bg-[#faf8f5] border border-[#e0d8ce] text-[#1c1208] px-4 py-3 w-full outline-none focus:border-[#e80e19] transition-colors text-lg"
                      style={{fontFamily:'var(--font-cormorant)'}}
                      type="email"
                      name="user_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={contactPlaceholderEmail}
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="block mb-2" style={{fontFamily:'var(--font-poiret-one)',color:'#9b8f84',letterSpacing:'0.15em',fontSize:'12px',textTransform:'uppercase'}}>
                      {contactPhone}
                    </label>
                    <input
                      className="bg-[#faf8f5] border border-[#e0d8ce] text-[#1c1208] px-4 py-3 w-full outline-none focus:border-[#e80e19] transition-colors text-lg"
                      style={{fontFamily:'var(--font-cormorant)'}}
                      type="text"
                      name="user_phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={contactPlaceholderPhone}
                    />

                    {/* Anti-spam: Honeypot field - hidden with CSS, bots will fill it */}
                    <div
                      style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                      aria-hidden="true"
                    >
                      <label htmlFor="website_url">Website</label>
                      <input
                        type="text"
                        id="website_url"
                        name="website_url"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col">
                  <label className="block mb-2" style={{fontFamily:'var(--font-poiret-one)',color:'#9b8f84',letterSpacing:'0.15em',fontSize:'12px',textTransform:'uppercase'}}>
                    {contactMessage}
                  </label>
                  <textarea
                    className="bg-[#faf8f5] border border-[#e0d8ce] text-[#1c1208] px-4 py-3 w-full outline-none focus:border-[#e80e19] transition-colors text-lg min-h-32 resize-none"
                    style={{fontFamily:'var(--font-cormorant)'}}
                    rows={5}
                    name="message"
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    required
                    placeholder={contactPlaceholderMessage}
                  ></textarea>
                </div>

                {/* GDPR Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    id="flexCheckDefault"
                    type="checkbox"
                    onChange={handleCheckBox}
                    required
                    className="w-5 h-5 mt-0.5 border border-[#e0d8ce] focus:ring-[#e80e19] accent-[#e80e19]"
                  />
                  <div>
                    <label
                      className="text-base lg:text-lg cursor-pointer text-[#3d3228]"
                      style={{fontFamily:'var(--font-cormorant)'}}
                      htmlFor="flexCheckDefault"
                    >
                      {contactAgree}{' '}
                      <button
                        type="button"
                        className="text-[#e80e19] underline transition-colors"
                        onClick={(e) => toggleShowGdpr(e)}
                      >
                        {contactGdpr}
                      </button>
                    </label>

                    {showGdpr && (
                      <div className="mt-3 bg-[#f0ece6] border-l-2 border-[#e80e19] p-4">
                        <p className="text-base lg:text-lg leading-relaxed text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                          {contactGdpr1}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hidden Fields */}
                <input
                  className="hidden"
                  type="text"
                  defaultValue={passwordGroupOne}
                  onChange={(e) => setPasswordGroupOne(e.target.value)}
                />
                <input
                  className="hidden"
                  type="text"
                  defaultValue={passwordGroupTwo}
                  onChange={(e) => setPasswordGroupTwo(e.target.value)}
                />

                {/* Submit Button */}
                <button
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#e80e19] hover:bg-[#1c1208] text-white px-10 py-4 text-base tracking-[0.15em] uppercase font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#e80e19]"
                  style={{fontFamily:'var(--font-poiret-one)'}}
                  type="submit"
                  value="Send"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  <MdSend className="text-xl" />
                  {contactSend}
                </button>
              </form>

              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-[#e0d8ce]">
                <div className="flex flex-col md:flex-row gap-6 justify-center text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MdEmail className="text-xl text-[#e80e19]" />
                    <span className="text-lg text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                      info@bow4bass.com
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MdPhone className="text-xl text-[#e80e19]" />
                    <span className="text-lg text-[#3d3228]" style={{fontFamily:'var(--font-cormorant)'}}>
                      +421 905 338 081
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactComponent

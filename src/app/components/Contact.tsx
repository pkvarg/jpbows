'use client'
import React, { useRef, useState, FC } from 'react'
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

  const params = useParams()

  // Extract the locale parameter
  // Type assertion needed since params can contain various types
  const locale = typeof params.locale === 'string' ? params.locale : 'sk'

  console.log('lcl', locale)

  const toggleShowGdpr = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowGdpr((prev) => !prev)
  }

  const handleCheckBox = () => {
    setCheckBox((current) => !current)
  }

  const increaseBots = async () => {
    const apiUrl = 'https://hono-api.pictusweb.com/api/bots/jpbows/increase'
    //const apiUrl = 'http://localhost:3013/api/bots/jpbows/increase'
    try {
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      //console.log('data bots', data)
    } catch (error) {
      console.error('Error increasing bots:', error)
    }
  }

  const increaseEmails = async () => {
    const apiUrl = 'https://hono-api.pictusweb.com/api/emails/jpbows/increase'
    //const apiUrl = 'http://localhost:3013/api/emails/jpbows/increase'
    try {
      await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      //console.log('data email', data)
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

    const origin = 'JPBOWS'
    const subjectTranslations = {
      en: 'Message from bow4bass',

      sk: 'Správa od bow4bass',
    }

    const subject =
      subjectTranslations[locale as keyof typeof subjectTranslations] || subjectTranslations.sk

    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
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

        //const apiUrl = 'http://localhost:3013/api/contact'

        const apiUrl = 'https://hono-api.pictusweb.com/api/contact'

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

        return {
          success: true,
          message: data.message || 'Message sent successfully',
        }
      } catch (error) {
        setMessage(contactError)
        console.log(error)
      }
      const element = document.getElementById('contact')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className="scroll-mt-14" id="contact" style={{ background: '#fefefe' }}>
        <div className="px-6 py-12 lg:px-[15%] text-[#2f0000]">
          {/* Section Header */}
          <div className="relative mb-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl lg:text-5xl font-bold text-[#e80e19] mb-3 tracking-wide">
                {contactTitle}
              </h1>
              <p className="text-xl lg:text-2xl font-bold text-[#2f0000] leading-relaxed">
                {locale === 'en'
                  ? 'Get in touch with us for any inquiries'
                  : 'Kontaktujte nás s akýmikoľvek otázkami'}
              </p>
            </div>
          </div>

          {/* Contact Form Container */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8 font-sans">
              {/* Success/Error Messages */}
              <div className="mb-6">
                {messageSuccess && <Message variant="success">{messageSuccess}</Message>}
                {message && <Message variant="danger">{message}</Message>}
              </div>
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* Personal Information Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-base lg:text-xl text-[#2f0000] mb-2 font-semibold">
                      {contactName}
                    </label>
                    <input
                      className="rounded-lg p-3 border border-[#2f0000]/20 focus:border-[#e80e19] focus:outline-none focus:ring-1 focus:ring-[#e80e19]/20 bg-[#fefefe] text-[#2f0000] text-base lg:text-xl transition-colors"
                      type="text"
                      name="user_name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Vaše meno"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-base lg:text-xl text-[#2f0000] mb-2 font-semibold">
                      {contactEmail}
                    </label>
                    <input
                      className="rounded-lg p-3 border border-[#2f0000]/20 focus:border-[#e80e19] focus:outline-none focus:ring-1 focus:ring-[#e80e19]/20 bg-[#fefefe] text-[#2f0000] text-base lg:text-xl transition-colors"
                      type="email"
                      name="user_email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="vas@email.com"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2">
                    <label className="text-base lg:text-xl text-[#2f0000] mb-2 font-semibold">
                      {contactPhone}
                    </label>
                    <input
                      className="rounded-lg p-3 border border-[#2f0000]/20 focus:border-[#e80e19] focus:outline-none focus:ring-1 focus:ring-[#e80e19]/20 bg-[#fefefe] text-[#2f0000] text-base lg:text-xl transition-colors"
                      type="text"
                      name="user_phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+421 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col">
                  <label className="text-base lg:text-xl text-[#2f0000] mb-2 font-semibold">
                    {contactMessage}
                  </label>
                  <textarea
                    className="rounded-lg p-3 border border-[#2f0000]/20 focus:border-[#e80e19] focus:outline-none focus:ring-1 focus:ring-[#e80e19]/20 min-h-32 bg-[#fefefe] text-[#2f0000] text-base lg:text-xl transition-colors resize-none"
                    rows={5}
                    name="message"
                    value={mailMessage}
                    onChange={(e) => setMailMessage(e.target.value)}
                    required
                    placeholder="Vaša správa..."
                  ></textarea>
                </div>

                {/* GDPR Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    id="flexCheckDefault"
                    type="checkbox"
                    onChange={handleCheckBox}
                    required
                    className="w-5 h-5 mt-0.5 rounded border border-[#2f0000]/30 focus:ring-[#e80e19] checked:bg-[#e80e19] accent-[#e80e19]"
                  />
                  <div>
                    <label
                      className="text-base lg:text-xl cursor-pointer text-[#2f0000] font-medium"
                      htmlFor="flexCheckDefault"
                    >
                      {contactAgree}{' '}
                      <button
                        type="button"
                        className="text-[#e80e19] underline hover:text-[#2f0000] transition-colors font-medium"
                        onClick={(e) => toggleShowGdpr(e)}
                      >
                        {contactGdpr}
                      </button>
                    </label>

                    {showGdpr && (
                      <div className="mt-3 p-3 bg-[#e80e19]/5 border-l-2 border-[#e80e19] rounded-md">
                        <p className="text-base lg:text-xl leading-relaxed text-[#2f0000] font-medium">
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
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#e80e19] hover:bg-[#2f0000] text-white py-3 px-6 rounded-lg font-medium text-base lg:text-xl transition-colors duration-200"
                  type="submit"
                  value="Send"
                >
                  <MdSend className="text-xl" />
                  {contactSend}
                </button>
              </form>

              {/* Contact Information */}
              <div className="mt-8 pt-6 border-t border-[#2f0000]/10">
                <div className="flex flex-col md:flex-row gap-6 justify-center text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MdEmail className="text-xl text-[#e80e19]" />
                    <span className="text-base lg:text-xl text-[#2f0000] font-medium">
                      info@bow4bass.com
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MdPhone className="text-xl text-[#e80e19]" />
                    <span className="text-base lg:text-xl text-[#2f0000] font-medium">
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

'use client'
import React, { useRef, useState, FC } from 'react'
import Message from './Message'
import { MdEmail, MdPhone, MdPerson, MdMessage, MdSend } from 'react-icons/md'
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
      <div className="scroll-mt-14" id="contact" style={{ background: '#f1f1ef' }}>
        <div className="px-6 py-16 lg:px-[15%] text-[#2f0000]">
          {/* Section Header with decorative elements */}
          <div className="relative mb-12">
            <h1 className="text-center text-5xl lg:text-7xl font-normal text-[#e80e19] tracking-wide">
              {contactTitle}
            </h1>
          </div>

          {/* Contact Form Container */}
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
            <div className="w-full lg:w-2/3 max-w-2xl">
              {/* Success/Error Messages */}
              <div className="mb-6">
                {messageSuccess && <Message variant="success">{messageSuccess}</Message>}
                {message && <Message variant="danger">{message}</Message>}
              </div>

              {/* Form with enhanced styling */}
              <div className="rounded-lg p-6 backdrop-blur-sm shadow-lg bg-white border border-[#2f0000]/20" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
                  {/* Personal Information Fields */}
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="flex items-center text-xl lg:text-2xl text-[#e80e19] mb-2 font-semibold tracking-wider">
                        <MdPerson className="mr-2 text-2xl" />
                        {contactName}
                      </label>
                      <input
                        className="rounded-lg p-4 border-2 border-[#2f0000]/30 focus:border-[#e80e19] focus:outline-none focus:ring-2 focus:ring-[#e80e19]/30 bg-[#f1f1ef] text-[#2f0000] text-lg"
                        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                        type="text"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Vaše meno"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="flex items-center text-xl lg:text-2xl text-[#e80e19] mb-2 font-semibold tracking-wider">
                        <MdEmail className="mr-2 text-2xl" />
                        {contactEmail}
                      </label>
                      <input
                        className="rounded-lg p-4 border-2 border-[#2f0000]/30 focus:border-[#e80e19] focus:outline-none focus:ring-2 focus:ring-[#e80e19]/30 bg-[#f1f1ef] text-[#2f0000] text-lg"
                        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                        type="email"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="vas@email.com"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="flex items-center text-xl lg:text-2xl text-[#e80e19] mb-2 font-semibold tracking-wider">
                        <MdPhone className="mr-2 text-2xl" />
                        {contactPhone}
                      </label>
                      <input
                        className="rounded-lg p-4 border-2 border-[#2f0000]/30 focus:border-[#e80e19] focus:outline-none focus:ring-2 focus:ring-[#e80e19]/30 bg-[#f1f1ef] text-[#2f0000] text-lg"
                        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                        type="text"
                        name="user_phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+421 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col mt-2">
                    <label className="flex items-center text-xl lg:text-2xl text-[#e80e19] mb-2 font-semibold tracking-wider">
                      <MdMessage className="mr-2 text-2xl" />
                      {contactMessage}
                    </label>
                    <textarea
                      className="rounded-lg p-4 border-2 border-[#2f0000]/30 focus:border-[#e80e19] focus:outline-none focus:ring-2 focus:ring-[#e80e19]/30 min-h-32 bg-[#f1f1ef] text-[#2f0000] text-lg"
                      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                      rows={5}
                      name="message"
                      value={mailMessage}
                      onChange={(e) => setMailMessage(e.target.value)}
                      required
                      placeholder="Vaša správa..."
                    ></textarea>
                  </div>

                  {/* GDPR Checkbox */}
                  <div className="flex items-start mt-6 space-x-3 relative">
                    <input
                      id="flexCheckDefault"
                      type="checkbox"
                      onChange={handleCheckBox}
                      required
                      className="w-6 h-6 rounded-md border-2 border-[#2f0000] focus:ring-[#e80e19] checked:bg-[#e80e19] accent-[#e80e19]"
                    />
                    <div>
                      <label
                        className="text-lg lg:text-xl cursor-pointer text-[#2f0000]"
                        htmlFor="flexCheckDefault"
                      >
                        {contactAgree}{' '}
                        <button
                          type="button"
                          className="text-[#e80e19] underline hover:text-[#2f0000] transition-colors font-semibold"
                          onClick={(e) => toggleShowGdpr(e)}
                        >
                          {contactGdpr}
                        </button>
                      </label>

                      {showGdpr && (
                        <div className="mt-3 p-4 bg-[#e80e19]/10 border-l-4 border-[#e80e19] rounded-md">
                          <p className="text-base lg:text-lg leading-relaxed text-[#2f0000]">
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
                    className="flex items-center justify-center gap-3 bg-[#e80e19] hover:bg-white hover:text-[#2f0000] hover:border-2 hover:border-[#2f0000] text-white py-4 px-8 rounded-lg mt-6 font-semibold text-lg lg:text-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    type="submit"
                    value="Send"
                  >
                    <MdSend className="text-2xl" />
                    {contactSend}
                  </button>
                </form>
              </div>
            </div>

            {/* Decorative Side Element */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="p-6 rounded-lg h-full bg-white border border-[#2f0000]/20" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
                <h3 className="text-2xl lg:text-4xl font-semibold text-[#e80e19] mb-6 tracking-wider">
                  Kontaktujte nás
                </h3>
                <p className="text-lg lg:text-xl mb-6 text-[#2f0000] leading-relaxed">
                  Máte otázky alebo chcete získať viac informácií? Neváhajte nás kontaktovať
                  prostredníctvom tohto formulára.
                </p>
                <p className="text-lg lg:text-xl mb-6 text-[#2f0000] leading-relaxed">
                  Radi zodpovieme vaše otázky a poskytneme vám všetky potrebné informácie.
                </p>
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MdEmail className="text-2xl text-[#e80e19]" />
                    <span className="text-lg lg:text-xl text-[#2f0000]">info@bow4bass.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdPhone className="text-2xl text-[#e80e19]" />
                    <span className="text-lg lg:text-xl text-[#2f0000]">+421 905 338 081</span>
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

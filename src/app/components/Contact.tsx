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
      en: 'Message from JP Bows',

      sk: 'Správa od JP Bows',
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
      <div className="footer-gradient scroll-mt-14" id="contact">
        <div className="px-6 py-16 text-white lg:px-[15%]">
          {/* Section Header with decorative elements */}
          <div className="relative mb-12">
            <h1 className="text-center text-3xl md:text-4xl font-bold text-amber-200 tracking-wide">
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
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm shadow-lg">
                <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
                  {/* Personal Information Fields */}
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <label className="flex items-center text-lg text-amber-200 mb-2 font-medium">
                        <MdPerson className="mr-2 text-xl" />
                        {contactName}
                      </label>
                      <input
                        className="rounded-lg p-3 bg-white/5 border border-amber-700 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300 text-white"
                        type="text"
                        name="user_name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Vaše meno"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="flex items-center text-lg text-amber-200 mb-2 font-medium">
                        <MdEmail className="mr-2 text-xl" />
                        {contactEmail}
                      </label>
                      <input
                        className="rounded-lg p-3 bg-white/5 border border-amber-700 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300 text-white"
                        type="email"
                        name="user_email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="vas@email.com"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="flex items-center text-lg text-amber-200 mb-2 font-medium">
                        <MdPhone className="mr-2 text-xl" />
                        {contactPhone}
                      </label>
                      <input
                        className="rounded-lg p-3 bg-white/5 border border-amber-700 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300 text-white"
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
                    <label className="flex items-center text-lg text-amber-200 mb-2 font-medium">
                      <MdMessage className="mr-2 text-xl" />
                      {contactMessage}
                    </label>
                    <textarea
                      className="rounded-lg p-3 bg-white/5 border border-amber-700 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300 text-white min-h-32"
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
                      className="w-5 h-5 mt-1 rounded-md border-2 border-amber-600 focus:ring-amber-300 checked:bg-amber-600"
                    />
                    <div>
                      <label className="text-lg cursor-pointer" htmlFor="flexCheckDefault">
                        {contactAgree}{' '}
                        <button
                          type="button"
                          className="text-amber-300 underline hover:text-amber-200 transition-colors"
                          onClick={(e) => toggleShowGdpr(e)}
                        >
                          {contactGdpr}
                        </button>
                      </label>

                      {showGdpr && (
                        <div className="mt-3 p-4 bg-amber-900/40 border-l-4 border-amber-300 rounded-md">
                          <p className="text-base leading-relaxed">{contactGdpr1}</p>
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
                    className="flex items-center justify-center gap-2 button-color hover:bg-amber-600 text-white py-3 px-6 rounded-lg mt-6 font-medium transition-all duration-300 border border-amber-600 hover:border-amber-300"
                    type="submit"
                    value="Send"
                  >
                    <MdSend className="text-xl" />
                    {contactSend}
                  </button>
                </form>
              </div>
            </div>

            {/* Decorative Side Element */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="bg-amber-900/40 p-6 rounded-lg  h-full">
                <h3 className="text-2xl font-semibold text-amber-200 mb-4">Kontaktujte nás</h3>
                <p className="text-lg mb-4">
                  Máte otázky alebo chcete získať viac informácií? Neváhajte nás kontaktovať
                  prostredníctvom tohto formulára.
                </p>
                <p className="text-lg mb-4">
                  Radi zodpovieme vaše otázky a poskytneme vám všetky potrebné informácie.
                </p>
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-4">
                    <MdEmail className="text-2xl text-amber-300" />
                    <span className="text-lg">xxx@xxx.sk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdPhone className="text-2xl text-amber-300" />
                    <span className="text-lg">+421 900 000 000 (meno)</span>
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

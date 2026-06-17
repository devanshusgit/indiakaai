import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setStatus('error')
    }
  }

  return (
    <div className="section-padding max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-6">Let's Build Something Together</h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl">
        Whether you're a broadcaster, distributor, co-production partner, or brand — we'd love to hear from you. Tell us
        about your project and we'll come back to you within 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <div className="bg-gray-900 p-8 rounded-lg mb-6">
            <p className="text-gray-500 text-sm mb-2">Email</p>
            <p className="text-xl font-semibold">admin@mugshotstudios.com</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg mb-6">
            <p className="text-gray-500 text-sm mb-2">Phone / WhatsApp</p>
            <p className="text-xl font-semibold">+91 9833979711</p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg">
            <p className="text-gray-500 text-sm mb-2">Location</p>
            <p className="text-lg font-semibold">112, Ijmima Complex, Off Link Road, Malad west. Mumbai, India</p>
          </div>

          <p className="text-gray-500 text-sm mt-8">Currently attending MIFA Annecy — June 2026</p>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-400 text-sm">Thank you! We'll be in touch within 24 hours.</p>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm">
                There was an error sending your message. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

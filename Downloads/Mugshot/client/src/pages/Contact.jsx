import { useState } from 'react'
import { ContactInfo, SocialLinks } from '@/components/ui/contact-info'

const contactDetails = [
  { icon: 'email', label: 'Email', value: 'admin@mugshotstudios.com', href: 'mailto:admin@mugshotstudios.com' },
  { icon: 'phone', label: 'Phone / WhatsApp', value: '+91 9833979711', href: 'tel:+919833979711' },
  { icon: 'location', label: 'Location', value: 'Unit 112, Ijmima Complex, Off Link Road, Malad West, Mumbai, India' },
]

const socialLinks = [
  { icon: 'youtube', label: 'YouTube', comingSoon: true },
  { icon: 'instagram', label: 'Instagram', comingSoon: true },
  { icon: 'linkedin', label: 'LinkedIn', comingSoon: true },
  { icon: 'whatsapp', href: 'https://wa.me/919833979711', label: 'WhatsApp' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(null), 5000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      {/* ── Header ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Get In Touch</p>
          <h1 className="page-title mb-4">Let's build something together</h1>
          <p className="body-text max-w-xl">
            Whether you're a broadcaster, distributor, co-production partner, or brand — we'd love to hear from you. Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">

          {/* Contact Info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="card flex flex-col gap-5">
              {contactDetails.map((item, i) => (
                <ContactInfo
                  key={i}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  href={item.href}
                />
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Follow us</p>
              <SocialLinks links={socialLinks} size="md" />
            </div>

            <div className="card" style={{ backgroundColor: 'var(--secondary)', borderColor: 'var(--secondary)' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--secondary-foreground)', opacity: 0.7 }}>
                Currently attending
              </p>
              <p className="font-semibold text-sm" style={{ color: 'var(--secondary-foreground)' }}>
                MIFA Annecy — June 2026
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="input-field resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-3 text-base"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="rounded-lg px-4 py-3 text-sm font-medium" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                  Thank you! We'll be in touch within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="rounded-lg px-4 py-3 text-sm font-medium" style={{ backgroundColor: 'rgba(229,77,46,0.15)', color: 'var(--destructive)' }}>
                  Something went wrong. Please email us directly at admin@mugshotstudios.com
                </div>
              )}
            </form>
          </div>

        </div>
      </section>
    </div>
  )
}

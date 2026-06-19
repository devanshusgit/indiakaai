import { useState } from 'react'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'
import { ContactCard } from '@/components/ui/contact-card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { SocialLinks } from '@/components/ui/contact-info'

const contactInfo = [
  { icon: MailIcon, label: 'Email', value: 'admin@mugshotstudios.com' },
  { icon: PhoneIcon, label: 'Phone / WhatsApp', value: '+91 9833979711' },
  { icon: MapPinIcon, label: 'Address', value: 'Malad West, Mumbai, India' },
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
    <div className="section-padding">
      <div className="max-w-5xl mx-auto">
        <ContactCard
          title="Let's build something together"
          description="Whether you're a broadcaster, distributor, co-production partner, or brand — tell us about your project and we'll get back to you within 24 hours."
          contactInfo={contactInfo}
        >
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} placeholder="Tell us about your project..." />
            </div>
            <Button className="w-full" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </Button>
            {status === 'success' && (
              <div className="rounded-md px-4 py-3 text-sm font-medium" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                Thank you! We'll be in touch within 24 hours.
              </div>
            )}
            {status === 'error' && (
              <div className="rounded-md px-4 py-3 text-sm font-medium" style={{ backgroundColor: 'rgba(229,77,46,0.15)', color: 'var(--destructive)' }}>
                Something went wrong. Please email us directly at admin@mugshotstudios.com
              </div>
            )}
          </form>
        </ContactCard>

        {/* Social + event note */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Follow us</p>
            <SocialLinks links={socialLinks} size="md" />
          </div>
          <div className="rounded-lg px-4 py-3" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ opacity: 0.7 }}>Currently attending</p>
            <p className="font-semibold text-sm">MIFA Annecy — June 2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}

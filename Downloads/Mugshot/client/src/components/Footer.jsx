import { ContactInfo, SocialLinks } from '@/components/ui/contact-info'

const socialLinks = [
  { icon: 'youtube', label: 'YouTube', comingSoon: true },
  { icon: 'instagram', label: 'Instagram', comingSoon: true },
  { icon: 'linkedin', label: 'LinkedIn', comingSoon: true },
  { icon: 'facebook', label: 'Facebook', comingSoon: true },
  { icon: 'twitter', label: 'X (Twitter)', comingSoon: true },
  { icon: 'whatsapp', href: 'https://wa.me/919833979711', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-lg text-foreground mb-2">MUGSHOT STUDIOS</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            AI animation production studio.<br />Mumbai, India.
          </p>
          <SocialLinks links={socialLinks} size="md" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-sm text-foreground">Contact</p>
          <ContactInfo icon="email" label="Email" value="admin@mugshotstudios.com" href="mailto:admin@mugshotstudios.com" />
          <ContactInfo icon="phone" label="Phone / WhatsApp" value="+91 9833979711" href="tel:+919833979711" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-semibold text-sm text-foreground">Location</p>
          <ContactInfo
            icon="location"
            label="Studio"
            value="Unit 112, IJMIMA Complex, Off Link Road, Malad West, Mumbai 400064, India"
          />
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">&copy; 2026 Mugshot Studios. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Currently at MIFA Annecy — June 2026</p>
      </div>
    </footer>
  )
}

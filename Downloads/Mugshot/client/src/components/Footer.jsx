export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-lg text-foreground mb-2">MUGSHOT STUDIOS</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI animation production studio.<br />Mumbai, India.
          </p>
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground mb-3">Contact</p>
          <p className="text-sm text-muted-foreground">admin@mugshotstudios.com</p>
          <p className="text-sm text-muted-foreground">+91 9833979711</p>
        </div>
        <div>
          <p className="font-semibold text-sm text-foreground mb-3">Location</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Unit 112, IJMIMA Complex,<br />Off Link Road, Malad West,<br />Mumbai 400064, India
          </p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-xs text-muted-foreground">&copy; 2026 Mugshot Studios. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Currently at MIFA Annecy — June 2026</p>
      </div>
    </footer>
  )
}

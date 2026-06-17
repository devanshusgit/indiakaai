export default function Navigation({ activeSection, setActiveSection }) {
  const sections = ['home', 'technology', 'works', 'about', 'contact']

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur border-b border-border" style={{ backgroundColor: 'color-mix(in srgb, var(--background) 85%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-2xl" style={{ color: 'var(--primary)' }}>Mugshot Studios</div>
        <div className="flex gap-8 text-sm">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className="capitalize font-medium transition-colors"
              style={{
                color: activeSection === section ? 'var(--primary)' : 'var(--muted-foreground)',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--foreground)'}
              onMouseLeave={e => e.target.style.color = activeSection === section ? 'var(--primary)' : 'var(--muted-foreground)'}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

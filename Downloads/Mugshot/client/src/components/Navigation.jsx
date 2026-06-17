export default function Navigation({ activeSection, setActiveSection }) {
  const sections = ['home', 'technology', 'works', 'about', 'contact']

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-2xl">Mugshot Studios</div>
        <div className="flex gap-8 text-sm">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`capitalize font-medium transition-colors ${
                activeSection === section ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

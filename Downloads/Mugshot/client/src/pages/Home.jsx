import Entropy from '../components/Entropy'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Entropy size={Math.min(window.innerWidth, 800)} />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">We don't make animation. We make YOUR animation.</h1>
          <p className="text-xl text-gray-300 mb-8">Mumbai-based animation studio combining creative direction with proprietary AI production technology. We build custom animation pipelines trained on your IP — your characters, your style, your world.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn-primary">See Our Work</button>
            <button className="btn-secondary">Explore Vartool</button>
            <button className="btn-secondary">Get in Touch</button>
          </div>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">🎬</div>
            <div className="text-gray-300">
              11-Minute Episode
              <br />
              <span className="text-sm">Delivered in 3 Days</span>
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">🔒</div>
            <div className="text-gray-300">
              100% Private
              <br />
              <span className="text-sm">Your data never touches a public AI system</span>
            </div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">🌍</div>
            <div className="text-gray-300">
              Active Projects
              <br />
              <span className="text-sm">Europe · Canada · UK · India</span>
            </div>
          </div>
        </div>
      </div>

      {/* What We Do */}
      <section className="section-padding max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">We Don't Make Generic Animation. We Make Yours.</h2>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
          Every studio can produce animation. What Mugshot Studios does differently is build a production system trained
          specifically on your IP — your characters, your visual language, your world. The output isn't approximate. It
          isn't AI-generic. It is animation that looks and feels exactly like your show.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mt-4">
          We work with broadcasters, distributors, independent producers, and brands who need high-quality animation
          produced consistently, quickly, and at a cost that makes ambitious series commercially viable.
        </p>
      </section>

      {/* Services */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎨',
                title: 'Custom Animation Production',
                desc: '2D and 3D animation for TV series, streaming platforms, YouTube, and digital content. Trained on your existing IP for complete visual consistency.',
              },
              {
                icon: '⚡',
                title: 'AI-Accelerated Pipeline',
                desc: 'Our proprietary Vartool system delivers broadcast-quality episodes faster than any traditional studio. Without compromising quality.',
              },
              {
                icon: '🎬',
                title: 'Live Action & Hybrid',
                desc: 'AI-assisted live action production for features, short films, and hybrid animation-live action formats.',
              },
            ].map((service, idx) => (
              <div key={idx} className="bg-black border border-gray-800 p-6 rounded-lg card-hover">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Original IP */}
      <section className="section-padding max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6">We Also Create Original Worlds</h2>
        <p className="text-gray-400 text-lg mb-10">
          Mugshot Studios develops original animated IP for the global market. Our debut slate features two original series being presented at MIFA Annecy 2026.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'THE FIXERS', desc: '26 x 11 minutes | 3D Animation | Ages 4–7', status: 'Currently in production' },
            {
              title: 'WONDER WORLD',
              desc: '26 x 11 minutes | 3D Animation | Ages 6–10',
              status: 'Currently in production',
            },
          ].map((ip, idx) => (
            <div key={idx} className="bg-gray-900 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-2">{ip.title}</h3>
              <p className="text-gray-400 mb-3">{ip.desc}</p>
              <p className="text-sm text-gray-500">{ip.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

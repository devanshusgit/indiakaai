import HoverPlayCard from '@/components/ui/hover-play-card'

const videoWorks = [
  {
    title: 'PINK',
    type: 'Showreel',
    desc: "A striking visual piece showcasing Mugshot Studios' animation style and production capability.",
    src: '/PINK.mp4',
  },
  {
    title: 'TOOPY & BINOO',
    type: 'Client Work',
    desc: 'Animation production sample showcasing character animation and style consistency.',
    src: '/Toopy-Binoo.mp4',
  },
  {
    title: 'SWAT KAT — Sample Trailer',
    type: 'Animation',
    desc: 'Trailer sample demonstrating high-energy action animation produced through the Vartool pipeline.',
    src: null,
  },
  {
    title: 'THE BEGINNING — Trailer',
    type: 'Original IP',
    desc: 'Official trailer for an original Mugshot Studios production currently in development.',
    src: null,
  },
]

const otherWorks = [
  {
    title: 'WONDER WORLD',
    type: 'Original IP',
    desc: 'A living magical amusement park island. Three children. One unforgettable villain. 52 x 11 minutes.',
  },
  {
    title: 'THE FIXERS',
    type: 'Original IP',
    desc: '26 x 11 minutes | 3D Animation | Ages 4–7. Currently in production.',
  },
  {
    title: 'OPAL PRODUCTION CONTRACT',
    type: 'Client Work',
    desc: 'Contracted animation production for Opal Production SRL, Romania. Delivering broadcast-quality episodes using Vartool.',
  },
  {
    title: 'CSIR-AMPRI DOCUMENTARIES',
    type: 'Documentary',
    desc: "Science communication series for India's premier materials research institute.",
  },
  {
    title: 'THE FOURTH WALL',
    type: 'Original IP',
    desc: 'A surreal thriller about characters trapped inside an AI-generated world. In development.',
  },
  {
    title: 'INS ANJDIP FILM',
    type: 'Documentary',
    desc: '6-minute commissioning documentary film for the Indian Navy.',
  },
]

function ComingSoonCard({ title, type, desc }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border flex flex-col" style={{ backgroundColor: 'var(--card)' }}>
      <div className="aspect-video flex flex-col items-center justify-center gap-3" style={{ backgroundColor: 'var(--muted)' }}>
        <div className="w-14 h-14 rounded-full flex items-center justify-center border border-border" style={{ backgroundColor: 'var(--background)' }}>
          <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--muted-foreground)' }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Video coming soon</p>
      </div>
      <div className="p-5 flex flex-col gap-1">
        {type && <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>{type}</div>}
        <h3 className="text-lg font-bold">{title}</h3>
        {desc && <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{desc}</p>}
      </div>
    </div>
  )
}

export default function Works() {
  return (
    <div className="section-padding max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Our Work</h1>
      <p className="text-xl mb-12" style={{ color: 'var(--muted-foreground)' }}>
        From original IP to contracted productions — here's what we build.
      </p>

      {/* Video Showcase */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Video Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoWorks.map((video, idx) =>
            video.src ? (
              <HoverPlayCard
                key={idx}
                src={video.src}
                title={video.title}
                type={video.type}
                desc={video.desc}
                loop={false}
              />
            ) : (
              <ComingSoonCard key={idx} title={video.title} type={video.type} desc={video.desc} />
            )
          )}
        </div>
      </div>

      {/* Other Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherWorks.map((work, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg card-hover border border-border"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <div className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>{work.type}</div>
              <h3 className="text-xl font-bold mb-3">{work.title}</h3>
              <p style={{ color: 'var(--muted-foreground)' }}>{work.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

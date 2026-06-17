import { useState, useRef } from 'react'

const videos = [
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
    youtubeUrl: null,
  },
  {
    title: 'THE BEGINNING — Trailer',
    type: 'Original IP',
    desc: 'Official trailer for an original Mugshot Studios production currently in development.',
    src: null,
    youtubeUrl: null,
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

function VideoCard({ video }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  // No local src — show a "coming soon" placeholder
  if (!video.src) {
    return (
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-16 h-16 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">Video coming soon</p>
          </div>
        </div>
        <div className="p-5">
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{video.type}</div>
          <h3 className="text-lg font-bold mb-2">{video.title}</h3>
          <p className="text-gray-400 text-sm">{video.desc}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 group">
      <div className="relative aspect-video bg-black cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.src}
          className="w-full h-full object-cover"
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        {playing && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{video.type}</div>
        <h3 className="text-lg font-bold mb-2">{video.title}</h3>
        <p className="text-gray-400 text-sm">{video.desc}</p>
      </div>
    </div>
  )
}

export default function Works() {
  return (
    <div className="section-padding max-w-7xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">Our Work</h1>
      <p className="text-xl text-gray-300 mb-12">From original IP to contracted productions — here's what we build.</p>

      {/* Video Showcase */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-200">Video Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, idx) => (
            <VideoCard key={idx} video={video} />
          ))}
        </div>
      </div>

      {/* Other Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-gray-200">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherWorks.map((work, idx) => (
            <div key={idx} className="bg-gray-900 p-6 rounded-lg card-hover border border-gray-800">
              <div className="text-sm text-gray-500 mb-2">{work.type}</div>
              <h3 className="text-xl font-bold mb-3">{work.title}</h3>
              <p className="text-gray-400">{work.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

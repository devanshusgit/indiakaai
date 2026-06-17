import { ShaderAnimation } from '../components/ShaderAnimation'

export default function About() {
  return (
    <div>
      {/* Hero with Shader Background */}
      <div className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <ShaderAnimation />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">We Are Mugshot Studios</h1>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto">

        {/* Studio Overview */}
        <div className="mb-16">
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Mugshot Studios is a Mumbai-based animation and content production studio incorporated in August 2024. In less
            than two years we have built active international partnerships across four continents, developed a proprietary
            AI production system that is unlike anything else in the animation industry, and created original IP now being
            presented at the world's most prestigious animation market.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
            We are not a traditional service studio. We are not a generic AI tool provider. We are a creative technology
            studio — where human storytelling and intelligent production systems work together to produce content that is
            faster, cheaper, and more faithful to each client's creative vision than anything a traditional pipeline can
            offer.
          </p>
        </div>

        {/* Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div>
            <h3 className="text-2xl font-bold mb-3">Vivek Shukla</h3>
            <p className="font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Founder & Director</p>
            <p style={{ color: 'var(--muted-foreground)' }}>
              Filmmaker, writer, and animation creator with a vision to make broadcast-quality animation accessible to
              producers worldwide through technology. Vivek leads Mugshot Studios' creative direction, international
              partnerships, and the ongoing development of the Vartool production system.
            </p>
          </div>

          {/* Jeet's Card */}
          <div className="rounded-xl overflow-hidden border border-border" style={{ backgroundColor: 'var(--card)' }}>
            <div className="w-full h-64 flex items-center justify-center" style={{ backgroundColor: 'var(--muted)' }}>
              <div className="text-center" style={{ color: 'var(--muted-foreground)' }}>
                <div className="text-5xl mb-2">📷</div>
                <p className="text-sm">Jeet's Photo</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1">Jeet</h3>
              <p className="font-semibold mb-4" style={{ color: 'var(--muted-foreground)' }}>Creative Director / Writer</p>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted-foreground)' }}>
                Jeet comes from a theatre background and has been actively working in the creative industry since 2009.
                Over the years, he has worked as a screenwriter for leading platforms and channels including Sony TV,
                Disney+ Hotstar, Zee TV, and Sun TV.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                He has also served as Creative Head for multiple content production houses, leading projects from concept
                to execution. Along with television and digital content, he brings strong experience in animation writing
                as well. Creating, developing, and executing engaging content across formats is his core strength.
              </p>
            </div>
          </div>
        </div>

        {/* Rest of Team */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Team</h3>
          <div className="space-y-4" style={{ color: 'var(--muted-foreground)' }}>
            <div>
              <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Samrat Dixit — Production Head</p>
              <p className="text-sm">
                4+ years across animation, live action, and brand films. Heads AI-assisted animation and live action production.
              </p>
            </div>
            <div>
              <p className="font-semibold" style={{ color: 'var(--foreground)' }}>Manav Mishra — CTO</p>
              <p className="text-sm">
                Leads technology vision, building AI-driven creative tools and scalable production platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-12 border-t border-border">
          <p style={{ color: 'var(--muted-foreground)' }}>📍 Unit 112, IJMIMA Complex, Off Link Road, Malad West, Mumbai 400064, India</p>
        </div>
      </div>
    </div>
  )
}

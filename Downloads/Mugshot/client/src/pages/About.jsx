import { ShaderAnimation } from '../components/ShaderAnimation'
import { GlowCard } from '@/components/ui/glow-card'
import { IconButton } from '@/components/ui/icon'

// TODO: replace the placeholder LinkedIn URLs with each person's real profile.
const team = [
  {
    name: 'Jeet',
    role: 'Creative Director / Writer',
    bio: 'Theatre-rooted screenwriter and Creative Head working since 2009 across Sony TV, Disney+ Hotstar, Zee TV, and Sun TV, with strong experience in animation writing.',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Samrat Dixit',
    role: 'Production Head',
    bio: '4+ years across animation, live action, and brand films. Heads AI-assisted animation and live action production.',
    linkedin: 'https://www.linkedin.com/',
  },
  {
    name: 'Manav Mishra',
    role: 'CTO',
    bio: 'Leads technology vision, building AI-driven creative tools and scalable production platforms.',
    linkedin: 'https://www.linkedin.com/',
  },
]

// TODO: replace with real profile URLs once available.
const leadershipLinkedIn = {
  vivek: 'https://www.linkedin.com/',
  jeet: 'https://www.linkedin.com/',
}

export default function About() {
  return (
    <div>
      {/* ── Hero with Shader ── */}
      <div className="relative h-56 md:h-72 flex items-center justify-center overflow-hidden border-b border-border">
        <ShaderAnimation />
        <div className="relative z-10 text-center px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">About Us</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">We Are Mugshot Studios</h1>
        </div>
      </div>

      {/* ── Studio Overview ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-7xl mx-auto max-w-3xl">
          <p className="section-label mb-4">Our Story</p>
          <p className="body-text mb-5">
            Mugshot Studios is a Mumbai-based animation and content production studio incorporated in August 2024. In less than two years we have built active international partnerships across four continents, developed a proprietary AI production system unlike anything else in the animation industry, and created original IP now being presented at the world's most prestigious animation market.
          </p>
          <p className="body-text">
            We are not a traditional service studio. We are not a generic AI tool provider. We are a creative technology studio — where human storytelling and intelligent production systems work together to produce content that is faster, cheaper, and more faithful to each client's creative vision than anything a traditional pipeline can offer.
          </p>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="section-padding border-b border-border" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Leadership</p>
          <h2 className="section-title mb-10">The people behind the studio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Vivek */}
            <div className="card flex flex-col">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-5" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                V
              </div>
              <h3 className="text-xl font-bold mb-1">Vivek Shukla</h3>
              <p className="text-sm font-medium mb-4" style={{ color: 'var(--primary)' }}>Founder & Director</p>
              <p className="body-text text-sm mb-5">
                Filmmaker, writer, and animation creator with a vision to make broadcast-quality animation accessible to producers worldwide through technology. Vivek leads Mugshot Studios' creative direction, international partnerships, and the ongoing development of the Vartool production system.
              </p>
              <div className="mt-auto">
                <IconButton icon="linkedin" href={leadershipLinkedIn.vivek} label="Vivek Shukla on LinkedIn" iconOnly variant="social" external />
              </div>
            </div>

            {/* Jeet */}
            <div className="card overflow-hidden p-0 flex flex-col">
              <div className="w-full h-52 flex items-center justify-center" style={{ backgroundColor: 'var(--muted)' }}>
                <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>Photo coming soon</p>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-1">Jeet</h3>
                <p className="text-sm font-medium mb-4" style={{ color: 'var(--primary)' }}>Creative Director / Writer</p>
                <p className="body-text text-sm mb-3">
                  Jeet comes from a theatre background and has been actively working in the creative industry since 2009. Over the years, he has worked as a screenwriter for leading platforms including Sony TV, Disney+ Hotstar, Zee TV, and Sun TV.
                </p>
                <p className="body-text text-sm mb-5">
                  He has also served as Creative Head for multiple content production houses, leading projects from concept to execution. Along with television and digital content, he brings strong experience in animation writing. Creating, developing, and executing engaging content across formats is his core strength.
                </p>
                <div className="mt-auto">
                  <IconButton icon="linkedin" href={leadershipLinkedIn.jeet} label="Jeet on LinkedIn" iconOnly variant="social" external />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-padding border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="section-label mb-4">Team</p>
          <h2 className="section-title mb-8">Core team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <GlowCard key={i} glowColor="orange" customSize className="w-full min-h-[230px]">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-xs font-medium mb-3" style={{ color: 'var(--primary)' }}>{member.role}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)', opacity: 0.82 }}>{member.bio}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>Connect</span>
                  <IconButton
                    icon="linkedin"
                    href={member.linkedin}
                    label={`${member.name} on LinkedIn`}
                    iconOnly
                    variant="social"
                    external
                  />
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Address ── */}
      <section className="py-10 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Studio</p>
          <p className="text-sm text-muted-foreground">Unit 112, IJMIMA Complex, Off Link Road, Malad West, Mumbai 400064, India</p>
        </div>
      </section>
    </div>
  )
}

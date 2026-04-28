interface Props { toolCount: number; }

export default function Hero({ toolCount }: Props) {
  return (
    <section className="relative overflow-hidden border-b-2 border-oat-border">
      {/* Dot pattern background */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-clay-cream via-clay-cream/90 to-clay-cream pointer-events-none" />

      <div className="relative max-w-[900px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">

        {/* Top badge */}
        <div className="hero-animate inline-flex items-center gap-2 mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 bg-lemon-400/30 border-2 border-lemon-700 border-dashed rounded-xl px-4 py-2 text-[0.75rem] font-bold text-lemon-800 tracking-widest uppercase">
            🇮🇳 India&apos;s #1 AI Tools Directory
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-animate-1 font-bebas leading-[0.95] tracking-[-0.01em] mb-5 sm:mb-6">
          <span className="block text-[3.4rem] sm:text-[5.5rem] lg:text-[7rem] text-saffron drop-shadow-sm">
            Find the Perfect
          </span>
          <span className="block text-[3.4rem] sm:text-[5.5rem] lg:text-[7rem] text-matcha-600 drop-shadow-sm">
            AI Tool for You
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-animate-2 text-warm-charcoal text-[1rem] sm:text-[1.15rem] max-w-[480px] mx-auto mb-10 sm:mb-12 leading-[1.65]">
          Discover <strong className="text-clay-black">{toolCount}+</strong> hand-picked AI tools sorted by category —
          free to browse, no sign-up needed.
        </p>

        {/* Stats */}
        <div className="hero-animate-3 flex items-center justify-center gap-3 sm:gap-5 flex-wrap">
          {[
            { value: `${toolCount}+`, label: 'AI Tools', bg: 'bg-lemon-400/25', border: 'border-lemon-700', text: 'text-lemon-800' },
            { value: '12',           label: 'Categories', bg: 'bg-slushie-500/15', border: 'border-slushie-800', text: 'text-slushie-800' },
            { value: 'Free',         label: 'to Browse',  bg: 'bg-matcha-300/25', border: 'border-matcha-600', text: 'text-matcha-800' },
          ].map(s => (
            <div key={s.label} className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 ${s.bg} border-2 ${s.border} border-dashed rounded-xl`}>
              <span className={`font-bold text-clay-black text-[1rem] sm:text-[1.1rem] font-outfit`}>{s.value}</span>
              <span className={`${s.text} text-[0.82rem] sm:text-[0.88rem] font-medium`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

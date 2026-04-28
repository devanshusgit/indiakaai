interface Props { toolCount: number; }

export default function Hero({ toolCount }: Props) {
  return (
    <section className="bg-clay-cream py-14 sm:py-20 px-4 sm:px-6 text-center relative border-b-2 border-oat-border">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-ube-300/20 border-2 border-ube-800 border-dashed rounded-xl px-3 sm:px-4 py-2 text-[0.7rem] sm:text-[0.75rem] font-bold text-ube-900 mb-4 sm:mb-6 tracking-[0.04em] uppercase">
        India's #1 AI Tools Directory
      </div>

      {/* Heading */}
      <h1 className="font-bebas text-[2.8rem] sm:text-[4.5rem] lg:text-[5.5rem] font-semibold leading-[1.05] tracking-[-0.04em] mb-3 sm:mb-4">
        <span className="text-saffron">Find the Perfect</span>
        <br />
        <span className="text-matcha-600">AI Tool for You</span>
      </h1>

      {/* Subtitle */}
      <p className="text-warm-charcoal text-[1rem] sm:text-[1.1rem] max-w-[320px] sm:max-w-[520px] mx-auto mb-8 sm:mb-10 leading-[1.5] sm:leading-[1.6] px-2 sm:px-0">
        Discover {toolCount}+ hand-picked AI tools sorted by category.
        <br className="hidden sm:block" />
        Save time, work smarter, grow faster.
      </p>

      {/* Stats */}
      <div className="flex items-center justify-center gap-3 sm:gap-8 flex-wrap">
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-lemon-400/30 border-2 border-lemon-700 border-dashed rounded-lg sm:rounded-xl">
          <span className="font-bold text-clay-black text-[0.95rem] sm:text-[1.1rem]">{toolCount}+</span>
          <span className="text-warm-charcoal text-[0.8rem] sm:text-[0.9rem] font-medium">AI Tools</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-slushie-500/20 border-2 border-slushie-800 border-dashed rounded-lg sm:rounded-xl">
          <span className="font-bold text-clay-black text-[0.95rem] sm:text-[1.1rem]">12</span>
          <span className="text-warm-charcoal text-[0.8rem] sm:text-[0.9rem] font-medium">Categories</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-matcha-300/30 border-2 border-matcha-600 border-dashed rounded-lg sm:rounded-xl">
          <span className="font-bold text-clay-black text-[0.95rem] sm:text-[1.1rem]">Free</span>
          <span className="text-warm-charcoal text-[0.8rem] sm:text-[0.9rem] font-medium">to Browse</span>
        </div>
      </div>
    </section>
  );
}

'use client';

interface Props { onGetInTouch: () => void; }

const PLANS = [
  {
    name: 'Starter',
    price: '₹2,999',
    period: '/month',
    desc: 'Perfect for indie devs & small tools',
    color: 'border-matcha-600',
    badge: 'bg-matcha-300/20 text-matcha-800',
    features: ['Featured in 1 category', 'Tool badge + logo', 'Basic analytics', '30-day listing'],
  },
  {
    name: 'Growth',
    price: '₹7,999',
    period: '/month',
    desc: 'Best for growing AI startups',
    color: 'border-saffron',
    badge: 'bg-lemon-400/20 text-lemon-800',
    highlight: true,
    features: ['Featured in 3 categories', 'Homepage spotlight', 'Priority review', 'Social media mention', '90-day listing'],
  },
  {
    name: 'Enterprise',
    price: '₹19,999',
    period: '/month',
    desc: 'Maximum visibility for scale-ups',
    color: 'border-ube-800',
    badge: 'bg-ube-300/20 text-ube-900',
    features: ['Featured in all categories', 'Hero banner placement', 'Dedicated blog post', 'Newsletter feature', 'Quarterly review call'],
  },
];

export default function AdvertiseSection({ onGetInTouch }: Props) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="font-bebas text-[2.2rem] text-clay-black mb-2">Advertise with IndiaKaAI</h2>
        <p className="text-warm-charcoal text-[0.95rem] leading-[1.7] max-w-[600px] mx-auto">
          Reach 50,000+ Indian AI enthusiasts, developers and businesses. Get your tool in front of the right audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {PLANS.map(plan => (
          <div
            key={plan.name}
            className={`bg-clay-white border-2 ${plan.color} rounded-[20px] p-6 shadow-clay relative ${plan.highlight ? '-translate-y-1 shadow-[_-4px_4px_0_rgb(0,0,0)]' : ''}`}
          >
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-saffron text-clay-black text-[0.7rem] font-bold px-3 py-0.5 rounded-full border-2 border-clay-black">
                MOST POPULAR
              </span>
            )}
            <span className={`inline-block text-[0.7rem] font-semibold px-2 py-0.5 rounded-md border-2 mb-4 uppercase tracking-wide ${plan.badge} border-current`}>
              {plan.name}
            </span>
            <div className="mb-1">
              <span className="font-bebas text-[2.4rem] text-clay-black leading-none">{plan.price}</span>
              <span className="text-warm-charcoal text-[0.85rem]">{plan.period}</span>
            </div>
            <p className="text-warm-charcoal text-[0.82rem] mb-5">{plan.desc}</p>
            <ul className="space-y-2 mb-6">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-[0.85rem] text-clay-black">
                  <span className="text-matcha-600 font-bold">✓</span> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={onGetInTouch}
              className="clay-btn w-full bg-clay-black text-clay-white border-none rounded-xl py-3 font-bold text-[0.9rem] cursor-pointer"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slushie-500/10 border-2 border-slushie-800 rounded-[20px] p-6 sm:p-8 text-center">
        <h3 className="font-bebas text-[1.6rem] text-clay-black mb-2">Need a Custom Package?</h3>
        <p className="text-warm-charcoal text-[0.92rem] mb-5">
          We offer custom partnerships, sponsored blog posts, newsletter integrations, and more. Let's talk.
        </p>
        <button
          onClick={onGetInTouch}
          className="clay-btn bg-matcha-600 text-white border-none rounded-xl py-3 px-8 font-bold text-[0.95rem] cursor-pointer"
        >
          Get In Touch →
        </button>
      </div>
    </div>
  );
}

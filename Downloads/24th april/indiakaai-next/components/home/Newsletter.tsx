'use client';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  function subscribe() {
    if (!email.includes('@')) return;
    setDone(true);
    setEmail('');
  }

  return (
    <section className="border-t-2 border-oat-border bg-oat-light">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
        <span className="inline-block text-[0.68rem] font-bold text-matcha-800 uppercase tracking-widest mb-4 bg-matcha-300/25 border-2 border-matcha-600 border-dashed rounded-full px-3 py-1">
          📬 Weekly Newsletter
        </span>
        <h2 className="font-bebas text-[2rem] sm:text-[2.8rem] text-clay-black mb-3 leading-none tracking-[-0.01em]">
          New AI Tools Every Week
        </h2>
        <p className="text-warm-charcoal text-[0.92rem] sm:text-[0.98rem] mb-8 leading-relaxed">
          Get the best AI tools for India delivered to your inbox.
          <br className="hidden sm:block" />
          No spam — unsubscribe anytime.
        </p>

        {done ? (
          <div className="inline-flex items-center gap-2 bg-matcha-300/20 border-2 border-matcha-600 rounded-2xl px-6 py-4 text-matcha-800 font-semibold">
            ✅ You&apos;re on the list! See you Monday.
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && subscribe()}
              placeholder="your@email.com"
              className="flex-1 bg-white border-2 border-oat-border rounded-xl px-4 py-3 text-[0.9rem] text-clay-black outline-none placeholder:text-warm-silver focus:border-clay-black transition-all"
            />
            <button onClick={subscribe}
              className="clay-btn bg-clay-black text-white border-2 border-clay-black rounded-xl px-6 py-3 font-bold text-[0.88rem] cursor-pointer flex-shrink-0">
              Subscribe →
            </button>
          </div>
        )}
        <p className="text-warm-silver text-[0.72rem] mt-4">Weekly AI tool updates · No spam ever · Free</p>
      </div>
    </section>
  );
}

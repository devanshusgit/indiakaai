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
    <section className="bg-matcha-800 border-t-2 border-b-2 border-matcha-600 py-12 sm:py-16 px-4 sm:px-6 text-center">
      <h2 className="font-bebas text-[2.2rem] sm:text-[3rem] tracking-[-0.02em] text-white mb-2 sm:mb-3">
        Stay Ahead with Weekly AI News
      </h2>
      <p className="text-matcha-300 mb-6 sm:mb-8 text-[0.9rem] sm:text-[1rem] max-w-[320px] sm:max-w-[500px] mx-auto">
        Get the best new AI tools, tips &amp; exclusive deals delivered every Monday — free.
      </p>
      {done ? (
        <div className="inline-block bg-matcha-600 text-white px-6 py-3 rounded-xl font-semibold">
          🎉 Subscribed! See you Monday.
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row max-w-[340px] sm:max-w-[480px] mx-auto gap-3 sm:gap-0 bg-clay-white border-2 border-matcha-600 rounded-2xl sm:rounded-[24px] overflow-hidden shadow-clay">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && subscribe()}
            placeholder="Enter your email…"
            className="flex-1 bg-transparent border-none py-3 sm:py-3.5 px-4 sm:px-5 text-clay-black text-[0.9rem] outline-none placeholder:text-warm-silver"
          />
          <button
            onClick={subscribe}
            className="clay-btn bg-lemon-500 border-none py-3 px-4 sm:px-6 text-clay-black font-bold cursor-pointer text-[0.85rem] sm:text-[0.9rem] whitespace-nowrap rounded-xl sm:rounded-none"
          >
            Subscribe Free
          </button>
        </div>
      )}
      <div className="text-[0.75rem] sm:text-[0.8rem] text-matcha-300 mt-3 sm:mt-4">
        Get weekly AI tool updates · No spam ever
      </div>
    </section>
  );
}

'use client';
import { useState } from 'react';
import { sendEmail } from '@/lib/emailjs';
import Toast from '@/components/ui/Toast';

export default function GetInTouchForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(fd) as Record<string, string>;
    setLoading(true);
    try {
      await sendEmail('contact', {
        name: d.from_name,
        email: d.reply_to,
        title: `Partnership Inquiry: ${d.company}`,
        message: `Company: ${d.company}\nWebsite: ${d.website}\nType: ${d.partnership_type}\nBudget: ${d.budget}\n\n${d.message}`,
      });
      setToast('🤝 Thanks! Our partnerships team will reach out within 24 hours.');
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setToast(err instanceof Error ? err.message : '❌ Failed. Please try again.');
    } finally { setLoading(false); }
  }

  const inp = 'w-full bg-clay-white border-2 border-oat-border rounded-lg py-3 px-4 text-clay-black text-[0.95rem] outline-none transition-all placeholder:text-warm-silver focus:border-matcha-600';
  const lbl = 'block text-[0.8rem] font-semibold text-warm-charcoal mb-2 uppercase tracking-[0.04em]';

  return (
    <>
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="bg-clay-white border-2 border-oat-border rounded-[24px] p-5 sm:p-10 shadow-clay">
        <h2 className="font-bebas text-[2.2rem] mb-2 text-clay-black">Get In Touch</h2>
        <p className="text-warm-charcoal mb-8 text-[0.95rem] leading-[1.7]">
          Tell us about your company and what kind of partnership you're looking for.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Your Name</label><input name="from_name" placeholder="Rahul Sharma" required className={inp} /></div>
            <div><label className={lbl}>Contact Email</label><input name="reply_to" type="email" placeholder="rahul@company.com" required className={inp} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Company Name</label><input name="company" placeholder="Your company" required className={inp} /></div>
            <div><label className={lbl}>Website</label><input name="website" type="url" placeholder="https://yourcompany.com" className={inp} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Partnership Type</label>
              <select name="partnership_type" className={inp}>
                <option>Sponsored Listing</option>
                <option>Banner Advertising</option>
                <option>Sponsored Blog Post</option>
                <option>Newsletter Feature</option>
                <option>Custom / Other</option>
              </select>
            </div>
            <div>
              <label className={lbl}>Monthly Budget</label>
              <select name="budget" className={inp}>
                <option>Under ₹5,000</option>
                <option>₹5,000 – ₹15,000</option>
                <option>₹15,000 – ₹50,000</option>
                <option>₹50,000+</option>
              </select>
            </div>
          </div>
          <div>
            <label className={lbl}>Tell Us More</label>
            <textarea name="message" placeholder="What are your goals? Who is your target audience?" required className={`${inp} resize-y min-h-[120px]`} />
          </div>
          <button type="submit" disabled={loading} className="clay-btn w-full bg-matcha-600 text-white border-none rounded-xl py-4 font-bold text-[1rem] cursor-pointer disabled:opacity-60">
            {loading ? 'Sending…' : 'Send Partnership Inquiry'}
          </button>
        </form>
      </div>
    </>
  );
}

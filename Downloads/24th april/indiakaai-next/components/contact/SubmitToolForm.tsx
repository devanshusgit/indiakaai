'use client';
import { useState } from 'react';
import { sendEmail } from '@/lib/emailjs';
import Toast from '@/components/ui/Toast';

export default function SubmitToolForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const d = Object.fromEntries(fd) as Record<string, string>;
    setLoading(true);
    try {
      await sendEmail('tool', {
        name: d.from_name, email: d.reply_to,
        title: `New Tool: ${d.tool_name}`,
        message: `Tool: ${d.tool_name}\nURL: ${d.tool_url}\nCategory: ${d.tool_category}\nPricing: ${d.tool_pricing}\nDesc: ${d.tool_short_desc}\n\n${d.message}`,
      });
      setToast('🎉 Tool submitted! We\'ll review within 48 hours.');
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
        <h2 className="font-bebas text-[2.2rem] mb-2 text-clay-black">Submit Your AI Tool</h2>
        <p className="text-warm-charcoal mb-8 text-[0.95rem] leading-[1.7]">Listing is free for indie developers! We'll review within 48 hours.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Tool Name</label><input name="tool_name" placeholder="e.g. SuperWriteAI" required className={inp} /></div>
            <div><label className={lbl}>Website URL</label><input name="tool_url" type="url" placeholder="https://yourtool.com" required className={inp} /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Category</label>
              <select name="tool_category" className={inp}>
                {['Writing','Image','Video','Audio','Coding','Productivity','Research','Marketing','Chatbot','Data','Design','Finance'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Pricing</label>
              <select name="tool_pricing" className={inp}>
                <option>Free</option><option>Freemium</option><option>Paid</option>
              </select>
            </div>
          </div>
          <div><label className={lbl}>Short Description (max 150 chars)</label><input name="tool_short_desc" maxLength={150} placeholder="What does your AI tool do?" required className={inp} /></div>
          <div><label className={lbl}>Detailed Description</label><textarea name="message" placeholder="Features, use cases, target users…" required className={`${inp} resize-y min-h-[120px]`} /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Your Name</label><input name="from_name" placeholder="Founder name" required className={inp} /></div>
            <div><label className={lbl}>Contact Email</label><input name="reply_to" type="email" placeholder="you@company.com" required className={inp} /></div>
          </div>
          <button type="submit" disabled={loading} className="clay-btn w-full bg-matcha-600 text-white border-none rounded-xl py-4 font-bold text-[1rem] cursor-pointer disabled:opacity-60">
            {loading ? 'Submitting…' : 'Submit Tool for Review'}
          </button>
        </form>
      </div>
    </>
  );
}

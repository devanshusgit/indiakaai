'use client';
import { useState } from 'react';
import { sendEmail } from '@/lib/emailjs';
import Toast from '@/components/ui/Toast';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd) as Record<string, string>;
    setLoading(true);
    try {
      await sendEmail('contact', { name: data.from_name, email: data.reply_to, title: data.subject, message: data.message });
      setToast('✅ Message sent! We\'ll reply within 24 hours.');
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setToast(err instanceof Error ? err.message : '❌ Failed to send. Please try again.');
    } finally { setLoading(false); }
  }

  const inputCls = 'w-full bg-clay-white border-2 border-oat-border rounded-lg py-3 px-4 text-clay-black text-[0.95rem] outline-none transition-all placeholder:text-warm-silver focus:border-matcha-600 focus:ring-2 focus:ring-matcha-300/30';
  const labelCls = 'block text-[0.8rem] font-semibold text-warm-charcoal mb-2 uppercase tracking-[0.04em]';

  return (
    <>
      {toast && <Toast message={toast} onDone={() => setToast('')} />}
      <div className="bg-clay-white border-2 border-oat-border rounded-[24px] p-5 sm:p-10 shadow-clay">
        <h2 className="font-bebas text-[2.2rem] mb-2 text-clay-black">Send us a Message</h2>
        <p className="text-warm-charcoal mb-8 text-[0.95rem] leading-[1.7]">Have a question, suggestion or feedback? We'd love to hear from you.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={labelCls}>Your Name</label><input name="from_name" type="text" placeholder="Rahul Sharma" required autoComplete="name" className={inputCls} /></div>
            <div><label className={labelCls}>Email Address</label><input name="reply_to" type="email" placeholder="rahul@example.com" required autoComplete="email" className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Subject</label><input name="subject" type="text" placeholder="How can we help?" required className={inputCls} /></div>
          <div><label className={labelCls}>Message</label><textarea name="message" placeholder="Write your message here…" required className={`${inputCls} resize-y min-h-[140px]`} /></div>
          <button type="submit" disabled={loading} className="clay-btn w-full bg-matcha-600 text-white border-none rounded-xl py-4 px-8 font-bold text-[1rem] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  );
}

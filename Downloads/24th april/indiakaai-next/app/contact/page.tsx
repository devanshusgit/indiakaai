'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ContactForm from '@/components/contact/ContactForm';
import SubmitToolForm from '@/components/contact/SubmitToolForm';
import AdvertiseSection from '@/components/contact/AdvertiseSection';
import GetInTouchForm from '@/components/contact/GetInTouchForm';

type Tab = 'contactus' | 'submit' | 'advertise' | 'getintouch';

const TABS: { id: Tab; label: string }[] = [
  { id: 'contactus', label: '✉ Contact Us' },
  { id: 'submit', label: '🛠 Submit a Tool' },
  { id: 'advertise', label: '📢 Advertise' },
  { id: 'getintouch', label: '🤝 Get In Touch' },
];

export default function ContactPage() {
  const [active, setActive] = useState<Tab>('contactus');

  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        {/* Hero */}
        <div className="bg-slushie-500/20 border-b-2 border-slushie-800 py-10 sm:py-16 px-4 sm:px-6 text-center">
          <h1 className="font-bebas text-[2.2rem] sm:text-[3.5rem] tracking-[-0.02em] text-clay-black mb-3">
            Contact <span className="text-saffron">India</span> Ka <span className="text-matcha-600">AI</span>
          </h1>
          <p className="text-warm-charcoal text-[1rem] mb-6">We're here to help — reach out anytime</p>
          <div className="flex gap-2 flex-wrap justify-center">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-4 py-1.5 text-[0.8rem] font-medium rounded-xl border-2 cursor-pointer transition-all duration-200 ${active === t.id ? 'bg-clay-white border-matcha-600 text-clay-black font-semibold -rotate-1 -translate-y-0.5' : 'bg-clay-white border-oat-border text-warm-charcoal hover:border-matcha-600 hover:-rotate-1 hover:-translate-y-0.5'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[900px] mx-auto my-8 sm:my-12 px-4 sm:px-6 pb-16 sm:pb-20">
          {active === 'contactus'  && <ContactForm />}
          {active === 'submit'     && <SubmitToolForm />}
          {active === 'advertise'  && <AdvertiseSection onGetInTouch={() => setActive('getintouch')} />}
          {active === 'getintouch' && <GetInTouchForm />}
        </div>
      </main>
    </>
  );
}

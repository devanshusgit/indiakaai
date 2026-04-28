'use client';
import { useEffect, useState } from 'react';

interface Props { message: string; onDone: () => void; }

export default function Toast({ message, onDone }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); setTimeout(onDone, 300); }, 3500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className={`fixed bottom-6 right-6 z-[9999] bg-[#1a1f2e] border-2 border-saffron rounded-xl py-3.5 px-5 text-white text-[0.9rem] font-semibold pointer-events-none transition-all duration-300 ${visible ? 'opacity-100 toast-enter' : 'opacity-0 toast-exit'}`}>
      {message}
    </div>
  );
}

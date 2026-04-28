'use client';
import Link from 'next/link';
import { X, Search } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  user: { email: string; name: string } | null;
  isAdmin: boolean;
  onSignOut: () => void;
  onSearch: (q: string) => void;
}

export default function MobileMenu({ open, onClose, user, isAdmin, onSignOut, onSearch }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { label: '🏠 Home', href: '/' },
    { label: '📝 Blog', href: '/blog' },
    { label: '📬 Contact', href: '/contact' },
    { label: '🛠 Submit Tool', href: '/contact?tab=submit' },
    { label: '📢 Advertise', href: '/contact?tab=advertise' },
  ];

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-[280px] sm:w-80 bg-clay-white border-l-2 border-oat-border z-50 shadow-2xl flex flex-col md:hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-oat-border">
          <span className="font-bebas text-[1.2rem]">
            <span className="text-saffron">India</span><span className="text-matcha-600">KaAI</span>
          </span>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-oat-light transition-colors">
            <X className="w-5 h-5 text-warm-charcoal" />
          </button>
        </div>

        <div className="p-4 border-b border-oat-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-silver w-4 h-4" />
            <input
              type="text"
              placeholder="Search AI tools…"
              onChange={e => onSearch(e.target.value)}
              className="w-full bg-oat-light border-2 border-oat-border rounded-xl py-2.5 px-4 pl-10 text-clay-black text-sm outline-none focus:border-matcha-600"
            />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="flex items-center gap-3 text-warm-charcoal no-underline px-4 py-3 rounded-xl text-sm font-medium hover:bg-oat-light hover:text-clay-black transition-all"
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" onClick={onClose} className="flex items-center gap-3 text-lemon-800 no-underline px-4 py-3 rounded-xl text-sm font-bold bg-lemon-400/20 border-2 border-lemon-700">
              ⚙️ Admin Panel
            </Link>
          )}
        </nav>

        <div className="p-4 border-t-2 border-oat-border space-y-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-8 h-8 rounded-full bg-matcha-600 flex items-center justify-center text-white font-bold text-sm">
                  {user.name[0]?.toUpperCase()}
                </div>
                <span className="text-sm font-semibold text-clay-black">{user.name}</span>
              </div>
              <button onClick={() => { onSignOut(); onClose(); }} className="w-full border-2 border-oat-border text-warm-charcoal py-2.5 px-4 rounded-xl text-sm font-medium hover:border-pomegranate-400 hover:text-pomegranate-400 transition-all">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" onClick={onClose} className="block w-full text-center border-2 border-oat-border text-warm-charcoal py-2.5 rounded-xl text-sm font-semibold no-underline hover:border-matcha-600 hover:text-matcha-600 transition-all">
                Sign In
              </Link>
              <Link href="/signin" onClick={onClose} className="block w-full text-center bg-matcha-600 text-white py-2.5 rounded-xl text-sm font-bold no-underline clay-btn">
                Sign Up Free
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

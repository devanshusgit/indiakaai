'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  onSearch?: (q: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    import('@/lib/supabase/client').then(({ createClient }) => {
      const sb = createClient();
      sb.auth.getUser().then(({ data }) => {
        if (data.user) setUser({ email: data.user.email ?? '', name: data.user.user_metadata?.full_name ?? data.user.email ?? '' });
      });
      const { data: listener } = sb.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user ? { email: session.user.email ?? '', name: session.user.user_metadata?.full_name ?? '' } : null);
      });
      return () => listener.subscription.unsubscribe();
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  async function signOut() {
    const { createClient } = await import('@/lib/supabase/client');
    await createClient().auth.signOut();
    setUser(null);
  }

  const navLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Submit Tool', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[1000] bg-white/95 backdrop-blur-sm border-b-2 border-oat-border transition-shadow duration-200 ${scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : ''}`}>
        <div className="max-w-[1400px] mx-auto flex items-center gap-4 px-4 sm:px-6 h-[60px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 no-underline">
            <span className="font-bebas text-[1.3rem] tracking-[0.08em] flex items-center gap-1 bg-white border-2 border-oat-border rounded-2xl px-3.5 py-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.06)] hover:border-clay-black hover:-translate-y-0.5 hover:shadow-[_-3px_3px_0_#1a1714] transition-all duration-150">
              <span className="text-saffron">India</span>
              <span className="text-clay-black">Ka</span>
              <span className="text-matcha-600">AI</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 flex-shrink-0">
            {navLinks.map(l => (
              <Link key={l.href + l.label} href={l.href}
                className={`text-[0.82rem] font-medium px-3 py-2 rounded-lg no-underline transition-all duration-150 ${
                  pathname === l.href
                    ? 'text-clay-black bg-oat-light font-semibold'
                    : 'text-warm-charcoal hover:text-clay-black hover:bg-oat-light'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Search — grows to fill available space */}
          <div className="flex-1 max-w-[340px] hidden md:block">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-silver pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); onSearch?.(e.target.value); }}
                placeholder="Search AI tools…"
                className="w-full bg-oat-light border-2 border-oat-border rounded-xl py-2 pl-9 pr-4 text-[0.83rem] text-clay-black outline-none transition-all placeholder:text-warm-silver focus:border-clay-black focus:bg-white"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            <Link href="/contact"
              className="hidden lg:inline-flex clay-btn bg-lemon-500 text-clay-black border-2 border-lemon-700 px-3.5 py-1.5 rounded-xl text-[0.8rem] font-bold no-underline flex-shrink-0">
              Advertise
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-matcha-600 flex items-center justify-center text-white text-[0.75rem] font-bold flex-shrink-0">
                  {user.name[0]?.toUpperCase()}
                </div>
                {isAdmin && (
                  <Link href="/admin" className="hidden sm:inline-flex bg-clay-black text-white text-[0.72rem] font-bold px-2.5 py-1 rounded-lg no-underline">
                    Admin
                  </Link>
                )}
                <button onClick={signOut} className="text-[0.78rem] text-warm-charcoal border border-oat-border rounded-lg px-3 py-1.5 hover:border-clay-black hover:text-clay-black transition-all cursor-pointer">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <Link href="/signin" className="text-[0.82rem] font-medium text-warm-charcoal border-2 border-oat-border px-3.5 py-1.5 rounded-xl no-underline hover:border-clay-black hover:text-clay-black transition-all">
                  Sign In
                </Link>
                <Link href="/signin" className="clay-btn text-[0.82rem] font-bold bg-matcha-600 text-white border-2 border-matcha-800 px-3.5 py-1.5 rounded-xl no-underline">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-oat-light transition-colors" aria-label="Menu">
              <svg className="w-5 h-5 text-clay-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} isAdmin={isAdmin} onSignOut={signOut} onSearch={q => { setSearch(q); onSearch?.(q); }} />
    </>
  );
}

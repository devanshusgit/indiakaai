'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  onSearch?: (q: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    import('@/lib/supabase/client').then(({ createClient }) => {
      const sb = createClient();
      sb.auth.getUser().then(({ data }) => {
        if (data.user) {
          setUser({
            email: data.user.email ?? '',
            name: data.user.user_metadata?.full_name ?? data.user.email ?? '',
          });
        }
      });
      const { data: listener } = sb.auth.onAuthStateChange((_e, session) => {
        if (session?.user) {
          setUser({ email: session.user.email ?? '', name: session.user.user_metadata?.full_name ?? '' });
        } else {
          setUser(null);
        }
      });
      return () => listener.subscription.unsubscribe();
    });
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
    { label: 'Submit Tool', href: '/contact?tab=submit' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[1000] bg-clay-white border-b-2 border-oat-border shadow-clay">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-6 h-[58px]">

          {/* Logo */}
          <Link href="/" className="font-bebas text-[1.35rem] tracking-[0.06em] flex-shrink-0 cursor-pointer no-underline">
            <span className="inline-flex items-center gap-1.5 bg-clay-white border-2 border-oat-border rounded-[24px] px-3 py-1.5 shadow-clay transition-all duration-200 hover:border-matcha-600 hover:-rotate-1 hover:-translate-y-1 hover:shadow-[_-4px_4px_0_rgb(0,0,0)]">
              <span className="text-saffron">India</span>
              <span className="text-clay-black">Ka</span>
              <span className="text-matcha-600">AI</span>
            </span>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-dark-charcoal" />
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5 flex-1">
            <div className="flex gap-0.5 items-center flex-1">
              {navLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-warm-charcoal no-underline px-3 py-[5px] rounded-md text-[0.82rem] font-medium transition-all duration-150 cursor-pointer hover:text-clay-black hover:bg-oat-light ${pathname === l.href ? 'text-clay-black bg-oat-light font-semibold' : ''}`}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-[280px] relative">
              <Search className="absolute left-[11px] top-1/2 -translate-y-1/2 text-warm-silver w-3 h-3 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); onSearch?.(e.target.value); }}
                placeholder="Search AI tools…"
                className="w-full bg-oat-light border-2 border-oat-border rounded-lg py-[7px] px-[14px] pl-[34px] text-clay-black text-[0.82rem] font-outfit outline-none transition-all duration-150 placeholder:text-warm-silver focus:border-matcha-600"
              />
            </div>

            <Link
              href="/contact?tab=advertise"
              className="clay-btn bg-lemon-500 text-clay-black border-none px-4 py-[7px] rounded-xl font-semibold text-[0.82rem] cursor-pointer flex-shrink-0 no-underline"
            >
              Advertise
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-matcha-600 flex items-center justify-center text-white text-[0.7rem] font-bold">
                  {user.name[0]?.toUpperCase()}
                </div>
                <span className="text-[0.82rem] font-semibold text-clay-black hidden lg:block">{user.name.split(' ')[0]}</span>
                {isAdmin && (
                  <Link href="/admin" className="bg-lemon-500 text-clay-black border-2 border-lemon-800 rounded-lg px-2 py-0.5 text-[0.72rem] font-bold no-underline">
                    Admin
                  </Link>
                )}
                <button onClick={signOut} className="border-2 border-oat-border text-warm-charcoal px-3 py-1 rounded-lg text-[0.75rem] font-medium hover:border-pomegranate-400 hover:text-pomegranate-400 transition-all">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex gap-1.5 items-center flex-shrink-0">
                <Link href="/signin" className="border-2 border-oat-border text-warm-charcoal px-3.5 py-1.5 rounded-lg text-[0.82rem] font-medium no-underline hover:border-matcha-600 hover:text-matcha-600 transition-all">
                  Sign In
                </Link>
                <Link href="/signin" className="clay-btn bg-matcha-600 text-white border-none px-3.5 py-1.5 rounded-xl text-[0.82rem] font-bold no-underline">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        user={user}
        isAdmin={isAdmin}
        onSignOut={signOut}
        onSearch={q => { setSearch(q); onSearch?.(q); }}
      />
    </>
  );
}

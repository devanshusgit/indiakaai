import Link from 'next/link';

const explore = [
  { label: 'Writing AI', href: '/?cat=Writing' },
  { label: 'Image Gen AI', href: '/?cat=Image' },
  { label: 'Coding AI', href: '/?cat=Coding' },
  { label: 'Video AI', href: '/?cat=Video' },
  { label: 'Productivity AI', href: '/?cat=Productivity' },
];

const blog = [
  { label: 'AI for Students', href: '/blog?tag=students' },
  { label: 'Make Money with AI', href: '/blog?tag=money' },
  { label: 'Tool Reviews', href: '/blog?tag=tools' },
  { label: 'AI News', href: '/blog?tag=news' },
];

const company = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Submit a Tool', href: '/contact?tab=submit' },
  { label: 'Advertise', href: '/contact?tab=advertise' },
  { label: 'Get In Touch', href: '/contact?tab=getintouch' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-clay-cream border-t-2 border-oat-border py-10 sm:py-[60px] px-4 sm:px-6 pb-7">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 sm:gap-10 mb-8 sm:mb-10">
        {/* Brand */}
        <div>
          <Link href="/" className="font-bebas text-[1.6rem] tracking-[0.06em] block mb-3 no-underline">
            <span className="text-saffron">India</span>
            <span className="text-clay-black"> Ka </span>
            <span className="text-matcha-600">AI</span>
          </Link>
          <p className="text-warm-charcoal text-[0.85rem] leading-[1.7] mb-5">
            India's most trusted AI tools directory. Discover, compare and use the best AI tools for every task — curated by Indians, for India.
          </p>
          <div className="flex gap-1 items-center text-[0.82rem] text-warm-silver">Made with ❤ in India</div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-[0.75rem] font-bold text-clay-black mb-4 uppercase tracking-[0.04em]">Explore</h4>
          {explore.map(l => (
            <Link key={l.href} href={l.href} className="block text-warm-charcoal no-underline text-[0.85rem] mb-2 hover:text-matcha-600 hover:font-medium transition-all">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Blog */}
        <div>
          <h4 className="text-[0.75rem] font-bold text-clay-black mb-4 uppercase tracking-[0.04em]">Blog</h4>
          {blog.map(l => (
            <Link key={l.href} href={l.href} className="block text-warm-charcoal no-underline text-[0.85rem] mb-2 hover:text-matcha-600 hover:font-medium transition-all">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[0.75rem] font-bold text-clay-black mb-4 uppercase tracking-[0.04em]">Company</h4>
          {company.map(l => (
            <Link key={l.href} href={l.href} className="block text-warm-charcoal no-underline text-[0.85rem] mb-2 hover:text-matcha-600 hover:font-medium transition-all">
              {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto border-t-2 border-oat-border pt-6 flex justify-between items-center flex-wrap gap-3">
        <p className="text-warm-silver text-[0.82rem]">© 2026 IndiaKaAI. All rights reserved.</p>
        <p className="text-warm-silver text-[0.82rem]">India's #1 AI Tools Directory</p>
      </div>
    </footer>
  );
}

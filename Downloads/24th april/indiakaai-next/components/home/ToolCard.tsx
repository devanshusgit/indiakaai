'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Tool } from '@/types';
import { slugify } from '@/lib/utils';

const PRICING_STYLES: Record<string, string> = {
  Free:     'bg-matcha-300/25 text-matcha-800 border-matcha-600',
  Freemium: 'bg-ube-300/20 text-ube-900 border-ube-800',
  Paid:     'bg-lemon-400/25 text-lemon-800 border-lemon-700',
};

interface Props { tool: Tool; }

export default function ToolCard({ tool }: Props) {
  const domain = (() => { try { return new URL(tool.url).hostname.replace('www.', ''); } catch { return ''; } })();
  const logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  const slug = tool.slug ?? slugify(tool.name);
  const pricingCls = PRICING_STYLES[tool.pricing] ?? 'bg-oat-light text-warm-charcoal border-oat-border';

  return (
    <div
      className="tool-card group bg-white border-2 border-oat-border rounded-[20px] flex flex-col overflow-hidden cursor-pointer relative"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
    >
      {/* Color accent strip */}
      <div
        className="h-1.5 w-full flex-shrink-0"
        style={{ background: tool.color || '#078a52' }}
      />

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5">

        {/* Header row */}
        <div className="flex items-start gap-3.5 mb-4">
          {/* Logo */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden border-2 relative"
            style={{
              background: `${tool.color}18`,
              borderColor: `${tool.color}35`,
            }}
          >
            <Image
              src={logo}
              alt={tool.name}
              width={40}
              height={40}
              className="w-9 h-9 object-contain rounded-xl logo-fadein"
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.style.display = 'none';
                const parent = el.parentElement;
                if (parent) {
                  parent.innerHTML = `<span style="font-size:1.5rem;line-height:1">${tool.icon || tool.name[0]}</span>`;
                }
              }}
              unoptimized
            />
          </div>

          {/* Name + category */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-[0.98rem] text-clay-black leading-snug truncate">{tool.name}</h3>
              {tool.is_new && (
                <span className="flex-shrink-0 text-[0.6rem] font-bold px-1.5 py-0.5 bg-matcha-600 text-white rounded-md uppercase tracking-wide">
                  New
                </span>
              )}
            </div>
            <div className="text-[0.73rem] font-medium text-warm-silver mt-0.5">{tool.cat}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[0.82rem] text-warm-charcoal leading-[1.6] line-clamp-2 mb-4 flex-1">
          {tool.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-oat-border/60">
          <span className={`text-[0.68rem] font-bold px-2.5 py-1 rounded-lg border-2 tracking-wide uppercase ${pricingCls}`}>
            {tool.pricing}
          </span>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/tools/${slug}`}
              className="text-[0.75rem] font-medium text-warm-silver hover:text-matcha-600 transition-colors no-underline px-2 py-1"
            >
              Details
            </Link>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-clay-black text-white text-[0.75rem] font-semibold px-3 py-1.5 rounded-lg no-underline hover:bg-dark-charcoal transition-colors"
            >
              Visit ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

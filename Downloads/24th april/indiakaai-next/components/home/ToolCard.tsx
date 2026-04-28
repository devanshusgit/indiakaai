'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Tool } from '@/types';
import { getPricingColor, logoUrl, slugify } from '@/lib/utils';

interface Props { tool: Tool; }

export default function ToolCard({ tool }: Props) {
  const domain = tool.url ? new URL(tool.url).hostname : '';
  const logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  const slug = tool.slug ?? slugify(tool.name);

  return (
    <div
      className="bg-clay-white border-2 border-oat-border rounded-[24px] p-5 transition-all duration-200 relative overflow-hidden shadow-clay hover:border-matcha-600 hover:-rotate-1 hover:-translate-y-1 hover:shadow-[_-4px_4px_0_rgb(0,0,0)] flex flex-col"
      style={{ background: `${tool.color}08` }}
    >
      {/* NEW badge */}
      {tool.is_new && (
        <span className="absolute top-3 right-3 bg-matcha-600 text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
          New
        </span>
      )}

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden border-2"
          style={{ background: `${tool.color}22`, borderColor: `${tool.color}44` }}
        >
          <Image
            src={logo}
            alt={tool.name}
            width={32}
            height={32}
            className="w-8 h-8 object-contain rounded-md logo-fadein"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[0.95rem] text-clay-black truncate mb-0.5">{tool.name}</div>
          <div className="text-[0.72rem] font-medium text-warm-silver">{tool.cat}</div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[0.8rem] text-warm-charcoal leading-[1.55] mb-3 line-clamp-2 flex-1">{tool.desc}</p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-[0.7rem] font-semibold px-2 py-0.5 rounded-md border-2 ${getPricingColor(tool.pricing)}`}>
          {tool.pricing}
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/tools/${slug}`}
            className="text-warm-silver text-[0.72rem] font-medium hover:text-matcha-600 transition-colors no-underline"
          >
            Details
          </Link>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 border-2 border-oat-border text-warm-charcoal px-3 py-1 rounded-md text-[0.75rem] font-medium hover:border-matcha-600 hover:text-matcha-600 transition-all no-underline"
          >
            Visit <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

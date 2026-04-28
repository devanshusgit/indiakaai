'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Tool, Category } from '@/types';
import { CATEGORIES } from '@/data/tools';
import ToolCard from './ToolCard';

interface Props {
  tools: Tool[];
  externalSearch?: string;
}

export default function ToolGrid({ tools, externalSearch = '' }: Props) {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') ?? 'All';

  const [activeCat, setActiveCat] = useState<string>(catParam);
  const [search, setSearch] = useState(externalSearch);

  useEffect(() => { setSearch(externalSearch); }, [externalSearch]);
  useEffect(() => { setActiveCat(catParam); }, [catParam]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tools.filter(t => {
      const catMatch = activeCat === 'All' || t.cat === activeCat;
      const searchMatch = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [tools, activeCat, search]);

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
      {/* Category tabs */}
      <div className="py-6 sm:py-8">
        <div className="text-[0.7rem] font-bold mb-3 text-warm-charcoal tracking-[0.08em] uppercase">Browse by Category</div>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[0.8rem] sm:text-[0.85rem] font-medium rounded-lg sm:rounded-xl border-2 cursor-pointer whitespace-nowrap transition-all duration-200 hover:border-matcha-600 hover:-rotate-1 hover:-translate-y-0.5 ${
                activeCat === cat
                  ? 'bg-clay-white border-matcha-600 text-clay-black font-semibold -rotate-1 -translate-y-0.5'
                  : 'bg-clay-white border-oat-border text-warm-charcoal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid label */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[0.75rem] font-bold text-warm-charcoal uppercase tracking-[0.08em]">
          {activeCat === 'All' ? 'All Tools' : activeCat}
        </span>
        <span className="text-[0.75rem] font-medium text-warm-silver">{filtered.length} tools</span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-warm-charcoal font-medium">No tools found for "{search}"</p>
          <button onClick={() => { setSearch(''); setActiveCat('All'); }} className="mt-4 text-matcha-600 text-sm font-semibold underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
        </div>
      )}
    </section>
  );
}

'use client';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Tool } from '@/types';
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
    const q = search.trim().toLowerCase();
    return tools.filter(t => {
      const catMatch = activeCat === 'All' || t.cat === activeCat;
      const searchMatch = !q || t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [tools, activeCat, search]);

  function handleCat(cat: string) {
    setActiveCat(cat);
    const url = new URL(window.location.href);
    if (cat === 'All') url.searchParams.delete('cat');
    else url.searchParams.set('cat', cat);
    window.history.replaceState({}, '', url.toString());
  }

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6">

      {/* Category filter */}
      <div className="py-6 sm:py-8 border-b border-oat-border/60">
        <p className="text-[0.65rem] font-bold text-warm-silver uppercase tracking-[0.12em] mb-3">Browse by Category</p>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCat(cat)}
              className={`px-3.5 py-1.5 text-[0.8rem] font-semibold rounded-xl border-2 cursor-pointer whitespace-nowrap transition-all duration-150 ${
                activeCat === cat
                  ? 'bg-clay-black text-white border-clay-black'
                  : 'bg-white text-warm-charcoal border-oat-border hover:border-clay-black hover:text-clay-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between py-5">
        <div>
          <h2 className="font-semibold text-[1rem] text-clay-black">
            {search ? `Search: "${search}"` : activeCat === 'All' ? 'All AI Tools' : `${activeCat} Tools`}
          </h2>
          <p className="text-[0.75rem] text-warm-silver mt-0.5">{filtered.length} tools found</p>
        </div>
        {(search || activeCat !== 'All') && (
          <button
            onClick={() => { setSearch(''); handleCat('All'); }}
            className="text-[0.78rem] font-medium text-warm-charcoal border border-oat-border rounded-lg px-3 py-1.5 hover:border-clay-black hover:text-clay-black transition-all cursor-pointer"
          >
            Clear filters ×
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-clay-black font-semibold text-[1rem] mb-1">No tools found</p>
          <p className="text-warm-charcoal text-[0.88rem]">Try a different keyword or category</p>
          <button onClick={() => { setSearch(''); handleCat('All'); }}
            className="mt-5 text-matcha-600 text-sm font-semibold underline cursor-pointer">
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-16">
          {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
        </div>
      )}
    </section>
  );
}

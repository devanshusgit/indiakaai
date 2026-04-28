import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import { createClient } from '@/lib/supabase/server';
import { SEED_TOOLS } from '@/data/tools';
import { logoUrl, getPricingColor } from '@/lib/utils';
import type { Tool } from '@/types';

interface Props { params: Promise<{ slug: string }> }

async function getTool(slug: string): Promise<Tool | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('ai_tools').select('*').eq('slug', slug).single() as { data: Tool | null };
    if (data) return data as Tool;
  } catch {}
  return SEED_TOOLS.find(t => t.slug === slug) ?? null;
}

async function getRelated(tool: Tool): Promise<Tool[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('ai_tools').select('*').eq('cat', tool.cat).neq('slug', tool.slug).limit(4) as { data: Tool[] | null };
    if (data && data.length) return data;
  } catch {}
  return SEED_TOOLS.filter(t => t.cat === tool.cat && t.slug !== tool.slug).slice(0, 4);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) return { title: 'Tool Not Found – IndiaKaAI' };
  return {
    title: `${tool.name} – AI Tool | IndiaKaAI`,
    description: tool.desc,
    openGraph: { title: `${tool.name} on IndiaKaAI`, description: tool.desc, images: [logoUrl(tool.url)] },
  };
}

export async function generateStaticParams() {
  return SEED_TOOLS.map(t => ({ slug: t.slug ?? '' })).filter(p => p.slug);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    return (
      <>
        <Navbar />
        <main className="pt-[58px] max-w-[780px] mx-auto px-4 py-20 text-center">
          <p className="text-[2rem] mb-4">🔍</p>
          <h1 className="font-bebas text-[2rem] text-clay-black mb-4">Tool Not Found</h1>
          <Link href="/" className="text-matcha-600 font-semibold underline">← Back to Home</Link>
        </main>
      </>
    );
  }

  const related = await getRelated(tool);
  const pricingCls = getPricingColor(tool.pricing);

  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        {/* Hero */}
        <div className="bg-gray-50 border-b-2 border-oat-border py-10 sm:py-14 px-4 sm:px-6">
          <div className="max-w-[860px] mx-auto">
            <Link href="/" className="inline-flex items-center gap-1 text-matcha-600 text-sm font-semibold mb-6 no-underline hover:underline">
              ← Back to Tools
            </Link>
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-oat-border bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-clay">
                <Image src={logoUrl(tool.url)} alt={tool.name} width={56} height={56} unoptimized className="rounded-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="font-bebas text-[1.8rem] sm:text-[2.5rem] text-clay-black leading-none">{tool.name}</h1>
                  {tool.is_new && (
                    <span className="bg-slushie-500/20 text-slushie-800 border-2 border-slushie-800 text-[0.65rem] font-bold px-2 py-0.5 rounded-full uppercase">New</span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-oat-light border-2 border-oat-border text-warm-charcoal text-[0.75rem] font-semibold px-2.5 py-0.5 rounded-full">{tool.cat}</span>
                  <span className={`${pricingCls} border-2 text-[0.75rem] font-semibold px-2.5 py-0.5 rounded-full`}>{tool.pricing}</span>
                </div>
                <p className="text-warm-charcoal text-[0.95rem] leading-[1.7]">{tool.desc}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={tool.url} target="_blank" rel="noopener noreferrer"
                className="clay-btn bg-matcha-600 text-white border-none rounded-xl py-3 px-6 font-bold text-[0.9rem] cursor-pointer no-underline inline-flex items-center gap-2">
                Visit {tool.name} →
              </a>
              <Link href={`/?cat=${tool.cat}`}
                className="clay-btn bg-clay-white border-2 border-oat-border text-clay-black rounded-xl py-3 px-6 font-semibold text-[0.9rem] no-underline inline-flex items-center gap-2">
                More {tool.cat} Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="max-w-[860px] mx-auto px-4 sm:px-6 py-10 sm:py-14 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { label: 'Category', value: tool.cat },
              { label: 'Pricing', value: tool.pricing },
              { label: 'Website', value: new URL(tool.url).hostname },
            ].map(item => (
              <div key={item.label} className="bg-clay-white border-2 border-oat-border rounded-2xl p-5 shadow-clay">
                <p className="text-[0.75rem] font-semibold text-warm-charcoal uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-clay-black font-semibold text-[0.95rem] truncate">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Related tools */}
          {related.length > 0 && (
            <div>
              <h2 className="font-bebas text-[1.6rem] text-clay-black mb-5">More {tool.cat} Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(r => (
                  <Link key={r.id} href={`/tools/${r.slug}`}
                    className="bg-clay-white border-2 border-oat-border rounded-2xl p-4 shadow-clay hover:border-matcha-600 hover:-translate-y-0.5 transition-all no-underline flex items-center gap-4">
                    <Image src={logoUrl(r.url)} alt={r.name} width={40} height={40} unoptimized className="rounded-xl w-10 h-10 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-clay-black text-[0.9rem] truncate">{r.name}</p>
                      <p className="text-warm-charcoal text-[0.78rem] line-clamp-1">{r.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SEED_TOOLS } from '@/data/tools';
import Hero from '@/components/home/Hero';
import ToolGrid from '@/components/home/ToolGrid';
import Navbar from '@/components/layout/Navbar';
import Newsletter from '@/components/home/Newsletter';

export const metadata: Metadata = {
  title: "IndiaKaAI – India's #1 AI Tools Directory",
  description: "Discover 100+ hand-picked AI tools for writing, coding, design, video, productivity and more.",
};

async function getTools() {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const sb = await createClient();
    const { data } = await sb.from('ai_tools').select('*').order('id');
    if (data && data.length > 0) return data;
  } catch {}
  return SEED_TOOLS;
}

export default async function HomePage() {
  const tools = await getTools();

  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        <Hero toolCount={tools.length} />
        <Suspense fallback={<div className="text-center py-20 text-warm-charcoal">Loading tools…</div>}>
          <ToolGrid tools={tools} />
        </Suspense>
        <Newsletter />
      </main>
    </>
  );
}

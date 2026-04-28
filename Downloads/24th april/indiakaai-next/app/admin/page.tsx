'use client';
export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Navbar from '@/components/layout/Navbar';
import type { Tool } from '@/types';
import { SEED_TOOLS } from '@/data/tools';

type Tab = 'tools' | 'blogs';

export default function AdminPage() {
  const router = useRouter();
  const supabase = createClient();
  const [checking, setChecking] = useState(true);
  const [tools, setTools] = useState<Tool[]>([]);
  const [tab, setTab] = useState<Tab>('tools');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (!user || user.email !== adminEmail) {
        router.replace('/signin');
        return;
      }
      await loadTools();
      setChecking(false);
    }
    checkAuth();
  }, []);

  async function loadTools() {
    const { data } = await supabase.from('ai_tools').select('*').order('id', { ascending: false });
    setTools(data ?? SEED_TOOLS);
  }

  async function toggleFeatured(tool: Tool) {
    await supabase.from('ai_tools').update({ is_new: !tool.is_new }).eq('id', tool.id);
    await loadTools();
  }

  const filtered = tools.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.cat.toLowerCase().includes(search.toLowerCase())
  );

  if (checking) {
    return (
      <>
        <Navbar />
        <main className="pt-[58px] min-h-screen flex items-center justify-center">
          <p className="text-warm-charcoal">Checking access…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        <div className="bg-clay-black text-white py-8 px-4 sm:px-6 border-b-2 border-clay-black">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="font-bebas text-[2rem] sm:text-[2.8rem] mb-1">Admin Panel</h1>
            <p className="text-white/60 text-[0.9rem]">Manage tools, blog posts, and site content</p>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 pb-20">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(['tools', 'blogs'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-[0.85rem] font-semibold border-2 cursor-pointer transition-all ${tab === t ? 'bg-clay-black text-white border-clay-black' : 'bg-clay-white border-oat-border text-warm-charcoal hover:border-clay-black'}`}>
                {t === 'tools' ? `🛠 Tools (${tools.length})` : '📝 Blog Posts'}
              </button>
            ))}
          </div>

          {tab === 'tools' && (
            <>
              <div className="flex items-center gap-3 mb-5">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search tools…"
                  className="flex-1 max-w-[320px] bg-clay-white border-2 border-oat-border rounded-xl py-2.5 px-4 text-[0.9rem] outline-none focus:border-matcha-600"
                />
                <span className="text-warm-charcoal text-[0.85rem]">{filtered.length} tools</span>
              </div>

              <div className="bg-clay-white border-2 border-oat-border rounded-2xl overflow-hidden shadow-clay">
                <table className="w-full text-[0.85rem]">
                  <thead>
                    <tr className="border-b-2 border-oat-border bg-oat-light">
                      <th className="text-left py-3 px-4 font-semibold text-warm-charcoal">Tool</th>
                      <th className="text-left py-3 px-4 font-semibold text-warm-charcoal hidden sm:table-cell">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-warm-charcoal hidden md:table-cell">Pricing</th>
                      <th className="text-left py-3 px-4 font-semibold text-warm-charcoal">Status</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((tool, i) => (
                      <tr key={tool.id} className={`border-b border-oat-border ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-clay-black">{tool.name}</div>
                          <div className="text-warm-silver text-[0.75rem] truncate max-w-[200px]">{tool.desc}</div>
                        </td>
                        <td className="py-3 px-4 text-warm-charcoal hidden sm:table-cell">{tool.cat}</td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          <span className={`text-[0.72rem] font-semibold px-2 py-0.5 rounded-full border ${tool.pricing === 'Free' ? 'bg-matcha-300/20 text-matcha-800 border-matcha-600' : tool.pricing === 'Freemium' ? 'bg-lemon-400/20 text-lemon-800 border-lemon-700' : 'bg-ube-300/20 text-ube-900 border-ube-800'}`}>
                            {tool.pricing}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[0.72rem] font-semibold px-2 py-0.5 rounded-full ${tool.is_new ? 'bg-slushie-500/20 text-slushie-800' : 'bg-gray-100 text-gray-500'}`}>
                            {tool.is_new ? 'Featured' : 'Normal'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button onClick={() => toggleFeatured(tool)}
                            className="text-[0.75rem] text-matcha-600 font-semibold hover:underline cursor-pointer">
                            {tool.is_new ? 'Unfeature' : 'Feature'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {tab === 'blogs' && (
            <div className="bg-clay-white border-2 border-oat-border rounded-2xl p-8 text-center shadow-clay">
              <p className="text-3xl mb-3">📝</p>
              <h3 className="font-bebas text-[1.5rem] text-clay-black mb-2">Blog Management</h3>
              <p className="text-warm-charcoal text-[0.9rem]">Blog post management via Supabase dashboard. Connect the <code>blog_posts</code> table to manage posts here.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

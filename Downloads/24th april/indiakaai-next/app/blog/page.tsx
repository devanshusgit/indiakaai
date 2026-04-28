import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'AI Blog – IndiaKaAI',
  description: 'In-depth guides, tutorials and insights about AI tools for India — in English & Hindi.',
};

const DEFAULT_POSTS = [
  { slug: 'best-free-ai-tools-indian-students', tag: 'students', emoji: '📚', title: 'Best Free AI Tools for Indian Students in 2026', excerpt: 'From ChatGPT to Grammarly — top 10 free AI tools every Indian student must use.', date: 'Apr 22, 2026', read: '6 min read' },
  { slug: 'chatgpt-vs-gemini-india', tag: 'tools', emoji: '⚡', title: 'ChatGPT vs Gemini: Which is Better for India?', excerpt: 'Comparing pricing, language support, and performance for Indian users in 2026.', date: 'Apr 23, 2026', read: '8 min read' },
  { slug: 'ai-tools-hindi-support', tag: 'tools', emoji: '🇮🇳', title: 'Best AI Tools with Hindi Language Support', excerpt: 'These AI tools work in Hindi — perfect for regional content creators and educators.', date: 'Apr 20, 2026', read: '5 min read' },
  { slug: 'best-ai-tools-india-2026', tag: 'news', emoji: '🚀', title: 'Best AI Tools in India 2026 – Complete Guide', excerpt: 'The definitive guide to the best AI tools available for Indian users in 2026.', date: 'Apr 18, 2026', read: '12 min read' },
  { slug: 'ai-content-creation-workflow-2026', tag: 'money', emoji: '💰', title: 'AI Content Creation Workflow to Make Money in 2026', excerpt: 'How to use AI tools to build a content business and earn ₹50,000+ per month.', date: 'Apr 17, 2026', read: '10 min read' },
  { slug: 'free-ai-tools-content-creation', tag: 'money', emoji: '🎨', title: 'Free AI Tools for Content Creation', excerpt: 'Build a full content pipeline using only free AI tools — no credit card needed.', date: 'Apr 15, 2026', read: '7 min read' },
  { slug: 'midjourney-vs-dalle-comparison', tag: 'tools', emoji: '🖼', title: 'Midjourney vs DALL·E 3: Which AI Image Tool is Better?', excerpt: 'In-depth comparison of the two most popular AI image generators in 2026.', date: 'Apr 14, 2026', read: '9 min read' },
  { slug: 'chatgpt-kaise-use-karein', tag: 'students', emoji: '📖', title: 'ChatGPT Kaise Use Karein – Hindi Guide', excerpt: 'ChatGPT ko Hindi mein use karne ka complete tutorial — students ke liye.', date: 'Apr 12, 2026', read: '6 min read' },
  { slug: 'ai-tools-for-business-india', tag: 'money', emoji: '💼', title: 'Best AI Tools for Small Business in India', excerpt: 'Cut costs and grow faster with these AI tools built for Indian SMEs.', date: 'Apr 10, 2026', read: '8 min read' },
];

const TAG_LABELS: Record<string, string> = {
  students: '🎓 AI for Students', money: '💰 Make Money with AI',
  tools: '🔧 Tool Reviews', news: '📰 AI News',
};

const TAG_COLORS: Record<string, string> = {
  students: 'bg-ube-300/20 text-ube-900 border-ube-800',
  money: 'bg-lemon-400/20 text-lemon-800 border-lemon-700',
  tools: 'bg-matcha-300/20 text-matcha-800 border-matcha-600',
  news: 'bg-slushie-500/20 text-slushie-800 border-slushie-800',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[58px]">
        {/* Hero */}
        <div className="bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 text-center border-b-2 border-oat-border">
          <h1 className="font-bebas text-[2.2rem] sm:text-[3.5rem] font-normal tracking-[0.04em] mb-2 text-clay-black">
            <span className="text-saffron">India</span>
            <span className="text-clay-black"> Ka </span>
            <span className="text-matcha-600">AI</span> Blog
          </h1>
          <p className="text-warm-charcoal text-[0.88rem]">In-depth guides, tutorials and insights about AI tools — in English &amp; Hindi</p>
        </div>

        {/* Grid */}
        <div className="max-w-[1400px] mx-auto py-6 sm:py-8 px-4 sm:px-6 pb-12 sm:pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {DEFAULT_POSTS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-clay-white border-2 border-oat-border rounded-[24px] overflow-hidden shadow-clay hover:border-matcha-600 hover:-rotate-1 hover:-translate-y-1 hover:shadow-[_-4px_4px_0_rgb(0,0,0)] transition-all duration-200 no-underline block"
            >
              <div className="h-[140px] flex items-center justify-center text-5xl border-b-2 border-oat-border bg-oat-light">
                {post.emoji}
              </div>
              <div className="p-5">
                <span className={`inline-block border-2 text-[0.68rem] font-semibold px-2 py-0.5 rounded-md mb-3 uppercase tracking-wide ${TAG_COLORS[post.tag]}`}>
                  {TAG_LABELS[post.tag]}
                </span>
                <h2 className="text-[0.95rem] font-semibold text-clay-black mb-2 leading-[1.4]">{post.title}</h2>
                <p className="text-[0.82rem] text-warm-charcoal leading-[1.6] mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-[0.75rem] text-warm-silver">
                  <span>{post.date}</span>
                  <span className="text-matcha-600 font-semibold">{post.read} →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

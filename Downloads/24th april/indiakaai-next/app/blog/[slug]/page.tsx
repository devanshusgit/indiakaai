import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, ' ')} – IndiaKaAI Blog`,
    description: 'Read this article on IndiaKaAI — India\'s #1 AI tools directory.',
  };
}

function getBlogContent(slug: string): string | null {
  const oldProjectPath = path.join(process.cwd(), '..', 'indiakaai', 'blog', `${slug}.html`);
  if (existsSync(oldProjectPath)) {
    return readFileSync(oldProjectPath, 'utf-8');
  }
  return null;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <>
      <Navbar />
      <main className="pt-[58px] max-w-[780px] mx-auto px-4 sm:px-6 py-10 sm:py-16 pb-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-matcha-600 text-sm font-semibold mb-8 no-underline hover:underline">
          ← Back to Blog
        </Link>
        <h1 className="font-bebas text-[2rem] sm:text-[3rem] leading-[1.1] tracking-[0.02em] mb-6 text-clay-black">
          {title}
        </h1>
        <div className="border-2 border-oat-border rounded-[24px] p-6 sm:p-10 bg-clay-white shadow-clay">
          <p className="text-warm-charcoal text-[0.95rem] leading-[1.8]">
            This article is available on our platform. Full content is being migrated to our new system.
            <br /><br />
            <a href={`https://indiakaai.com/blog/${slug}.html`} target="_blank" rel="noopener noreferrer" className="text-matcha-600 font-semibold underline">
              Read the full article here →
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

import type { MetadataRoute } from 'next';
import { SEED_TOOLS } from '@/data/tools';

const BASE = 'https://indiakaai.com';

const BLOG_SLUGS = [
  'best-free-ai-tools-indian-students',
  'chatgpt-vs-gemini-india',
  'ai-tools-hindi-support',
  'best-ai-tools-india-2026',
  'ai-content-creation-workflow-2026',
  'free-ai-tools-content-creation',
  'midjourney-vs-dalle-comparison',
  'chatgpt-kaise-use-karein',
  'ai-tools-for-business-india',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  const toolRoutes: MetadataRoute.Sitemap = SEED_TOOLS
    .filter(t => t.slug)
    .map(t => ({
      url: `${BASE}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_SLUGS.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}

import type { Pricing } from '@/types';

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function logoUrl(url: string): string {
  const domain = getDomain(url);
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

export function getPricingColor(pricing: Pricing): string {
  switch (pricing) {
    case 'Free':      return 'bg-matcha-600/15 text-matcha-800 border-matcha-600';
    case 'Freemium':  return 'bg-ube-800/10 text-ube-800 border-ube-800';
    case 'Paid':      return 'bg-lemon-500/15 text-lemon-800 border-lemon-500';
    default:          return 'bg-oat-light text-warm-charcoal border-oat-border';
  }
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 3) + '…' : str;
}

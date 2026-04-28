import type { Metadata } from 'next';
import { Bebas_Neue, Outfit } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/Footer';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "IndiaKaAI – India's #1 AI Tools Directory",
  description: "Discover 100+ hand-picked AI tools for writing, coding, design, video, productivity and more. India's favourite AI directory.",
  keywords: ['AI tools', 'artificial intelligence', 'AI directory', 'ChatGPT', 'India AI', 'best AI tools 2026'],
  authors: [{ name: 'IndiaKaAI' }],
  openGraph: {
    title: "IndiaKaAI – India's #1 AI Tools Directory",
    description: 'Discover 100+ hand-picked AI tools for every need.',
    url: 'https://indiakaai.com',
    siteName: 'IndiaKaAI',
    images: [{ url: 'https://indiakaai.com/favicon.svg' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "IndiaKaAI – India's #1 AI Tools Directory",
    description: 'Discover 100+ hand-picked AI tools for every need.',
    images: ['https://indiakaai.com/favicon.svg'],
  },
  verification: { google: 'NRIBCPlSJ5ndZK0WGZXBDWo6oKt4H0zkYHmmgaF4sR0' },
  metadataBase: new URL('https://indiakaai.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${outfit.variable}`}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-5886831210668178" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TX4HKQW73M" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-TX4HKQW73M');` }} />
      </head>
      <body className="bg-clay-cream antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}

// ── EMAILJS & SUPABASE CONFIG ────────────────────────────────────────────
// 🔒 SECURITY NOTE: These are PUBLIC keys designed for client-side use
// ✅ SAFE TO EXPOSE:
//    - EMAILJS_PUBLIC_KEY (public key, rate-limited by EmailJS)
//    - SUPABASE_ANON_KEY (public anon key, protected by RLS policies)
// ❌ NEVER EXPOSE:
//    - Supabase Service Role Key (keep server-side only)
//    - EmailJS Private Key (not needed in frontend)
// ────────────────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = 'service_qyjg6m7';
const EMAILJS_TEMPLATE_ID = 'template_9uj2ssc';
const EMAILJS_PUBLIC_KEY  = 'currst4_D3RzdoSHp';

// Supabase — India region (ap-south-1)
// Protected by Row Level Security (RLS) policies on backend
const SUPABASE_URL      = 'https://lnedatdaewcfukaqupze.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZWRhdGRhZXdjZnVrYXF1cHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxOTI2ODMsImV4cCI6MjA4Nzc2ODY4M30.XMkwO9wh6rjbGGlfXEkyoKJvq7rVrP8OZgTqu8NJUNg';
const _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lazy load EmailJS only when needed
function loadEmailJS() {
  return new Promise((resolve) => {
    if (window.emailjs) { resolve(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    s.onload = () => {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      resolve();
    };
    document.head.appendChild(s);
  });
}

/* ══════════════════════════════════════════════════════════════════════
   PHASE 7: MOBILE UX - NAVIGATION FUNCTIONS
   ══════════════════════════════════════════════════════════════════════ */

/* ── MOBILE MENU FUNCTIONS ── */
function toggleMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const drawer = document.getElementById('mobileMenuDrawer');
  const hamburgerLine1 = document.getElementById('hamburger-line-1');
  const hamburgerLine2 = document.getElementById('hamburger-line-2');
  const hamburgerLine3 = document.getElementById('hamburger-line-3');
  
  const isOpen = !drawer.classList.contains('translate-x-full');
  
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const drawer = document.getElementById('mobileMenuDrawer');
  const hamburgerLine1 = document.getElementById('hamburger-line-1');
  const hamburgerLine2 = document.getElementById('hamburger-line-2');
  const hamburgerLine3 = document.getElementById('hamburger-line-3');
  
  // Show overlay
  overlay.classList.remove('hidden');
  
  // Slide in drawer
  drawer.classList.remove('translate-x-full');
  
  // Animate hamburger to X
  hamburgerLine1.style.transform = 'rotate(45deg) translate(6px, 6px)';
  hamburgerLine2.style.opacity = '0';
  hamburgerLine3.style.transform = 'rotate(-45deg) translate(6px, -6px)';
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const drawer = document.getElementById('mobileMenuDrawer');
  const hamburgerLine1 = document.getElementById('hamburger-line-1');
  const hamburgerLine2 = document.getElementById('hamburger-line-2');
  const hamburgerLine3 = document.getElementById('hamburger-line-3');
  
  // Hide overlay
  overlay.classList.add('hidden');
  
  // Slide out drawer
  drawer.classList.add('translate-x-full');
  
  // Reset hamburger animation
  hamburgerLine1.style.transform = 'rotate(0) translate(0, 0)';
  hamburgerLine2.style.opacity = '1';
  hamburgerLine3.style.transform = 'rotate(0) translate(0, 0)';
  
  // Restore body scroll
  document.body.style.overflow = '';
}

/* ── MOBILE NAVIGATION SYNC ── */
function updateMobileNavActive(pageId) {
  // Update desktop nav
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active', 'text-white', 'bg-gray-700');
    link.classList.add('text-gray-700');
  });
  
  // Update mobile nav - remove active states
  document.querySelectorAll('#mobileMenuDrawer a').forEach(link => {
    link.classList.remove('active', 'bg-matcha-100', 'border-2', 'border-matcha-200', 'text-gray-900', 'font-semibold');
    link.classList.add('text-gray-700', 'font-medium');
  });
  
  // Set active states (skip home since it's removed)
  if (pageId !== 'home') {
    const desktopActive = document.getElementById(`nav-${pageId}`);
    const mobileActive = document.getElementById(`mobile-nav-${pageId}`);
    
    if (desktopActive) {
      desktopActive.classList.add('active', 'text-white', 'bg-gray-700');
      desktopActive.classList.remove('text-gray-700');
    }
    
    if (mobileActive) {
      mobileActive.classList.add('active', 'bg-matcha-100', 'border-2', 'border-matcha-200', 'text-gray-900', 'font-semibold');
      mobileActive.classList.remove('text-gray-700', 'font-medium');
    }
  }
}

/* ══════════════════════════════════════════════════════════════════════
   PHASE 6: INTERNAL LINKING SYSTEM
   ══════════════════════════════════════════════════════════════════════
   1. Related Tools - Show similar tools by category
   2. Blog to Tools Links - Link blog articles to relevant tools
   3. Tool to Blog Links - Link tool pages to relevant blog articles
   4. Cross-linking for better SEO and user experience
   ══════════════════════════════════════════════════════════════════════ */

/* ── RELATED TOOLS FUNCTIONALITY ── */
function getRelatedTools(currentToolId, limit = 4) {
  const currentTool = AI_TOOLS.find(tool => tool.id === currentToolId);
  if (!currentTool) return [];
  
  // Find tools in the same category, excluding the current tool
  const relatedTools = AI_TOOLS
    .filter(tool => tool.id !== currentToolId && tool.cat === currentTool.cat)
    .slice(0, limit);
  
  // If not enough tools in same category, add tools from other categories
  if (relatedTools.length < limit) {
    const additionalTools = AI_TOOLS
      .filter(tool => tool.id !== currentToolId && tool.cat !== currentTool.cat)
      .slice(0, limit - relatedTools.length);
    relatedTools.push(...additionalTools);
  }
  
  return relatedTools;
}

/* ── BLOG TO TOOLS MAPPING ── */
const BLOG_TOOL_LINKS = {
  "best-free-ai-tools-indian-students": [1, 9, 11, 8, 7, 69, 44, 20, 10, 66], // ChatGPT, Gemini, Perplexity, QuillBot, Grammarly, Wolfram Alpha, Otter.ai, Canva AI, Notion AI, Elicit
  "chatgpt-vs-gemini-india": [1, 9], // ChatGPT, Gemini
  "ai-tools-hindi-support": [1, 9, 11, 7, 8, 27, 35, 43], // ChatGPT, Gemini, Perplexity, Grammarly, QuillBot, HeyGen, ElevenLabs, Speechify
  "chatgpt-kaise-use-karein": [1, 9, 2], // ChatGPT, Gemini, Claude
  "best-ai-tools-india-2026": [1, 9, 13, 14, 25, 35, 45, 57, 11, 73, 81, 87, 93, 97], // Top tools from each category
  "midjourney-vs-dalle-comparison": [13, 14, 15, 16, 17, 18], // Image generation tools
  "ai-tools-for-business-india": [1, 9, 57, 58, 73, 74, 75, 76, 81, 82, 87, 88], // Business-focused tools
  "free-ai-tools-content-creation": [1, 9, 15, 19, 20, 39, 47, 56, 65, 96], // Free tools for creators
  "ai-content-creation-workflow-2026": [1, 9, 13, 14, 20, 25, 35, 36, 73, 76, 3, 4] // Complete workflow tools
};

/* ── TOOL TO BLOG MAPPING ── */
const TOOL_BLOG_LINKS = {
  1: ["chatgpt-vs-gemini-india", "best-free-ai-tools-indian-students", "chatgpt-kaise-use-karein"], // ChatGPT
  9: ["chatgpt-vs-gemini-india", "best-free-ai-tools-indian-students", "ai-tools-hindi-support"], // Gemini
  13: ["midjourney-vs-dalle-comparison", "best-ai-tools-india-2026"], // Midjourney
  14: ["midjourney-vs-dalle-comparison", "best-ai-tools-india-2026"], // DALL-E 3
  45: ["best-ai-tools-india-2026"], // GitHub Copilot
  46: ["best-ai-tools-india-2026"], // Cursor
  57: ["ai-tools-for-business-india", "best-ai-tools-india-2026"], // Fireflies.ai
  73: ["ai-tools-for-business-india", "best-ai-tools-india-2026"], // Surfer SEO
  81: ["ai-tools-for-business-india", "best-ai-tools-india-2026"], // Tidio
  87: ["ai-tools-for-business-india", "best-ai-tools-india-2026"] // Julius AI
};

/* ── GENERATE RELATED TOOLS HTML ── */
function generateRelatedToolsHTML(currentToolId) {
  const relatedTools = getRelatedTools(currentToolId, 4);
  if (relatedTools.length === 0) return '';
  
  const toolsHTML = relatedTools.map(tool => `
    <div class="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-matcha-600 transition">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style="background-color: ${tool.color}20; color: ${tool.color};">
          ${getToolIcon(tool.name)}
        </div>
        <div>
          <h3 class="font-bold text-sm">${tool.name}</h3>
          <span class="text-xs text-gray-500">${tool.cat}</span>
        </div>
      </div>
      <p class="text-xs text-gray-600 mb-3">${tool.desc}</p>
      <div class="flex justify-between items-center">
        <span class="text-xs font-semibold px-2 py-1 rounded ${getPricingColor(tool.pricing)}">${tool.pricing}</span>
        <a href="${tool.url}" target="_blank" class="text-xs text-matcha-600 font-semibold hover:underline">Visit →</a>
      </div>
    </div>
  `).join('');
  
  return `
    <div class="bg-clay-cream border-2 border-oat-border rounded-2xl p-6 mt-8">
      <h3 class="text-lg font-bold mb-4">Related AI Tools</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${toolsHTML}
      </div>
    </div>
  `;
}

/* ── GENERATE BLOG LINKS HTML ── */
function generateBlogLinksHTML(toolId) {
  const blogLinks = TOOL_BLOG_LINKS[toolId];
  if (!blogLinks || blogLinks.length === 0) return '';
  
  const linksHTML = blogLinks.map(blogSlug => {
    const blog = DEFAULT_BLOGS.find(b => b.url.includes(blogSlug));
    if (!blog) return '';
    
    return `
      <a href="${blog.url}" class="block text-matcha-600 font-semibold hover:underline">
        → ${blog.title}
      </a>
    `;
  }).join('');
  
  return `
    <div class="bg-matcha-600 bg-opacity-10 border-2 border-matcha-600 rounded-2xl p-6 mt-8">
      <h3 class="text-lg font-bold mb-3">Learn More</h3>
      <p class="mb-4">Read our detailed guides and tutorials:</p>
      <div class="space-y-2">
        ${linksHTML}
      </div>
    </div>
  `;
}

/* ── HELPER FUNCTIONS ── */
function getToolIcon(toolName) {
  const iconMap = {
    'ChatGPT': '🤖', 'Gemini': '💎', 'Claude': '🧠', 'Midjourney': '🎨', 'DALL·E 3': '🖼️',
    'Stable Diffusion': '🎭', 'Runway ML': '🎬', 'ElevenLabs': '🎙️', 'GitHub Copilot': '👨‍💻',
    'Cursor': '⚡', 'Fireflies.ai': '📝', 'Grammarly': '✍️', 'QuillBot': '📚', 'Perplexity AI': '🔍',
    'Wolfram Alpha': '🧮', 'Otter.ai': '🎧', 'Canva AI': '🎨', 'Notion AI': '📋', 'Elicit': '📄'
  };
  return iconMap[toolName] || '🔧';
}

function getPricingColor(pricing) {
  switch(pricing) {
    case 'Free': return 'bg-green-100 text-green-800';
    case 'Freemium': return 'bg-blue-100 text-blue-800';
    case 'Paid': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

/* ══════════════════════════════════════════════════════════════════════
   PHASE 3: PRODUCT FEATURES
   ══════════════════════════════════════════════════════════════════════
   1. Tool of the Week - Featured card with editorial
   2. Recently Added - Show newest tools
   3. Bookmarks - Save tools (Firebase)
   4. Ratings - 1-5 stars (Supabase)
   5. Improved Search - Filter by keyword + category + pricing with debounce
   ══════════════════════════════════════════════════════════════════════ */

/* ── TOOL OF THE WEEK ── */
const TOOL_OF_THE_WEEK = {
  id: 46,
  name: "Cursor",
  editorial: "Cursor is revolutionizing how developers write code. This AI-first code editor built on VS Code lets you chat with your entire codebase, making it incredibly easy to understand complex projects and ship features faster. Indian developers are loving its intelligent code completion and natural language commands."
};

/* ── RECENTLY ADDED TOOLS (last 5 tools added) ── */
const RECENTLY_ADDED_IDS = [100, 99, 98, 97, 96]; // Most recent tool IDs

/* ── DATA: 100 AI TOOLS ── */
const AI_TOOLS = [
  // WRITING (1-12)
  {id:1,name:"ChatGPT",cat:"Writing",icon:"",color:"#10a37f",desc:"The world's most popular AI chatbot for writing, Q&A, coding and creative tasks.",pricing:"Freemium",url:"https://chat.openai.com"},
  {id:2,name:"Claude",cat:"Writing",icon:"",color:"#cc785c",desc:"Anthropic's powerful AI assistant — great for long documents, analysis and nuanced writing.",pricing:"Freemium",url:"https://claude.ai"},
  {id:3,name:"Jasper AI",cat:"Writing",icon:"",color:"#5D4FFF",desc:"AI writing assistant built for marketing teams — blog posts, ads, emails at scale.",pricing:"Paid",url:"https://jasper.ai"},
  {id:4,name:"Copy.ai",cat:"Writing",icon:"",color:"#7C3AED",desc:"Generate high-converting marketing copy, product descriptions and social posts instantly.",pricing:"Freemium",url:"https://copy.ai"},
  {id:5,name:"Writesonic",cat:"Writing",icon:"",color:"#FF6B00",desc:"AI writer and SEO content platform — articles, landing pages and factual content.",pricing:"Freemium",url:"https://writesonic.com"},
  {id:6,name:"Rytr",cat:"Writing",icon:"",color:"#00B5B8",desc:"Affordable AI writer for blogs, emails, bios and 40+ use cases in 30+ languages.",pricing:"Freemium",url:"https://rytr.me"},
  {id:7,name:"Grammarly",cat:"Writing",icon:"",color:"#15C39A",desc:"AI grammar, spelling, style and tone checker — used by 30 million people daily.",pricing:"Freemium",url:"https://grammarly.com"},
  {id:8,name:"QuillBot",cat:"Writing",icon:"",color:"#00A896",desc:"AI paraphraser, summarizer and grammar fixer — perfect for students and writers.",pricing:"Freemium",url:"https://quillbot.com"},
  {id:9,name:"Gemini",cat:"Writing",icon:"",color:"#4285F4",desc:"Google's multimodal AI for writing, reasoning, coding and image understanding.",pricing:"Freemium",url:"https://gemini.google.com"},
  {id:10,name:"Notion AI",cat:"Writing",icon:"",color:"#000000",desc:"AI built into Notion — summarize, write, translate and brainstorm inside your workspace.",pricing:"Paid",url:"https://notion.so"},
  {id:11,name:"Perplexity AI",cat:"Research",icon:"",color:"#1FB8CD",desc:"AI-powered answer engine that searches the web in real-time with cited sources.",pricing:"Freemium",url:"https://perplexity.ai"},
  {id:12,name:"Sudowrite",cat:"Writing",icon:"",color:"#9333EA",desc:"AI writing partner for fiction writers — brainstorm, draft and rewrite novels.",pricing:"Paid",url:"https://sudowrite.com"},

  // IMAGE GEN (13-24)
  {id:13,name:"Midjourney",cat:"Image",icon:"",color:"#000000",desc:"World-leading text-to-image AI generating stunning artistic and photorealistic images.",pricing:"Paid",url:"https://midjourney.com"},
  {id:14,name:"DALL·E 3",cat:"Image",icon:"",color:"#10a37f",desc:"OpenAI's image generation model — create detailed images from text prompts.",pricing:"Freemium",url:"https://openai.com/dall-e-3"},
  {id:15,name:"Stable Diffusion",cat:"Image",icon:"",color:"#FF4500",desc:"Open-source AI image generator you can run locally or use via web interfaces.",pricing:"Free",url:"https://stability.ai"},
  {id:16,name:"Adobe Firefly",cat:"Image",icon:"",color:"#FF0000",desc:"Adobe's generative AI — create images, recolour vectors and generate text effects.",pricing:"Freemium",url:"https://firefly.adobe.com"},
  {id:17,name:"Leonardo AI",cat:"Image",icon:"",color:"#FFD700",desc:"AI image and video generator with fine-tuned models for game assets and art.",pricing:"Freemium",url:"https://leonardo.ai"},
  {id:18,name:"Ideogram",cat:"Image",icon:"",color:"#7C3AED",desc:"AI image generator that excels at embedding accurate text within images.",pricing:"Freemium",url:"https://ideogram.ai"},
  {id:19,name:"Bing Image Creator",cat:"Image",icon:"",color:"#0078D4",desc:"Microsoft's free DALL·E powered image creator — unlimited free generations.",pricing:"Free",url:"https://bing.com/images/create"},
  {id:20,name:"Canva AI",cat:"Image",icon:"",color:"#00C4CC",desc:"Canva's suite of AI tools — text to image, background remove, magic edit.",pricing:"Freemium",url:"https://canva.com"},
  {id:21,name:"Flux AI",cat:"Image",icon:"",color:"#6366F1",desc:"Black Forest Labs' state-of-the-art image generation model with photorealism.",pricing:"Freemium",url:"https://blackforestlabs.ai"},
  {id:22,name:"Nightcafe",cat:"Image",icon:"",color:"#1A1A2E",desc:"AI art generator with 5 different models — earn credits daily and join community.",pricing:"Freemium",url:"https://nightcafe.studio"},
  {id:23,name:"Playground AI",cat:"Image",icon:"",color:"#4F46E5",desc:"Create stunning AI images free — 1000 images/day, multiple models available.",pricing:"Freemium",url:"https://playgroundai.com"},
  {id:24,name:"Getimg.ai",cat:"Image",icon:"",color:"#EC4899",desc:"All-in-one AI image platform — generate, edit, fine-tune models and more.",pricing:"Freemium",url:"https://getimg.ai"},

  // VIDEO (25-34)
  {id:25,name:"Runway ML",cat:"Video",icon:"",color:"#000000",desc:"Professional AI video generation and editing — Gen-2 model creates video from text.",pricing:"Freemium",url:"https://runwayml.com"},
  {id:26,name:"Pika Labs",cat:"Video",icon:"",color:"#FF6B6B",desc:"AI video generator — create and edit short videos from images or text prompts.",pricing:"Freemium",url:"https://pika.art"},
  {id:27,name:"HeyGen",cat:"Video",icon:"",color:"#4F46E5",desc:"Create AI avatar videos with realistic lip-sync in 175+ languages — no camera needed.",pricing:"Freemium",url:"https://heygen.com"},
  {id:28,name:"Synthesia",cat:"Video",icon:"",color:"#0EA5E9",desc:"Enterprise AI video platform — create presenter videos from text in 120+ languages.",pricing:"Paid",url:"https://synthesia.io"},
  {id:29,name:"Invideo AI",cat:"Video",icon:"",color:"#FF6B00",desc:"Text-to-video maker with voiceover, stock footage and automatic editing.",pricing:"Freemium",url:"https://invideo.io"},
  {id:30,name:"D-ID",cat:"Video",icon:"",color:"#7C3AED",desc:"Animate photos and create AI talking head videos for marketing and education.",pricing:"Freemium",url:"https://d-id.com"},
  {id:31,name:"Kling AI",cat:"Video",icon:"",color:"#000000",desc:"Kuaishou's powerful text-to-video and image-to-video AI with 5-second clips.",pricing:"Freemium",url:"https://klingai.com"},
  {id:32,name:"Luma Dream Machine",cat:"Video",icon:"",color:"#9333EA",desc:"High-quality AI video generation from text and images with smooth motion.",pricing:"Freemium",url:"https://lumalabs.ai/dream-machine"},
  {id:33,name:"Descript",cat:"Video",icon:"",color:"#22D3EE",desc:"Edit video and podcast by editing text — AI removes filler words, overdub voices.",pricing:"Freemium",url:"https://descript.com"},
  {id:34,name:"Opus Clip",cat:"Video",icon:"",color:"#FF4500",desc:"AI clips long videos into viral short clips for TikTok, Reels and YouTube Shorts.",pricing:"Freemium",url:"https://opus.pro"},

  // AUDIO (35-44)
  {id:35,name:"ElevenLabs",cat:"Audio",icon:"",color:"#FF6B00",desc:"Most realistic AI voice generator — clone voices, text-to-speech in 29 languages.",pricing:"Freemium",url:"https://elevenlabs.io"},
  {id:36,name:"Suno AI",cat:"Audio",icon:"",color:"#7C3AED",desc:"AI music generator that creates complete songs with vocals from a text prompt.",pricing:"Freemium",url:"https://suno.com"},
  {id:37,name:"Mubert",cat:"Audio",icon:"",color:"#4F46E5",desc:"AI-generated royalty-free music for videos, podcasts and apps — stream or download.",pricing:"Freemium",url:"https://mubert.com"},
  {id:38,name:"Udio",cat:"Audio",icon:"",color:"#EC4899",desc:"AI music creation platform — generate high-quality songs and extend tracks.",pricing:"Freemium",url:"https://udio.com"},
  {id:39,name:"Adobe Podcast",cat:"Audio",icon:"",color:"#FF0000",desc:"AI audio tool — enhance speech quality, remove noise and transcribe podcasts.",pricing:"Free",url:"https://podcast.adobe.com"},
  {id:40,name:"Lovo.ai",cat:"Audio",icon:"",color:"#22C55E",desc:"Studio-quality AI voices and video creation platform with 500+ voice options.",pricing:"Freemium",url:"https://lovo.ai"},
  {id:41,name:"Resemble AI",cat:"Audio",icon:"",color:"#6366F1",desc:"Custom AI voice cloning — create a voice model from 3 minutes of audio.",pricing:"Paid",url:"https://resemble.ai"},
  {id:42,name:"Soundraw",cat:"Audio",icon:"",color:"#F59E0B",desc:"AI music generation for creators — customize mood, genre, length and instruments.",pricing:"Freemium",url:"https://soundraw.io"},
  {id:43,name:"Speechify",cat:"Audio",icon:"",color:"#10B981",desc:"Convert any text to natural-sounding audio — articles, PDFs, emails and more.",pricing:"Freemium",url:"https://speechify.com"},
  {id:44,name:"Otter.ai",cat:"Audio",icon:"",color:"#3B82F6",desc:"AI meeting assistant — records, transcribes and summarises meetings in real time.",pricing:"Freemium",url:"https://otter.ai"},

  // CODING (45-56)
  {id:45,name:"GitHub Copilot",cat:"Coding",icon:"",color:"#000000",desc:"AI pair programmer — suggests code, functions and fixes right in your editor.",pricing:"Paid",url:"https://github.com/features/copilot"},
  {id:46,name:"Cursor",cat:"Coding",icon:"",color:"#000000",desc:"AI-first code editor built on VS Code — chat with your codebase and ship faster.",pricing:"Freemium",url:"https://cursor.com/learn"},
  {id:47,name:"Codeium",cat:"Coding",icon:"",color:"#22C55E",desc:"Free AI code completion for 70+ languages — works in all popular IDEs.",pricing:"Free",url:"https://codeium.com"},
  {id:48,name:"Tabnine",cat:"Coding",icon:"",color:"#3B82F6",desc:"AI code completion that learns your codebase — runs locally for full privacy.",pricing:"Freemium",url:"https://tabnine.com"},
  {id:49,name:"Replit AI",cat:"Coding",icon:"",color:"#F97316",desc:"AI-powered cloud IDE — build, run and deploy apps with AI assistance in browser.",pricing:"Freemium",url:"https://replit.com"},
  {id:50,name:"Phind",cat:"Coding",icon:"",color:"#7C3AED",desc:"AI search engine for developers — instant answers for coding questions with context.",pricing:"Freemium",url:"https://phind.com"},
  {id:51,name:"Bolt.new",cat:"Coding",icon:"",color:"#000000",desc:"Prompt, run, edit and deploy full-stack web apps with AI from your browser.",pricing:"Freemium",url:"https://bolt.new"},
  {id:52,name:"v0 by Vercel",cat:"Coding",icon:"",color:"#000000",desc:"Generate UI components with AI using shadcn/ui and Tailwind CSS from prompts.",pricing:"Freemium",url:"https://v0.dev"},
  {id:53,name:"Lovable",cat:"Coding",icon:"",color:"#EC4899",desc:"AI full-stack engineer — describe your app idea and get working code instantly.",pricing:"Freemium",url:"https://lovable.dev"},
  {id:54,name:"Amazon CodeWhisperer",cat:"Coding",icon:"",color:"#FF9900",desc:"AWS AI coding companion — code suggestions, security scans and CLI completions.",pricing:"Free",url:"https://aws.amazon.com/codewhisperer"},
  {id:55,name:"Windsurf",cat:"Coding",icon:"",color:"#06B6D4",desc:"Codeium's agentic IDE — AI that flows with you, understanding your entire codebase.",pricing:"Freemium",url:"https://codeium.com/windsurf"},
  {id:56,name:"Blackbox AI",cat:"Coding",icon:"",color:"#111827",desc:"AI coding assistant with code search, generation and chat — free forever.",pricing:"Free",url:"https://blackbox.ai"},

  // PRODUCTIVITY (57-65)
  {id:57,name:"Fireflies.ai",cat:"Productivity",icon:"",color:"#6366F1",desc:"AI notetaker for meetings — transcribes Zoom, Teams and Google Meet automatically.",pricing:"Freemium",url:"https://fireflies.ai"},
  {id:58,name:"Motion",cat:"Productivity",icon:"",color:"#7C3AED",desc:"AI calendar that automatically plans your day and schedules tasks by priority.",pricing:"Paid",url:"https://usemotion.com"},
  {id:59,name:"Reclaim.ai",cat:"Productivity",icon:"",color:"#22C55E",desc:"AI scheduling app — automatically finds best meeting times and protects focus time.",pricing:"Freemium",url:"https://reclaim.ai"},
  {id:60,name:"Taskade",cat:"Productivity",icon:"",color:"#7C3AED",desc:"AI-powered project management — tasks, notes, docs and video calls in one place.",pricing:"Freemium",url:"https://taskade.com"},
  {id:61,name:"Mem.ai",cat:"Productivity",icon:"",color:"#3B82F6",desc:"AI-powered workspace that organises your notes automatically as you write.",pricing:"Freemium",url:"https://mem.ai"},
  {id:62,name:"Tome",cat:"Productivity",icon:"",color:"#1A1A2E",desc:"AI presentation maker — generate entire decks from a prompt in seconds.",pricing:"Freemium",url:"https://tome.app"},
  {id:63,name:"Gamma",cat:"Productivity",icon:"",color:"#9333EA",desc:"AI presentation, doc and webpage creator — beautiful outputs in 30 seconds.",pricing:"Freemium",url:"https://gamma.app"},
  {id:64,name:"Beautiful.ai",cat:"Productivity",icon:"",color:"#EC4899",desc:"AI-powered presentation software that designs slides for you automatically.",pricing:"Paid",url:"https://beautiful.ai"},
  {id:65,name:"Magical",cat:"Productivity",icon:"",color:"#7C3AED",desc:"AI text expander and autofill — write messages 40% faster across any website.",pricing:"Free",url:"https://magical.so"},

  // RESEARCH (66-72)
  {id:66,name:"Elicit",cat:"Research",icon:"",color:"#4F46E5",desc:"AI research assistant — finds and summarises academic papers on any topic.",pricing:"Freemium",url:"https://elicit.org"},
  {id:67,name:"Consensus",cat:"Research",icon:"",color:"#10B981",desc:"AI search engine for scientific research — extracts findings from 200M+ papers.",pricing:"Freemium",url:"https://consensus.app"},
  {id:68,name:"Scholarcy",cat:"Research",icon:"",color:"#F59E0B",desc:"AI that reads academic papers and creates structured summaries and flashcards.",pricing:"Freemium",url:"https://scholarcy.com"},
  {id:69,name:"Wolfram Alpha",cat:"Research",icon:"",color:"#FF6B00",desc:"Computational intelligence engine — answers mathematical, scientific and factual queries.",pricing:"Freemium",url:"https://wolframalpha.com"},
  {id:70,name:"Khanmigo",cat:"Research",icon:"",color:"#14B8A6",desc:"Khan Academy's AI tutor — personalised learning help for students of all levels.",pricing:"Paid",url:"https://khanacademy.org/khan-labs"},
  {id:71,name:"Explainpaper",cat:"Research",icon:"",color:"#6366F1",desc:"Upload academic papers and ask questions — AI explains complex research simply.",pricing:"Freemium",url:"https://explainpaper.com"},
  {id:72,name:"SciSpace",cat:"Research",icon:"",color:"#4F46E5",desc:"AI copilot for research — read papers, get explanations and find related work.",pricing:"Freemium",url:"https://typeset.io"},

  // MARKETING (73-80)
  {id:73,name:"Surfer SEO",cat:"Marketing",icon:"",color:"#FF6B00",desc:"AI SEO platform — content editor, keyword research and SERP analyser in one.",pricing:"Paid",url:"https://surferseo.com"},
  {id:74,name:"Semrush",cat:"Marketing",icon:"",color:"#FF6B00",desc:"All-in-one digital marketing toolkit with AI writing, SEO and competitor analysis.",pricing:"Paid",url:"https://semrush.com"},
  {id:75,name:"AdCreative.ai",cat:"Marketing",icon:"",color:"#7C3AED",desc:"AI ad creative generator — create conversion-optimised banners and social ads.",pricing:"Paid",url:"https://adcreative.ai"},
  {id:76,name:"Predis.ai",cat:"Marketing",icon:"",color:"#EC4899",desc:"AI social media content generator — posts, carousels, reels and competitor analysis.",pricing:"Freemium",url:"https://predis.ai"},
  {id:77,name:"FeedHive",cat:"Marketing",icon:"",color:"#8B5CF6",desc:"AI social media scheduler with performance prediction and content recycling.",pricing:"Paid",url:"https://feedhive.io"},
  {id:78,name:"Frase",cat:"Marketing",icon:"",color:"#10B981",desc:"AI SEO content tool — research, outline, write and optimise articles in one place.",pricing:"Paid",url:"https://frase.io"},
  {id:79,name:"Pencil",cat:"Marketing",icon:"",color:"#F59E0B",desc:"AI ad generator — create Facebook and Google ads 10x faster with AI predictions.",pricing:"Freemium",url:"https://trypencil.com"},
  {id:80,name:"Buffer AI",cat:"Marketing",icon:"",color:"#3B82F6",desc:"Social media management with AI assistant to create posts and reply to comments.",pricing:"Freemium",url:"https://buffer.com"},

  // CHATBOTS (81-86)
  {id:81,name:"Tidio",cat:"Chatbot",icon:"",color:"#7C3AED",desc:"AI chatbot for e-commerce — automates customer support and boosts conversions.",pricing:"Freemium",url:"https://tidio.com"},
  {id:82,name:"Intercom",cat:"Chatbot",icon:"",color:"#4F46E5",desc:"AI customer service platform — Fin AI resolves support tickets automatically.",pricing:"Paid",url:"https://intercom.com"},
  {id:83,name:"CustomGPT",cat:"Chatbot",icon:"",color:"#10B981",desc:"Build custom ChatGPT-powered chatbots from your own business content in minutes.",pricing:"Paid",url:"https://customgpt.ai"},
  {id:84,name:"Botpress",cat:"Chatbot",icon:"",color:"#22C55E",desc:"Open-source AI chatbot builder — deploy to any channel with built-in LLM support.",pricing:"Freemium",url:"https://botpress.com"},
  {id:85,name:"Landbot",cat:"Chatbot",icon:"",color:"#3B82F6",desc:"No-code chatbot builder — create conversational experiences for lead generation.",pricing:"Freemium",url:"https://landbot.io"},
  {id:86,name:"Voiceflow",cat:"Chatbot",icon:"",color:"#7C3AED",desc:"Design, prototype and launch AI chatbots and voice assistants for any platform.",pricing:"Freemium",url:"https://voiceflow.com"},

  // DATA (87-92)
  {id:87,name:"Julius AI",cat:"Data",icon:"",color:"#3B82F6",desc:"AI data analyst — upload CSV/Excel, ask questions and get insights in natural language.",pricing:"Freemium",url:"https://julius.ai"},
  {id:88,name:"Obviously AI",cat:"Data",icon:"",color:"#7C3AED",desc:"Build machine learning models in minutes without code — predict customer behaviour.",pricing:"Paid",url:"https://obviously.ai"},
  {id:89,name:"Akkio",cat:"Data",icon:"",color:"#10B981",desc:"No-code AI platform for business analysts — forecasting, segmentation and chat analytics.",pricing:"Paid",url:"https://akkio.com"},
  {id:90,name:"Polymer",cat:"Data",icon:"",color:"#EC4899",desc:"AI-powered database and BI tool — create charts and stories from spreadsheet data.",pricing:"Freemium",url:"https://polymersearch.com"},
  {id:91,name:"Tableau AI",cat:"Data",icon:"",color:"#E97627",desc:"Tableau's Einstein AI features — ask data questions in natural language and get viz.",pricing:"Paid",url:"https://tableau.com"},
  {id:92,name:"DataRobot",cat:"Data",icon:"",color:"#FF4500",desc:"Enterprise AI platform for building, deploying and monitoring ML models at scale.",pricing:"Paid",url:"https://datarobot.com"},

  // DESIGN (93-96)
  {id:93,name:"Uizard",cat:"Design",icon:"",color:"#FF6B6B",desc:"AI UI design tool — turn screenshots or text prompts into editable wireframes.",pricing:"Freemium",url:"https://uizard.io"},
  {id:94,name:"Framer AI",cat:"Design",icon:"",color:"#0055FF",desc:"AI website builder — describe your site and Framer generates and publishes it.",pricing:"Freemium",url:"https://framer.com"},
  {id:95,name:"Looka",cat:"Design",icon:"",color:"#4F46E5",desc:"AI logo and brand identity generator — create professional logos in minutes.",pricing:"Paid",url:"https://looka.com"},
  {id:96,name:"Khroma",cat:"Design",icon:"",color:"#FF6B00",desc:"AI colour tool that learns your preferences and generates infinite palettes.",pricing:"Free",url:"https://khroma.co"},

  // FINANCE (97-100)
  {id:97,name:"Finchat",cat:"Finance",icon:"",color:"#10B981",desc:"AI for stock analysis — chat with financial data, earnings calls and SEC filings.",pricing:"Freemium",url:"https://finchat.io"},
  {id:98,name:"AlphaSense",cat:"Finance",icon:"",color:"#4F46E5",desc:"AI market intelligence platform — search earnings calls, filings and news instantly.",pricing:"Paid",url:"https://alpha-sense.com"},
  {id:99,name:"Kensho",cat:"Finance",icon:"",color:"#22C55E",desc:"S&P Global's AI platform for financial data extraction and market analytics.",pricing:"Paid",url:"https://kensho.com"},
  {id:100,name:"Domo AI",cat:"Finance",icon:"",color:"#FF6B00",desc:"Business intelligence cloud with AI-driven insights and real-time data dashboards.",pricing:"Paid",url:"https://domo.com"},
];

/* ── DEFAULT BLOG DATA ── */
const DEFAULT_BLOGS = [
  {id:1,tag:"students",emoji:"📚",bg:"linear-gradient(135deg,#4F46E5,#7C3AED)",
   title:"Best Free AI Tools for Indian Students in 2026",
   excerpt:"Discover 10 free AI tools that will help you study smarter, write better essays, and ace your exams.",
   date:"Apr 22, 2026",read:"6 min read",author:"IndiaKaAI Team",
   url:"/blog/best-free-ai-tools-indian-students.html",
   content:`<p>As a student in India, you have access to some of the most powerful AI tools ever built — and many of them are completely free. Whether you're preparing for JEE, NEET, board exams, or college assignments, these tools can save you hours every week.</p><h2>1. ChatGPT (Free Tier)</h2><p>ChatGPT by OpenAI is the most versatile AI tool for students. Use it to explain complex topics in simple language, generate essay outlines, solve math problems step-by-step, or even practice for interviews. The free tier (GPT-3.5) is more than enough for most student needs.</p><h2>2. Google Gemini</h2><p>Gemini is Google's answer to ChatGPT and it's deeply integrated with Google Workspace. If you use Google Docs or Gmail, Gemini can help you write, summarise, and research without leaving your browser. The free version is excellent for everyday academic tasks.</p><h2>3. QuillBot</h2><p>QuillBot is a must-have for students who write essays and reports. Its paraphrasing tool helps you rewrite content in your own words, while the summariser condenses long articles into key points. The grammar checker catches errors that even spell-check misses.</p><h2>4. Perplexity AI</h2><p>Think of Perplexity as a smarter Google. It searches the web in real-time and gives you cited, accurate answers — perfect for research assignments. Unlike ChatGPT, it always shows you the sources so you can verify information and use them in your bibliography.</p><h2>5. Grammarly</h2><p>Grammarly's free browser extension checks your grammar, spelling, and tone across every website — Gmail, Google Docs, WhatsApp Web, and more. For students writing in English, it's an invisible editor that makes your writing sound more professional.</p><h2>6. Bing Image Creator</h2><p>Need visuals for a presentation? Bing Image Creator (powered by DALL·E) lets you generate unlimited free images from text descriptions. Create diagrams, illustrations, and concept art for your projects without any design skills.</p><h2>7. Wolfram Alpha</h2><p>Wolfram Alpha is the ultimate tool for STEM students. It solves equations, plots graphs, explains chemistry reactions, and answers factual questions with step-by-step working. It's like having a maths tutor available 24/7.</p><h2>8. Notion AI</h2><p>Notion's free plan with AI features lets you organise your notes, create study schedules, and summarise lecture notes. Many students use it as their second brain — everything from class notes to project timelines in one place.</p><h2>9. Otter.ai</h2><p>Otter.ai transcribes lectures and meetings in real-time. If you attend online classes or record your professors, Otter converts the audio to searchable text automatically. The free plan gives you 300 minutes of transcription per month.</p><h2>10. Elicit</h2><p>Elicit is built specifically for academic research. It searches through millions of research papers and extracts the key findings relevant to your question. For literature reviews and research projects, it saves hours of manual reading.</p><h2>Final Thoughts</h2><p>You don't need to spend a single rupee to access world-class AI tools as a student. Start with ChatGPT and Grammarly for daily use, add Perplexity for research, and use Wolfram Alpha for STEM subjects. These tools won't do your work for you — but they'll make you significantly more efficient and effective.</p>`},
  {id:2,tag:"tools",emoji:"🤖",bg:"linear-gradient(135deg,#10a37f,#065F46)",
   title:"ChatGPT vs Gemini: Which is Better for India?",
   excerpt:"Detailed comparison of ChatGPT and Google Gemini for Indian users, including pricing and features.",
   date:"Apr 23, 2026",read:"8 min read",author:"IndiaKaAI Team",
   url:"/blog/chatgpt-vs-gemini-india.html",
   content:`<p>Two AI giants are competing for your attention — ChatGPT from OpenAI and Gemini from Google. Both are powerful, both have free tiers, and both work well in India. But which one should you use? Let's break it down.</p><h2>Pricing in India</h2><p>ChatGPT's free tier uses GPT-3.5, which is capable but limited. ChatGPT Plus costs $20/month (roughly ₹1,660), which is steep for most Indian users. Gemini's free tier uses Gemini 1.5 Flash, and Gemini Advanced costs ₹1,950/month but is included in Google One AI Premium — which also gives you 2TB storage.</p><h2>Language Support</h2><p>Both tools support Hindi and other Indian languages, but Gemini has a slight edge here because it's trained on more multilingual data from Google Search. For Hindi content creation, Gemini produces more natural-sounding text. ChatGPT is better for English-heavy tasks.</p><h2>Internet Access</h2><p>Gemini searches the web by default in its free tier — a huge advantage for current events and research. ChatGPT's free tier has no internet access; you need Plus for browsing. For Indian users who want up-to-date information without paying, Gemini wins.</p><h2>Google Integration</h2><p>If you use Gmail, Google Docs, Google Drive, or YouTube, Gemini is deeply integrated. It can summarise your emails, help draft documents, and even analyse files in your Drive. ChatGPT has no such native integration with Google services.</p><h2>Coding Ability</h2><p>ChatGPT (especially GPT-4) is widely considered the better coding assistant. It handles complex debugging, explains code clearly, and supports more programming languages. Gemini is catching up but still trails for serious development work.</p><h2>Image Understanding</h2><p>Both can analyse images you upload. Gemini handles this in the free tier; ChatGPT requires Plus. For students who want to photograph textbook problems and get explanations, Gemini's free image analysis is a significant advantage.</p><h2>Verdict for Indian Users</h2><p>Use <strong>Gemini</strong> if you want free internet access, Google integration, and Hindi support. Use <strong>ChatGPT</strong> if you need the best coding help, creative writing, or are willing to pay for GPT-4's superior reasoning. Many power users use both — Gemini for research and quick tasks, ChatGPT for deep work.</p>`},
  {id:3,tag:"news",emoji:"🇮🇳",bg:"linear-gradient(135deg,#FF6B00,#FF8C00)",
   title:"Top AI Tools with Hindi Language Support",
   excerpt:"AI tools that work perfectly in Hindi - for content creation, translation, and more.",
   date:"Apr 24, 2026",read:"5 min read",author:"IndiaKaAI Team",
   url:"/blog/ai-tools-hindi-support.html",
   content:`<p>Hindi is spoken by over 600 million people, yet most AI tools are built primarily for English. The good news: in 2026, several top AI tools now offer excellent Hindi support. Here are the best ones.</p><h2>ChatGPT — Best for Hindi Conversations</h2><p>ChatGPT understands and responds in Hindi fluently. You can ask questions, get explanations, write essays, and even have full conversations in Hindi. Just type in Hindi (Devanagari script or Hinglish) and it responds naturally. It's the most versatile Hindi AI tool available.</p><h2>Google Gemini — Best for Hindi + Google Integration</h2><p>Gemini is trained on massive amounts of Hindi web content, making it particularly strong for Indian context. It understands regional references, idioms, and cultural nuances better than most tools. Combined with Google Search integration, it's ideal for Hindi research.</p><h2>ElevenLabs — Best for Hindi Voice</h2><p>ElevenLabs offers realistic Hindi text-to-speech voices. Content creators making Hindi YouTube videos or podcasts can use it to generate professional voiceovers without recording equipment. The Hindi voices sound natural and expressive.</p><h2>HeyGen — Best for Hindi Video Avatars</h2><p>HeyGen lets you create AI avatar videos that speak Hindi with lip-sync. Educators and businesses creating Hindi training videos or explainers can produce professional content without a camera or studio.</p><h2>Speechify — Best for Hindi Audio Reading</h2><p>Speechify converts Hindi text — articles, PDFs, books — into audio. If you prefer listening to reading, or want to consume Hindi content while commuting, Speechify is the tool for you.</p><h2>QuillBot — Best for Hindi Paraphrasing</h2><p>QuillBot's paraphrasing tool works reasonably well with Hindi text. Students writing Hindi essays can use it to rephrase content and improve their writing style.</p><h2>Tips for Using AI in Hindi</h2><p>Most AI tools work better when you're consistent with your script — either use Devanagari throughout or Hinglish throughout, not a mix. For best results with ChatGPT and Gemini, start your conversation in Hindi and the AI will maintain that language throughout the session.</p>`},
  {id:4,tag:"students",emoji:"💡",bg:"linear-gradient(135deg,#10B981,#059669)",
   title:"ChatGPT Kaise Use Karein - Complete Guide",
   excerpt:"ChatGPT ko Hindi mein kaise use karein - step by step guide with examples.",
   date:"Apr 25, 2026",read:"7 min read",author:"IndiaKaAI Team",
   url:"/blog/chatgpt-kaise-use-karein.html",
   content:`<p>ChatGPT ek powerful AI tool hai jo aapki study, writing, aur daily tasks mein madad kar sakta hai. Is guide mein hum step-by-step dekhenge ki ChatGPT ko kaise use karein.</p><h2>Step 1: Account Banayein</h2><p>chat.openai.com par jaayein aur "Sign Up" par click karein. Aap apni email ya Google account se register kar sakte hain. Free account mein GPT-3.5 milta hai jo beginners ke liye kaafi hai.</p><h2>Step 2: Pehla Prompt Likhein</h2><p>Chat box mein apna sawaal ya request likhein. Example: "Mujhe photosynthesis ke baare mein simple language mein samjhao" ya "Write a 500-word essay on climate change in India." ChatGPT turant jawab dega.</p><h2>Step 3: Better Prompts Likhna Seekhein</h2><p>ChatGPT ka output aapke prompt ki quality par depend karta hai. Vague prompts se vague answers milte hain. Specific prompts likhein: context do, format specify karein, aur audience batayein. Example: "Main ek 10th class student hoon. Mujhe Newton's laws of motion ko 3 real-life examples ke saath samjhao."</p><h2>Step 4: Follow-up Questions Poochein</h2><p>ChatGPT conversation yaad rakhta hai. Agar koi cheez samajh nahi aayi, toh seedha poochein: "Yeh point aur detail mein samjhao" ya "Iska ek aur example do." Conversation continue karte rahein jab tak aapko poori clarity na mil jaaye.</p><h2>Study ke liye Best Use Cases</h2><p><strong>Essay writing:</strong> Outline generate karwayein, phir khud likhein. <strong>Doubt clearing:</strong> Koi bhi concept explain karwayein. <strong>Practice questions:</strong> "Mujhe is topic par 10 MCQ questions do" likhein. <strong>Summarisation:</strong> Long notes paste karein aur summary maangein. <strong>Translation:</strong> English content ko Hindi mein translate karwayein.</p><h2>Important Warnings</h2><p>ChatGPT kabhi kabhi galat information de sakta hai — ise "hallucination" kehte hain. Important facts ko hamesha verify karein. Exams ke liye ChatGPT ke answers ko directly copy mat karein — samjhein aur apne words mein likhein.</p><h2>Free vs Paid</h2><p>Free tier (GPT-3.5) most students ke liye sufficient hai. Agar aapko latest GPT-4o model chahiye with image analysis aur better reasoning, toh ChatGPT Plus ($20/month) consider karein. Lekin pehle free version try karein.</p>`},
  {id:5,tag:"tools",emoji:"🎯",bg:"linear-gradient(135deg,#F59E0B,#D97706)",
   title:"Best AI Tools in India 2026 - Complete List",
   excerpt:"The ultimate guide to AI tools available in India, with pricing in INR and local alternatives.",
   date:"Apr 26, 2026",read:"10 min read",author:"IndiaKaAI Team",
   url:"/blog/best-ai-tools-india-2026.html",
   content:`<p>India's AI adoption is accelerating faster than almost any other country. In 2026, Indian users have access to world-class AI tools — many with INR pricing, UPI payment support, and Hindi language capabilities. Here's the definitive list.</p><h2>Best AI Writing Tools</h2><p><strong>ChatGPT</strong> remains the king for writing, coding, and general tasks. The free tier is excellent; Plus at ₹1,660/month unlocks GPT-4o. <strong>Gemini</strong> is Google's strong alternative with free internet access. <strong>Claude</strong> by Anthropic excels at long-form writing and document analysis — great for professionals.</p><h2>Best AI Image Tools</h2><p><strong>Midjourney</strong> produces the most artistic images but requires a Discord account and costs $10/month. <strong>DALL·E 3</strong> is accessible through ChatGPT Plus. <strong>Adobe Firefly</strong> is the safest choice for commercial use since it's trained on licensed content — important for Indian businesses.</p><h2>Best AI Video Tools</h2><p><strong>InVideo AI</strong> is particularly popular in India for creating YouTube and social media videos. It has INR pricing and Hindi voiceover support. <strong>HeyGen</strong> is the go-to for creating AI avatar videos in Indian languages.</p><h2>Best AI Coding Tools</h2><p><strong>GitHub Copilot</strong> at $10/month is the industry standard. <strong>Cursor</strong> is the rising star — an AI-first code editor that many Indian developers are switching to. <strong>Codeium</strong> is completely free and works across all major IDEs.</p><h2>Best AI Productivity Tools</h2><p><strong>Notion AI</strong> is excellent for note-taking and project management. <strong>Fireflies.ai</strong> automatically transcribes your Zoom and Google Meet calls — a game-changer for remote teams. <strong>Gamma</strong> creates beautiful presentations from text in seconds.</p><h2>Payment Methods Available in India</h2><p>Most major AI tools now accept international credit/debit cards (Visa, Mastercard). Some accept UPI through third-party services. For tools that don't accept Indian cards directly, a Wise or Niyo card works well. Always check if the tool has an India-specific pricing page — some offer discounts for Indian users.</p><h2>Our Top 5 Picks for Indian Users</h2><p>1. <strong>Gemini</strong> — Best free all-rounder with Google integration. 2. <strong>ChatGPT</strong> — Best for writing and coding. 3. <strong>InVideo AI</strong> — Best for video content with Hindi support. 4. <strong>Codeium</strong> — Best free coding assistant. 5. <strong>Fireflies.ai</strong> — Best for meeting productivity.</p>`},
  {id:6,tag:"tools",emoji:"🎨",bg:"linear-gradient(135deg,#7C3AED,#5B21B6)",
   title:"Midjourney vs DALL-E 3: Which AI Image Generator to Choose?",
   excerpt:"Compare features, pricing, and image quality of the two leading AI image generators.",
   date:"Apr 27, 2026",read:"8 min read",author:"IndiaKaAI Team",
   url:"/blog/midjourney-vs-dalle-comparison.html",
   content:`<p>AI image generation has transformed creative work. Two tools dominate the space: Midjourney and DALL·E 3. Both produce stunning images, but they have very different strengths, workflows, and pricing. Here's a detailed comparison for Indian users.</p><h2>Image Quality</h2><p><strong>Midjourney</strong> consistently produces the most aesthetically pleasing, artistic images. Its outputs have a distinctive painterly quality that designers and artists love. It excels at portraits, landscapes, and stylised art. <strong>DALL·E 3</strong> is better at following precise instructions and generating images with accurate text. If you need an image that matches a very specific description, DALL·E 3 is more reliable.</p><h2>Ease of Use</h2><p>DALL·E 3 wins here. It's integrated directly into ChatGPT — just describe what you want in plain English and it generates the image. No special syntax needed. Midjourney requires using Discord, learning prompt syntax, and understanding parameters like --ar (aspect ratio) and --v (version). There's a learning curve.</p><h2>Pricing</h2><p>Midjourney starts at $10/month for ~200 images. DALL·E 3 is included in ChatGPT Plus ($20/month) with limited generations, or you can use it via the OpenAI API. For Indian users, Bing Image Creator offers free DALL·E 3 generations — an excellent option to try before paying.</p><h2>Commercial Use</h2><p>Both allow commercial use of generated images for paid subscribers. However, Adobe Firefly is the safest choice for commercial projects since it's trained exclusively on licensed content, eliminating copyright concerns.</p><h2>Style Variety</h2><p>Midjourney has a wider range of artistic styles and produces more visually impressive results for creative projects. DALL·E 3 is more versatile for practical use cases like product mockups, presentations, and illustrations.</p><h2>Which Should You Choose?</h2><p>Choose <strong>Midjourney</strong> if you're a designer, artist, or content creator who wants the highest quality artistic images and is willing to learn the tool. Choose <strong>DALL·E 3</strong> (via ChatGPT or Bing) if you want ease of use, accurate prompt following, and don't want to learn a new platform. For free options, try <strong>Bing Image Creator</strong> (DALL·E 3) or <strong>Leonardo AI</strong> which offers generous free credits.</p>`},
  {id:7,tag:"money",emoji:"💼",bg:"linear-gradient(135deg,#EC4899,#BE185D)",
   title:"AI Tools for Small Businesses in India",
   excerpt:"Affordable AI tools that can help Indian small businesses automate and grow.",
   date:"Apr 28, 2026",read:"9 min read",author:"IndiaKaAI Team",
   url:"/blog/ai-tools-for-business-india.html",
   content:`<p>Running a small business in India is challenging — tight budgets, limited staff, and fierce competition. AI tools can level the playing field by automating repetitive tasks, improving customer service, and helping you create professional content at a fraction of the cost.</p><h2>Customer Support — Tidio</h2><p>Tidio's AI chatbot can handle common customer queries 24/7 without human intervention. For e-commerce businesses, it can answer questions about orders, returns, and product details automatically. The free plan handles up to 50 conversations/month — enough for small businesses starting out.</p><h2>Social Media — Predis.ai</h2><p>Predis.ai is built for Indian businesses. It generates social media posts, carousels, and reels in Hindi and English, and even analyses your competitors. The free plan gives you 15 posts/month. For businesses that need consistent social media presence without a dedicated team, it's invaluable.</p><h2>Meetings & Notes — Fireflies.ai</h2><p>If your business runs on calls and meetings, Fireflies.ai automatically records, transcribes, and summarises every meeting. No more manual note-taking. The free plan gives you unlimited transcription storage and is sufficient for most small teams.</p><h2>Content Writing — ChatGPT or Jasper</h2><p>Use ChatGPT (free) to write product descriptions, email campaigns, and blog posts. For businesses that need more structured marketing copy at scale, Jasper AI offers templates specifically for ads, landing pages, and social media.</p><h2>SEO — Surfer SEO or Frase</h2><p>If your business relies on organic search traffic, AI SEO tools can dramatically improve your content's ranking. Surfer SEO analyses top-ranking pages and tells you exactly what to include in your content. It's an investment but pays off quickly in organic traffic.</p><h2>Design — Canva AI</h2><p>Canva's AI features (Magic Design, text-to-image, background remover) make professional design accessible to non-designers. Create logos, banners, social posts, and presentations without hiring a graphic designer. The free plan is generous.</p><h2>ROI for Indian SMBs</h2><p>A typical small business spending ₹5,000-10,000/month on these tools can save 20-30 hours of work per week. That's the equivalent of a part-time employee. Start with free tiers, measure the impact, and upgrade only what delivers clear value.</p>`},
  {id:8,tag:"money",emoji:"🎬",bg:"linear-gradient(135deg,#06B6D4,#0284C7)",
   title:"Free AI Tools for Content Creators in 2026",
   excerpt:"Create videos, images, and written content using these completely free AI tools.",
   date:"Apr 29, 2026",read:"7 min read",author:"IndiaKaAI Team",
   url:"/blog/free-ai-tools-content-creation.html",
   content:`<p>You don't need a big budget to create professional content in 2026. These completely free AI tools cover every aspect of content creation — from writing and images to video and audio.</p><h2>Writing — ChatGPT Free</h2><p>ChatGPT's free tier is the best starting point for any content creator. Use it to brainstorm ideas, write first drafts, create captions, and repurpose content across formats. Pair it with Grammarly (also free) for polished, error-free writing.</p><h2>Images — Bing Image Creator</h2><p>Microsoft's Bing Image Creator gives you unlimited free AI image generation powered by DALL·E 3. Create thumbnails, social media graphics, blog illustrations, and more. No account needed beyond a Microsoft login.</p><h2>Video — CapCut AI</h2><p>CapCut's free AI features include auto-captions, background removal, AI effects, and smart cut. It's the most popular video editing app among Indian content creators and the AI features are genuinely useful for Reels and Shorts.</p><h2>Audio — Adobe Podcast Enhance</h2><p>Adobe Podcast's Enhance Speech tool is completely free and removes background noise from any audio recording. If you record voiceovers or podcasts in a noisy environment, this tool makes them sound studio-quality instantly.</p><h2>Music — Suno AI Free Tier</h2><p>Suno AI lets you generate complete songs with vocals from a text prompt. The free tier gives you 50 credits/day — enough to create background music for your videos without copyright issues.</p><h2>Thumbnails & Design — Canva Free</h2><p>Canva's free plan includes AI-powered Magic Design, which generates complete design layouts from a prompt. For YouTube thumbnails, Instagram posts, and presentation slides, it's the most accessible design tool available.</p><h2>SEO & Research — Perplexity AI</h2><p>Perplexity AI is free and searches the web in real-time. Use it to research topics, find trending questions in your niche, and discover what your audience is searching for — all with cited sources you can reference.</p><h2>Workflow Tip</h2><p>The most efficient free workflow: Use Perplexity to research → ChatGPT to write → Grammarly to polish → Bing Image Creator for visuals → CapCut to edit video → Adobe Podcast to clean audio. This entire stack costs ₹0.</p>`},
  {id:9,tag:"tools",emoji:"🔄",bg:"linear-gradient(135deg,#7C3AED,#5B21B6)",
   title:"Complete AI Content Creation Workflow for 2026",
   excerpt:"Master the 5-stage AI workflow that top creators use to produce content 3x faster.",
   date:"Apr 30, 2026",read:"12 min read",author:"IndiaKaAI Team",
   url:"/blog/ai-content-creation-workflow-2026.html",
   content:`<p>Top content creators aren't just using AI tools randomly — they've built systematic workflows that multiply their output without sacrificing quality. Here's the 5-stage AI content creation workflow used by India's most productive creators.</p><h2>Stage 1: Research & Ideation</h2><p>Start with <strong>Perplexity AI</strong> to research your topic with real-time web sources. Then use <strong>ChatGPT</strong> to brainstorm 20 content angles, identify the most compelling hook, and outline your content structure. This stage should take 15-20 minutes and gives you a solid foundation.</p><h2>Stage 2: Writing & Scripting</h2><p>Use <strong>ChatGPT</strong> or <strong>Claude</strong> to write your first draft based on the outline. Don't aim for perfection — aim for speed. A rough draft in 10 minutes beats a perfect draft in 2 hours. Then use <strong>Grammarly</strong> to catch errors and improve clarity. For video scripts, use the draft as a teleprompter guide, not a word-for-word script.</p><h2>Stage 3: Visual Creation</h2><p>For images: <strong>Midjourney</strong> or <strong>DALL·E 3</strong> for custom illustrations. <strong>Canva AI</strong> for social media graphics and thumbnails. For video: <strong>Runway ML</strong> or <strong>Pika Labs</strong> for AI-generated clips. <strong>HeyGen</strong> if you want an AI avatar presenter. <strong>InVideo AI</strong> for complete video production from a script.</p><h2>Stage 4: Audio & Voice</h2><p>Record your own voice and use <strong>Adobe Podcast Enhance</strong> to clean it up. Or use <strong>ElevenLabs</strong> to generate a professional voiceover from your script. For background music, <strong>Suno AI</strong> or <strong>Mubert</strong> generate royalty-free tracks that match your content's mood.</p><h2>Stage 5: Distribution & Optimisation</h2><p>Use <strong>Predis.ai</strong> to repurpose your content into platform-specific formats (Instagram carousel, Twitter thread, LinkedIn post). Use <strong>Opus Clip</strong> to automatically cut long videos into short clips for Reels and Shorts. Use <strong>Surfer SEO</strong> to optimise written content for search.</p><h2>Time Savings</h2><p>Without AI: A single YouTube video (research + script + thumbnail + editing) takes 8-12 hours. With this workflow: 3-4 hours. That's 3x more content with the same effort — or the same content with significantly less stress.</p><h2>Getting Started</h2><p>Don't try to implement all 5 stages at once. Start with Stage 1 (Perplexity + ChatGPT for research) and Stage 2 (ChatGPT + Grammarly for writing). Once those feel natural, add visual creation. Build the workflow gradually over 4-6 weeks.</p>`},
  {id:10,tag:"tools",emoji:"⚡",bg:"linear-gradient(135deg,#374151,#111827)",
   title:"GitHub Copilot vs Cursor vs Codeium — Best AI Coding Tools",
   excerpt:"Developers share which AI code assistant made them 3x more productive.",
   date:"May 1, 2026",read:"7 min read",author:"IndiaKaAI Team",
   url:"https://www.techradar.com/best/best-ai-coding-assistants",
   content:`<p>AI coding assistants have become essential tools for developers in 2026. Three tools dominate the conversation: GitHub Copilot, Cursor, and Codeium. Each has a distinct approach and target audience.</p><h2>GitHub Copilot</h2><p>The original AI coding assistant, now deeply integrated into VS Code, JetBrains, and other IDEs. Copilot suggests code completions, generates functions from comments, and explains code. At $10/month ($19 for Business), it's the industry standard. Indian developers get access through GitHub's standard pricing.</p><h2>Cursor</h2><p>Cursor is an AI-first code editor built on VS Code. Unlike Copilot which is a plugin, Cursor is the entire editor. Its "Chat with your codebase" feature lets you ask questions about your entire project, not just the current file. Many developers report it's the most transformative tool they've adopted. Free tier available; Pro is $20/month.</p><h2>Codeium</h2><p>Codeium is completely free for individual developers and supports 70+ programming languages. It works as a plugin for VS Code, JetBrains, Vim, and more. While it's not as powerful as Copilot or Cursor, the price-to-value ratio is unbeatable — especially for students and freelancers.</p><h2>Which to Choose?</h2><p>If you're a professional developer: try Cursor first. If you want the most widely-supported tool: GitHub Copilot. If you want free: Codeium. Many developers use Codeium for day-to-day completions and Cursor for complex refactoring tasks.</p>`},
  {id:11,tag:"news",emoji:"🚀",bg:"linear-gradient(135deg,#DC2626,#991B1B)",
   title:"India's AI Startup Ecosystem: The 2026 Report",
   excerpt:"A deep dive into India's growing AI ecosystem — which sectors are exploding.",
   date:"May 2, 2026",read:"6 min read",author:"IndiaKaAI Team",
   url:"https://inc42.com/features/india-ai-ecosystem/",
   content:`<p>India's AI startup ecosystem has exploded in 2025-26. With over $2 billion in AI-focused funding, India is now the third-largest AI startup hub globally after the US and China. Here's what's happening.</p><h2>Key Sectors Leading Growth</h2><p><strong>EdTech AI:</strong> Companies like BYJU's, Unacademy, and newer startups are embedding AI tutors, personalised learning paths, and automated assessment tools. <strong>HealthTech AI:</strong> AI-powered diagnostics, drug discovery, and telemedicine are attracting massive investment. <strong>FinTech AI:</strong> Fraud detection, credit scoring for the unbanked, and AI-powered wealth management are transforming financial services.</p><h2>Government Initiatives</h2><p>The Indian government's IndiaAI Mission with ₹10,372 crore in funding is building AI compute infrastructure, datasets, and startup support. The National AI Portal and AI centres of excellence at IITs are producing world-class AI talent.</p><h2>Homegrown AI Models</h2><p>Several Indian companies are building India-specific AI models trained on Indian languages, cultural context, and local data. Sarvam AI, Krutrim (by Ola's founder), and others are creating alternatives to Western AI models that better understand Indian users.</p><h2>Challenges</h2><p>Despite the growth, challenges remain: compute costs are high, AI talent is scarce and expensive, and regulatory clarity is still evolving. The Digital Personal Data Protection Act 2023 is shaping how AI companies handle user data.</p><h2>Opportunities for Indian Developers</h2><p>This is the best time in history to build AI products for India. The market is large, underserved, and growing rapidly. If you're a developer or entrepreneur, the AI wave in India is just beginning.</p>`},
  {id:12,tag:"students",emoji:"📖",bg:"linear-gradient(135deg,#10B981,#059669)",
   title:"How to Use ChatGPT to Score Better in Exams",
   excerpt:"Smart strategies to use AI for revision, doubt-clearing and practice questions.",
   date:"May 3, 2026",read:"8 min read",author:"IndiaKaAI Team",
   url:"https://www.geeksforgeeks.org/how-to-use-chatgpt-for-studying/",
   content:`<p>ChatGPT can be your most powerful study partner — if you use it correctly. Here are proven strategies that students are using to improve their exam scores.</p><h2>1. The Feynman Technique with AI</h2><p>Ask ChatGPT to explain a concept, then try to explain it back in your own words. Ask ChatGPT to quiz you on it. This active recall method is scientifically proven to improve retention far better than passive reading.</p><h2>2. Generate Practice Questions</h2><p>Prompt: "Give me 15 MCQ questions on [topic] at [difficulty level] with answers and explanations." This is especially powerful for competitive exams like JEE, NEET, UPSC, and CAT where question patterns matter.</p><h2>3. Simplify Complex Concepts</h2><p>Prompt: "Explain [concept] as if I'm a 10-year-old" or "Explain [concept] using a real-life example from India." When you understand the intuition behind a concept, you can answer any variation of the question.</p><h2>4. Create Study Summaries</h2><p>Paste your notes or a textbook chapter into ChatGPT and ask: "Summarise the 10 most important points from this text." Use these summaries for last-minute revision before exams.</p><h2>5. Solve Doubts Instantly</h2><p>Instead of waiting for a teacher or searching through forums, ask ChatGPT your doubt immediately. For maths and science, ask it to show step-by-step working. For conceptual doubts, ask for multiple explanations until one clicks.</p><h2>6. Essay and Answer Writing Practice</h2><p>Write your answer to a question, then ask ChatGPT: "Review my answer and suggest improvements for a [board/competitive] exam." It will point out missing points, structural issues, and ways to make your answer more impressive.</p><h2>Important Caution</h2><p>ChatGPT can make mistakes, especially with numerical problems and recent events. Always verify important facts from your textbook or official sources. Use AI as a supplement to your studies, not a replacement for understanding.</p>`},
  {id:13,tag:"news",emoji:"🌐",bg:"linear-gradient(135deg,#FF6B00,#9333EA)",
   title:"Everything About the Latest GPT Models in 2026",
   excerpt:"Capabilities, pricing, API access for Indian developers and what changes for you.",
   date:"May 4, 2026",read:"5 min read",author:"IndiaKaAI Team",
   url:"https://techcrunch.com/tag/openai/",
   content:`<p>OpenAI's GPT model lineup has evolved significantly in 2026. Here's everything Indian developers and users need to know about the current models, their capabilities, and how to access them.</p><h2>Current Model Lineup</h2><p><strong>GPT-4o</strong> is the flagship model — multimodal (text, image, audio), fast, and available to ChatGPT Plus subscribers. <strong>GPT-4o mini</strong> is the cost-efficient version, available free in ChatGPT and cheap via API. <strong>o1 and o3</strong> are reasoning models designed for complex maths, science, and coding problems — they "think" before answering.</p><h2>What's New in 2026</h2><p>The latest GPT models feature significantly improved reasoning, longer context windows (up to 128K tokens), better instruction following, and reduced hallucination rates. Real-time voice mode has improved dramatically, making AI voice assistants genuinely useful.</p><h2>API Access for Indian Developers</h2><p>OpenAI's API is accessible from India. You'll need an international payment method (Visa/Mastercard or Wise card). GPT-4o mini costs approximately ₹0.01 per 1,000 tokens — extremely affordable for building applications. Many Indian startups are building products on top of the OpenAI API.</p><h2>Free Access Options</h2><p>ChatGPT's free tier now includes limited GPT-4o access. Microsoft Copilot (free) uses GPT-4. For API access without payment, explore Google's Gemini API which has a generous free tier — ideal for Indian developers building their first AI applications.</p><h2>What This Means for You</h2><p>The gap between free and paid AI is narrowing. Free users now get access to models that were paid-only a year ago. For most everyday tasks, the free tier is sufficient. Upgrade to Plus only if you need higher usage limits or the latest reasoning models.</p>`},
];

/* ── ADMIN BLOG MANAGEMENT ── */
const BLOG_STORAGE_KEY='ikaiBlogPosts';

function getBlogPosts(){
  const stored=localStorage.getItem(BLOG_STORAGE_KEY);
  if(stored) return JSON.parse(stored);
  // seed with default blogs
  localStorage.setItem(BLOG_STORAGE_KEY,JSON.stringify(DEFAULT_BLOGS));
  return DEFAULT_BLOGS;
}
function saveBlogPosts(posts){ localStorage.setItem(BLOG_STORAGE_KEY,JSON.stringify(posts)); }

function openBlogModal(id){
  const modal=document.getElementById('blogModal');
  document.getElementById('editPostId').value='';
  document.getElementById('postTitle').value='';
  document.getElementById('postTag').value='students';
  document.getElementById('postEmoji').value='🤖';
  document.getElementById('postExcerpt').value='';
  document.getElementById('postUrl').value='';
  document.getElementById('postAuthor').value='IndiaKaAI Team';
  document.getElementById('postReadTime').value='5 min read';
  document.getElementById('modalTitle').textContent='✍️ Add New Blog Post';
  if(id){
    const post=getBlogPosts().find(p=>p.id==id);
    if(post){
      document.getElementById('editPostId').value=id;
      document.getElementById('postTitle').value=post.title;
      document.getElementById('postTag').value=post.tag;
      document.getElementById('postEmoji').value=post.emoji||'🤖';
      document.getElementById('postExcerpt').value=post.excerpt;
      document.getElementById('postUrl').value=post.url||'';
      document.getElementById('postAuthor').value=post.author||'IndiaKaAI Team';
      document.getElementById('postReadTime').value=post.read||'5 min read';
      document.getElementById('modalTitle').textContent='✏️ Edit Blog Post';
    }
  }
  modal.classList.add('open');
}
function closeBlogModal(e){ if(e.target.id==='blogModal') document.getElementById('blogModal').classList.remove('open'); }

function saveBlogPost(){
  // Security: Verify admin access before saving
  if(!isAdmin()){
    showToast('⚠️ Unauthorized. Admin access required.');
    console.warn('🔒 Unauthorized blog save attempt');
    return;
  }
  
  const editId=document.getElementById('editPostId').value;
  const title=document.getElementById('postTitle').value.trim();
  const tag=document.getElementById('postTag').value;
  const emoji=document.getElementById('postEmoji').value||'🤖';
  const excerpt=document.getElementById('postExcerpt').value.trim();
  const url=document.getElementById('postUrl').value.trim();
  const author=document.getElementById('postAuthor').value.trim()||'IndiaKaAI Team';
  const read=document.getElementById('postReadTime').value.trim()||'5 min read';
  if(!title||!excerpt){showToast('⚠️ Title and excerpt are required.');return;}
  const bgColors=['linear-gradient(135deg,#4F46E5,#7C3AED)','linear-gradient(135deg,#FF6B00,#FF8C00)','linear-gradient(135deg,#10B981,#059669)','linear-gradient(135deg,#EC4899,#BE185D)','linear-gradient(135deg,#06B6D4,#0284C7)'];
  const posts=getBlogPosts();
  const date=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  if(editId){
    const idx=posts.findIndex(p=>p.id==editId);
    if(idx>-1) posts[idx]={...posts[idx],title,tag,emoji,excerpt,url,author,read};
  } else {
    const newId=Date.now();
    const bg=bgColors[newId%bgColors.length];
    posts.unshift({id:newId,tag,emoji,bg,title,excerpt,date,read,url,author});
  }
  saveBlogPosts(posts);
  renderBlogs(posts);
  renderAdminPosts();
  document.getElementById('blogModal').classList.remove('open');
  showToast(editId?'✅ Post updated!':'🎉 New post published!');
}

function deletePost(id){
  // Security: Verify admin access before deleting
  if(!isAdmin()){
    showToast('⚠️ Unauthorized. Admin access required.');
    console.warn('🔒 Unauthorized blog delete attempt');
    return;
  }
  
  if(!confirm('Delete this post permanently?'))return;
  const posts=getBlogPosts().filter(p=>p.id!=id);
  saveBlogPosts(posts);
  renderBlogs(posts);
  renderAdminPosts();
  showToast('🗑️ Post deleted.');
}

function renderAdminPosts(){
  const posts=getBlogPosts();
  const list=document.getElementById('adminPostsList');
  const count=document.getElementById('postCount');
  if(count) count.textContent=`(${posts.length} posts)`;
  if(!list)return;
  list.innerHTML='';
  posts.forEach(p=>{
    const label=p.tag==='students'?'AI for Students':p.tag==='money'?'Make Money with AI':p.tag==='tools'?'Tool Review':'AI News';
    list.innerHTML+=`<div class="admin-post-card bg-card border border-border rounded-[14px] p-5 flex gap-4 items-center">
      <div class="apc-emoji text-[2rem] w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">${p.emoji||'📝'}</div>
      <div class="apc-info flex-1 min-w-0">
        <div class="apc-title font-bold mb-1 whitespace-nowrap overflow-hidden text-ellipsis">${p.title}</div>
        <div class="apc-meta text-[0.78rem] text-muted flex gap-3 flex-wrap">
          <span>📂 ${label}</span>
          <span>📅 ${p.date||'—'}</span>
          <span>⏱ ${p.read||'—'}</span>
          ${p.url?`<a href="${p.url}" target="_blank" class="text-saffron text-[0.78rem]">🔗 Source</a>`:''}
        </div>
      </div>
      <div class="apc-actions flex gap-2 flex-shrink-0">
        <button class="btn-edit bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.3)] text-[#60a5fa] rounded-lg px-3.5 py-1.5 text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-[rgba(59,130,246,0.3)]" onclick="openBlogModal(${p.id})">✏️ Edit</button>
        <button class="btn-del bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#f87171] rounded-lg px-3.5 py-1.5 text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 hover:bg-[rgba(239,68,68,0.3)]" onclick="deletePost(${p.id})">🗑️ Delete</button>
      </div>
    </div>`;
  });
}

/* ── RENDER ── */
function getDomain(url){try{return new URL(url).hostname.replace('www.','');}catch{return '';}}
function logoUrl(url){
  const d=getDomain(url);
  return d?`https://www.google.com/s2/favicons?domain=${d}&sz=128`:'';
}

function renderCards(tools){
  const skeleton = document.getElementById('loadingSkeleton');
  if (skeleton) skeleton.remove();
  const grid=document.getElementById('aiGrid');
  grid.innerHTML='';
  const user=getCurrentUser();
  const isAdmin=user&&user.email===ADMIN_EMAIL;
  const now=Date.now();
  const thirtyDays=30*24*60*60*1000;
  // update grid count label
  const countEl=document.getElementById('gridCount');
  if(countEl){
    const visible=tools.filter(t=>!t.hidden).length;
    countEl.textContent=`${visible} tools`;
  }
  tools.forEach(t=>{
    const pClass=t.pricing==='Free'?'badge-free':t.pricing==='Paid'?'badge-paid':'badge-freemium';
    const logo=t.logoUrl||logoUrl(t.url||'');
    const iconHtml=logo
      ?`<img src="${logo}" alt="${t.name} logo"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
         <span class="icon-fallback" style="display:none">${t.icon}</span>`
      :`<span class="icon-fallback">${t.icon}</span>`;
    // Show NEW badge for tools added (via admin) in last 30 days (id is timestamp)
    const isNew = t.id > 1000000000000 && (now - t.id) < thirtyDays;
    grid.innerHTML+=`
    <div class="ai-card bg-clay-white border-2 border-oat-border rounded-clay-card p-5 transition-all duration-200 cursor-default relative overflow-hidden shadow-clay hover:border-matcha-600 hover:-rotate-1 hover:-translate-y-1 hover:shadow-clay-hard" data-cat="${t.cat}" data-name="${t.name.toLowerCase()}" data-desc="${t.desc.toLowerCase()}">
      ${isNew?'<span class="card-new-badge absolute top-3 right-3 bg-matcha-600 text-white text-[0.6rem] font-bold px-2 py-0.5 rounded tracking-[0.06em] uppercase">NEW</span>':''}
      <div class="card-header flex items-start gap-3 mb-3">
        <div class="card-icon w-[48px] h-[48px] rounded-xl flex items-center justify-center text-[1.3rem] flex-shrink-0 overflow-hidden bg-oat-light border-2 border-oat-border" style="background:${t.color||'#fbbd41'}22;border-color:${t.color||'#fbbd41'};">${iconHtml}</div>
        <div class="card-meta flex-1 min-w-0">
          <div class="card-name font-bold text-[1rem] text-clay-black whitespace-nowrap overflow-hidden text-ellipsis mb-1">${t.name}</div>
          <div class="card-cat text-[0.75rem] font-semibold text-warm-charcoal tracking-[0.01em] uppercase">${t.cat}</div>
        </div>
      </div>
      <div class="card-desc text-[0.85rem] text-warm-charcoal leading-[1.6] mb-4">${t.desc}</div>
      <div class="card-footer flex items-center justify-between gap-2 mb-3">
        <span class="card-badge text-[0.7rem] font-bold px-2.5 py-1 rounded-lg ${pClass}">${t.pricing}</span>
        ${user ? `<button onclick="toggleBookmark(${t.id}); event.stopPropagation();" class="bookmark-btn text-xl transition-all duration-200 hover:scale-125" title="${isBookmarked(t.id) ? 'Remove bookmark' : 'Bookmark this tool'}">${isBookmarked(t.id) ? '★' : '☆'}</button>` : ''}
        <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="visit-btn bg-matcha-600 text-white border-none px-4 py-2 rounded-xl text-[0.75rem] font-semibold cursor-pointer no-underline transition-all duration-200 font-outfit hover:bg-matcha-800 hover:-rotate-2 hover:-translate-y-0.5 hover:shadow-clay-hard ml-auto">Visit</a>
      </div>
      <div class="card-rating border-t-2 border-oat-border pt-3" id="rating-${t.id}">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="text-xs font-semibold text-warm-charcoal uppercase tracking-wider">Rate this tool:</span>
          <span class="text-xs text-warm-silver" id="rating-display-${t.id}">Loading...</span>
        </div>
        <div class="flex gap-1" id="rating-stars-${t.id}">
          ${[1,2,3,4,5].map(star => `
            <button 
              id="star-${t.id}-${star}"
              onclick="rateTool(${t.id}, ${star}); event.stopPropagation();" 
              class="rating-star text-warm-silver hover:text-lemon-500 transition-colors duration-150 cursor-pointer text-xl leading-none"
              title="Rate ${star} star${star > 1 ? 's' : ''}"
              aria-label="Rate ${star} star${star > 1 ? 's' : ''}">
              ★
            </button>
          `).join('')}
        </div>
      </div>
      ${isAdmin?`<div class="flex gap-2 mt-3 pt-3 border-t-2 border-oat-border border-dashed">
        <button class="btn-edit text-[0.73rem] px-2.5 py-1.5 flex-1 bg-slushie-500 bg-opacity-20 border-2 border-slushie-800 text-slushie-800 rounded-lg font-semibold hover:-rotate-1 hover:-translate-y-0.5" onclick="openToolModal(${t.id||0})">Edit</button>
        <button class="btn-del text-[0.73rem] px-2.5 py-1.5 flex-1 bg-pomegranate-400 bg-opacity-20 border-2 border-pomegranate-400 text-pomegranate-400 rounded-lg font-semibold hover:-rotate-1 hover:-translate-y-0.5" onclick="deleteTool(${t.id||0})">Delete</button>
      </div>`:''}
    </div>`;
  });
  
  // Load ratings asynchronously after cards are rendered
  tools.forEach(async (t) => {
    await updateSingleToolRating(t.id);
  });
}

function renderBlogs(arr){
  const g=document.getElementById('blogGrid');
  if(!g)return;
  g.innerHTML='';
  const user=getCurrentUser();
  const isAdmin=user&&user.email===ADMIN_EMAIL;
  arr.forEach(b=>{
    const label=b.tag==='students'?'AI for Students':b.tag==='money'?'Make Money with AI':b.tag==='tools'?'Tool Review':'AI News';
    // Determine link: use b.url directly (internal /blog/*.html or external)
    const href = b.url || '#';
    const isExternal = href.startsWith('http');
    const targetAttr = isExternal ? 'target="_blank" rel="noopener noreferrer"' : '';
    g.innerHTML+=`
    <a href="${href}" ${targetAttr} class="blog-card block bg-white border-2 border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-matcha-600 hover:shadow-lg hover:-translate-y-0.5 no-underline" data-btag="${b.tag}">
      <div class="blog-thumb h-[160px] flex items-center justify-center border-b border-gray-100" style="background:${b.bg||'linear-gradient(135deg,#4F46E5,#7C3AED)'};">
        <span class="text-[3.5rem]">${b.emoji||'📝'}</span>
      </div>
      <div class="blog-body p-5">
        <span class="blog-tag inline-block bg-gray-100 text-gray-600 text-[0.68rem] font-bold px-2 py-0.5 rounded mb-2 uppercase tracking-[0.06em]">${label}</span>
        <div class="blog-title text-[0.97rem] font-semibold mb-2 leading-[1.4] text-gray-900">${b.title}</div>
        <div class="blog-excerpt text-[0.78rem] text-gray-500 leading-[1.6] mb-3">${b.excerpt}</div>
        <div class="flex items-center justify-between text-[0.72rem] text-gray-400">
          <span>${b.date||''} · ${b.read||''}</span>
          <span class="text-matcha-600 font-semibold">${isExternal?'Read ↗':'Read →'}</span>
        </div>
        ${isAdmin?`<div class="flex gap-2 mt-3 pt-3 border-t border-gray-100" onclick="event.preventDefault()">
          <button class="btn-edit text-[0.75rem] px-3 py-1" onclick="showPage('admin');openBlogModal(${b.id})">✏️ Edit</button>
          <button class="btn-del text-[0.75rem] px-3 py-1" onclick="deletePost(${b.id})">🗑️ Delete</button>
        </div>`:''}
      </div>
    </a>`;
  });
}

/* ── FILTERS ── */
let currentCat='all';

function navSearchHandler(q){
  /* Always go to home page first, then search */
  if(!document.getElementById('page-home').classList.contains('active')){
    showPage('home');
  }
  document.getElementById('heroSearch').value=q;
  applyFilter(currentCat,q.toLowerCase());
}

function heroSearchHandler(q){
  document.getElementById('navSearch').value=q;
  applyFilter(currentCat,q.toLowerCase());
}

function filterCat(cat,el){
  currentCat=cat;
  if(el){
    // Remove active state from all tabs
    document.querySelectorAll('.cat-tab').forEach(t=>{
      t.classList.remove('active');
      // Reset to inactive styling
      t.classList.remove('border-matcha-600', 'font-semibold');
      t.classList.add('border-oat-border', 'font-medium');
    });
    // Add active state to clicked tab
    el.classList.add('active');
    el.classList.remove('border-oat-border', 'font-medium');
    el.classList.add('border-matcha-600', 'font-semibold');
  }
  const q=document.getElementById('navSearch').value.toLowerCase()||document.getElementById('heroSearch').value.toLowerCase();
  applyFilter(cat,q);
  // update grid label
  const labelEl=document.getElementById('gridLabel');
  if(labelEl){
    const catLabels={all:'All Tools',Writing:'Writing',Image:'Image Gen',Video:'Video',Audio:'Audio & Music',Coding:'Coding',Productivity:'Productivity',Research:'Research',Marketing:'Marketing',Chatbot:'Chatbots',Data:'Data',Design:'Design',Finance:'Finance'};
    labelEl.textContent=catLabels[cat]||cat;
  }
}

function applyFilter(cat,q){
  let visible=0;
  document.querySelectorAll('.ai-card').forEach(c=>{
    const matchCat=cat==='all'||c.dataset.cat===cat;
    const matchQ=!q||c.dataset.name.includes(q)||c.dataset.desc.includes(q)||c.dataset.cat.toLowerCase().includes(q);
    const show=matchCat&&matchQ;
    c.classList.toggle('hidden',!show);
    if(show)visible++;
  });
  const countEl=document.getElementById('gridCount');
  if(countEl) countEl.textContent=`${visible} tools`;
}

function filterBlogCat(tag,el){
  if(el){document.querySelectorAll('.blog-cat-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');}
  document.querySelectorAll('.blog-card').forEach(c=>{
    c.style.display=(tag==='all'||c.dataset.btag===tag)?'':'none';
  });
}
function filterBlog(tag,el){
  if(el){document.querySelectorAll('.blog-cat-tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');}
  document.querySelectorAll('.blog-card').forEach(c=>{
    c.style.display=(tag==='all'||c.dataset.btag===tag)?'':'none';
  });
}

/* ── PAGE NAV ── */
function showPage(p){
  // Security: Guard admin page - only accessible to logged-in admin
  if(p==='admin'){
    const u=getCurrentUser();
    if(!u){
      showPage('signin');
      showToast('⚠️ Please sign in to access admin panel.');
      return;
    }
    if(u.email!==ADMIN_EMAIL){
      console.warn('🔒 Unauthorized admin access attempt by:', u.email);
      showPage('home');
      showToast('⚠️ Unauthorized access. Admin privileges required.');
      return;
    }
  }
  
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  const target=document.getElementById('page-'+p);
  if(!target) return;
  target.classList.add('active');
  
  // Update both desktop and mobile navigation
  updateMobileNavActive(p);
  
  window.scrollTo(0,0);
}
function showContactTab(tab){
  showPage('contact');
  document.querySelectorAll('.contact-section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.contact-tab').forEach(t=>t.classList.remove('active'));
  const sec=document.getElementById('csec-'+tab);
  const ctab=document.getElementById('ctab-'+tab);
  if(sec)sec.classList.add('active');
  if(ctab)ctab.classList.add('active');
}

/* ── EMAILJS SEND (with rate limiting) ── */
// Security: Simple client-side rate limiting
const _formSubmitTimestamps = {};
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS = 3; // Max 3 submissions per minute per form

async function sendEmail(event, formId, type){
  event.preventDefault();
  const form = document.getElementById(formId);
  const btnId = {contact:'contactBtn', tool:'submitToolBtn', collab:'gitBtn'}[type];
  const btn = document.getElementById(btnId);

  // Security: Rate limiting check
  const now = Date.now();
  if(!_formSubmitTimestamps[type]) _formSubmitTimestamps[type] = [];
  
  // Remove old timestamps outside the window
  _formSubmitTimestamps[type] = _formSubmitTimestamps[type].filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if(_formSubmitTimestamps[type].length >= MAX_SUBMISSIONS){
    showToast('⚠️ Too many submissions. Please wait a minute and try again.');
    return;
  }

  if(EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'){
    showToast('⚠️ EmailJS not set up yet. See setup guide below.');
    showSetupGuide();
    return;
  }

  const labels = {
    contact: {sending:'Sending…', done:'✅ Message sent! We\'ll reply within 24 hours.', err:'❌ Failed to send. Please email us directly.'},
    tool:    {sending:'Submitting…', done:'🎉 Tool submitted! We\'ll review within 48 hours.', err:'❌ Failed. Please email us directly.'},
    collab:  {sending:'Sending…', done:'✅ Thanks! We\'ll reach out within 24 hours.', err:'❌ Failed to send. Please email us directly.'},
  }[type];

  // Security: Disable button to prevent double-submit
  btn.disabled = true;
  btn.textContent = labels.sending;

  // Build a unified template params object from all named inputs
  const data = Object.fromEntries(new FormData(form).entries());
  data.to_email    = 'devanshup416@gmail.com';
  data.form_type   = type === 'contact' ? 'Contact Us' : type === 'tool' ? 'Submit a Tool' : 'Get In Touch / Collaborate';
  data.subject     = data.subject || (type === 'tool' ? `New Tool Submission: ${data.tool_name||''}` : 'New Collaboration Request');

  // Build a rich message body combining all fields
  let fullMessage = data.message || '';
  if(type === 'tool'){
    fullMessage = `--- TOOL SUBMISSION ---\n`
      + `Tool Name: ${data.tool_name||'-'}\n`
      + `Tool URL: ${data.tool_url||'-'}\n`
      + `Category: ${data.tool_category||'-'}\n`
      + `Pricing: ${data.tool_pricing||'-'}\n\n`
      + `Short Description: ${data.tool_short_desc||'-'}\n\n`
      + `Detailed Description:\n${data.message||'-'}`;
  } else if(type === 'collab'){
    fullMessage = `--- COLLABORATION REQUEST ---\n`
      + `Company/Website: ${data.company||'-'}\n\n`
      + `Message:\n${data.message||'-'}`;
  }

  // Map to template variable names used in EmailJS template
  const templateParams = {
    name:    data.from_name || '-',
    email:   data.reply_to  || '-',
    title:   data.subject   || data.form_type,
    message: fullMessage,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    // Security: Log success but don't expose sensitive details
    console.log('✅ EmailJS success:', response.status);
    showToast(labels.done);
    form.reset();
    // Security: Record successful submission timestamp
    _formSubmitTimestamps[type].push(now);
  } catch(err){
    // Security: Log detailed error to console, show generic message to user
    console.error('🔒 EmailJS error:', err);
    showToast(labels.err);
  } finally {
    // Security: Re-enable button after operation completes
    btn.disabled = false;
    btn.textContent = type === 'tool' ? 'Submit Tool for Review' : 'Send Message';
  }
}

/* ── NEWSLETTER ── */
function subscribeNL(){
  const e=document.getElementById('nlEmail').value;
  if(!e||!e.includes('@'))return showToast('⚠️ Please enter a valid email.');
  showToast('🎉 Subscribed! Your first AI digest arrives Monday.');
  document.getElementById('nlEmail').value='';
}

/* ── SETUP GUIDE (shown when EmailJS keys are missing) ── */
function showSetupGuide(){
  const existing = document.getElementById('ejsGuide');
  if(existing){ existing.style.display='block'; existing.scrollIntoView({behavior:'smooth'}); return; }
  const guide = document.createElement('div');
  guide.id = 'ejsGuide';
  guide.style.cssText='background:#1a1f2e;border:2px solid #FF6B00;border-radius:16px;padding:28px;margin-top:24px;line-height:1.8;';
  guide.innerHTML=`
    <h3 style="color:#FF6B00;margin-bottom:12px">⚡ 3-Minute EmailJS Setup — Get Emails in Your Gmail</h3>
    <ol style="color:#e2e8f0;padding-left:20px;font-size:.9rem;">
      <li>Go to <a href="https://emailjs.com" target="_blank" style="color:#FF6B00">emailjs.com</a> → <b>Sign Up free</b> with your admin Gmail</li>
      <li>Click <b>Email Services</b> → <b>Add New Service</b> → choose <b>Gmail</b> → connect your account → note the <b>Service ID</b></li>
      <li>Click <b>Email Templates</b> → <b>Create New Template</b>. In the template body paste:<br>
        <code style="background:#0a0a1a;padding:8px 12px;border-radius:8px;display:block;margin:8px 0;font-size:.82rem;">
          Form: {{form_type}}<br>From: {{from_name}} ({{reply_to}})<br>Subject: {{subject}}<br>Message: {{message}}<br>Tool URL: {{tool_url}}<br>Company: {{company}}
        </code>
        Set <b>To Email</b> = your admin Gmail → Save → note the <b>Template ID</b>
      </li>
      <li>Go to <b>Account</b> → <b>API Keys</b> → copy your <b>Public Key</b></li>
      <li>Open <code>indiakaai/index.html</code> in a text editor and replace these 3 lines near the top:<br>
        <code style="background:#0a0a1a;padding:8px 12px;border-radius:8px;display:block;margin:8px 0;font-size:.82rem;white-space:pre;">
const EMAILJS_SERVICE_ID  = 'service_xxxxxxx';
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx';
const EMAILJS_PUBLIC_KEY  = 'your_public_key';</code>
      </li>
      <li>Save the file → done! Every form submission now lands in your Gmail. ✅</li>
    </ol>
    <button onclick="document.getElementById('ejsGuide').style.display='none'" style="margin-top:16px;background:none;border:1px solid #FF6B00;border-radius:8px;padding:6px 16px;color:#FF6B00;cursor:pointer;font-size:.85rem;">Close Guide</button>
  `;
  document.querySelector('.contact-body').appendChild(guide);
  setTimeout(()=>guide.scrollIntoView({behavior:'smooth'}),100);
}

/* ── TOAST ── */
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),4000);
}

/* ── ADMIN TAB SWITCHER ── */
function switchAdminTab(tab){
  ['blog','tools','guide'].forEach(t=>{
    document.getElementById('asec-'+t).style.display = t===tab?'block':'none';
    document.getElementById('atab-'+t).classList.toggle('active', t===tab);
  });
  if(tab==='tools') renderAdminTools();
}

/* ── AI TOOLS STORAGE (Supabase-backed) ── */
const TOOLS_STORAGE_KEY = 'ikaiAITools';
let TOOLS_CACHE = null;

function getTools(){
  if(TOOLS_CACHE) return TOOLS_CACHE;
  const stored = localStorage.getItem(TOOLS_STORAGE_KEY);
  if(stored){ try{ TOOLS_CACHE=JSON.parse(stored); return TOOLS_CACHE; }catch(e){} }
  // Fallback: seed from built-in array
  TOOLS_CACHE = AI_TOOLS.map((t,i)=>({...t, id:t.id||i+1}));
  return TOOLS_CACHE;
}
function saveTools(tools){
  TOOLS_CACHE = tools;
  localStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(tools));
}

/* Fetch all 200 tools from Supabase (background, replaces cache) */
async function loadToolsFromSupabase(){
  try{
    const {data, error} = await _sb.from('ai_tools').select('*').order('id',{ascending:true});
    if(error) throw error;
    // Map description → desc for template compatibility + mark new tools from DB
    TOOLS_CACHE = data.map(t=>({...t, desc: t.description}));
    localStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(TOOLS_CACHE));
    renderCards(TOOLS_CACHE);
    renderAdminTools();
    applyFilter(currentCat, document.getElementById('heroSearch')?.value?.toLowerCase()||'');
    console.log(`✅ Loaded ${TOOLS_CACHE.length} tools from Supabase`);
  }catch(e){
    console.warn('Supabase load failed, using local cache:', e.message);
  }
}

/* ── TOOL MODAL ── */
function previewToolLogo(url){
  const preview = document.getElementById('toolLogoPreview');
  if(!preview) return;
  try{
    const domain = new URL(url).hostname;
    const logoSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    preview.innerHTML = `<img src="${logoSrc}" style="width:36px;height:36px;object-fit:contain;border-radius:6px;" onerror="this.style.display='none'">`;
  } catch(e){ preview.innerHTML=''; }
}

function openToolModal(id){
  const modal = document.getElementById('toolModal');
  // reset
  document.getElementById('editToolId').value = '';
  document.getElementById('toolName').value = '';
  document.getElementById('toolUrl').value = '';
  document.getElementById('toolCat').value = 'Writing';
  document.getElementById('toolPricing').value = 'Freemium';
  document.getElementById('toolDesc').value = '';
  document.getElementById('toolEmoji').value = '🤖';
  document.getElementById('toolColor').value = '#FF6B00';
  document.getElementById('toolLogoPreview').innerHTML = '🤖';
  document.getElementById('toolModalTitle').textContent = '🤖 Add New AI Tool';

  if(id){
    const tool = getTools().find(t=>t.id==id);
    if(tool){
      document.getElementById('editToolId').value = id;
      document.getElementById('toolName').value = tool.name||'';
      document.getElementById('toolUrl').value = tool.url||'';
      document.getElementById('toolCat').value = tool.cat||'Writing';
      document.getElementById('toolPricing').value = tool.pricing||'Freemium';
      document.getElementById('toolDesc').value = tool.desc||'';
      document.getElementById('toolEmoji').value = tool.icon||'🤖';
      document.getElementById('toolColor').value = tool.color||'#FF6B00';
      document.getElementById('toolModalTitle').textContent = '✏️ Edit AI Tool';
      if(tool.url) previewToolLogo(tool.url);
    }
  }
  modal.classList.add('open');
}

function closeToolModal(e){
  if(e.target.id==='toolModal') document.getElementById('toolModal').classList.remove('open');
}

async function saveToolEntry(){
  // Security: Verify admin access before saving
  if(!isAdmin()){
    showToast('⚠️ Unauthorized. Admin access required.');
    console.warn('🔒 Unauthorized tool save attempt');
    return;
  }
  
  const editId  = document.getElementById('editToolId').value;
  const name    = document.getElementById('toolName').value.trim();
  const url     = document.getElementById('toolUrl').value.trim();
  const cat     = document.getElementById('toolCat').value;
  const pricing = document.getElementById('toolPricing').value;
  const desc    = document.getElementById('toolDesc').value.trim();
  const icon    = document.getElementById('toolEmoji').value||'🤖';
  const color   = document.getElementById('toolColor').value||'#FF6B00';

  if(!name||!desc){ showToast('⚠️ Name and description are required.'); return; }

  const tools = getTools();

  if(editId){
    const idx = tools.findIndex(t=>t.id==editId);
    if(idx>-1) tools[idx]={...tools[idx], name, url, cat, pricing, desc, description:desc, icon, color};
    // Sync to Supabase (RLS will enforce server-side auth)
    _sb.from('ai_tools').update({name,url,cat,pricing,description:desc,icon,color}).eq('id',editId)
      .then(({error}) => {
        if(error) {
          console.error('🔒 Supabase update error:', error);
          showToast('⚠️ Failed to sync to database. Changes saved locally.');
        }
      });
    showToast('✅ Tool updated!');
  } else {
    const newId = Date.now();
    tools.unshift({ id:newId, name, url, cat, pricing, desc, description:desc, icon, color, is_new:true });
    // Sync to Supabase (RLS will enforce server-side auth)
    _sb.from('ai_tools').insert({id:newId,name,url,cat,pricing,description:desc,icon,color,is_new:true})
      .then(({error}) => {
        if(error) {
          console.error('🔒 Supabase insert error:', error);
          showToast('⚠️ Failed to sync to database. Changes saved locally.');
        }
      });
    showToast('🎉 Tool added to directory!');
  }

  saveTools(tools);
  renderCards(getTools());
  renderAdminTools();
  document.getElementById('toolModal').classList.remove('open');
}

function deleteTool(id){
  // Security: Verify admin access before deleting
  if(!isAdmin()){
    showToast('⚠️ Unauthorized. Admin access required.');
    console.warn('🔒 Unauthorized tool delete attempt');
    return;
  }
  
  if(!confirm('Remove this AI tool from the directory?')) return;
  const tools = getTools().filter(t=>t.id!=id);
  saveTools(tools);
  renderCards(tools);
  renderAdminTools();
  // Sync delete to Supabase (RLS will enforce server-side auth)
  _sb.from('ai_tools').delete().eq('id',id)
    .then(({error}) => {
      if(error) {
        console.error('🔒 Supabase delete error:', error);
        showToast('⚠️ Failed to sync deletion to database.');
      }
    });
  showToast('🗑️ Tool removed.');
}

function renderAdminTools(){
  const tools = getTools();
  const list  = document.getElementById('adminToolsList');
  const count = document.getElementById('toolCount');
  if(count) count.textContent=`(${tools.length} tools)`;
  if(!list) return;
  list.innerHTML='';
  tools.forEach(t=>{
    const domain = t.url ? getDomain(t.url) : '';
    const logo   = t.url ? logoUrl(t.url) : '';
    list.innerHTML+=`
    <div class="admin-post-card">
      <div class="apc-emoji" style="background:${t.color||'#FF6B00'}22;border:1px solid ${t.color||'#FF6B00'}33;overflow:hidden;">
        ${logo
          ?`<img src="${logo}" style="width:36px;height:36px;object-fit:contain;border-radius:6px;"
               onerror="this.style.display='none';this.nextSibling.style.display='block'">
             <span style="display:none;font-size:1.4rem">${t.icon||'🤖'}</span>`
          :`<span style="font-size:1.4rem">${t.icon||'🤖'}</span>`}
      </div>
      <div class="apc-info">
        <div class="apc-title">${t.name}</div>
        <div class="apc-meta">
          <span>📂 ${t.cat}</span>
          <span class="card-badge ${t.pricing==='Free'?'badge-free':t.pricing==='Paid'?'badge-paid':'badge-freemium'}" style="padding:2px 8px;">${t.pricing}</span>
          ${domain?`<a href="${t.url}" target="_blank" style="color:var(--saffron);font-size:.78rem;">🔗 ${domain}</a>`:''}
        </div>
      </div>
      <div class="apc-actions">
        <button class="btn-edit" onclick="openToolModal(${t.id})">✏️ Edit</button>
        <button class="btn-del"  onclick="deleteTool(${t.id})">🗑️ Del</button>
      </div>
    </div>`;
  });
}

/* ══════════════════════════════════════════════════════════════════════
   PHASE 3 FEATURES
   ══════════════════════════════════════════════════════════════════════ */

/* ── 1. BOOKMARKS (Firebase Firestore) ── */
const BOOKMARKS_KEY = 'ikaai_bookmarks';

// Get user bookmarks from localStorage (synced with Firebase)
function getUserBookmarks(){
  const user = getCurrentUser();
  if(!user) return [];
  const stored = localStorage.getItem(`${BOOKMARKS_KEY}_${user.uid}`);
  return stored ? JSON.parse(stored) : [];
}

// Save bookmark
async function toggleBookmark(toolId){
  const user = getCurrentUser();
  if(!user){
    showToast('⚠️ Please sign in to bookmark tools');
    showPage('signin');
    return;
  }
  
  const bookmarks = getUserBookmarks();
  const index = bookmarks.indexOf(toolId);
  
  if(index > -1){
    // Remove bookmark
    bookmarks.splice(index, 1);
    showToast('🗑️ Bookmark removed');
  } else {
    // Add bookmark
    bookmarks.push(toolId);
    showToast('⭐ Tool bookmarked!');
  }
  
  // Save to localStorage
  localStorage.setItem(`${BOOKMARKS_KEY}_${user.uid}`, JSON.stringify(bookmarks));
  
  // Sync to Firebase Firestore (optional - for cross-device sync)
  try {
    const db = firebase.firestore();
    await db.collection('bookmarks').doc(user.uid).set({
      toolIds: bookmarks,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch(err){
    console.warn('Firebase bookmark sync failed:', err);
  }
  
  // Re-render cards to update bookmark icons
  renderCards(getTools());
}

// Check if tool is bookmarked
function isBookmarked(toolId){
  return getUserBookmarks().includes(toolId);
}

/* ── 2. RATINGS (Supabase) ── */

// Cache for ratings to avoid redundant fetches
const ratingsCache = new Map();

// Get tool rating from Supabase
async function getToolRating(toolId){
  // Check cache first
  if(ratingsCache.has(toolId)){
    return ratingsCache.get(toolId);
  }
  
  try {
    const {data, error} = await _sb
      .from('tool_ratings')
      .select('rating')
      .eq('tool_id', toolId);
    
    if(error) throw error;
    
    let result;
    if(data && data.length > 0){
      const avg = data.reduce((sum, r) => sum + r.rating, 0) / data.length;
      result = {average: avg.toFixed(1), count: data.length};
    } else {
      result = {average: 0, count: 0};
    }
    
    // Cache the result
    ratingsCache.set(toolId, result);
    return result;
  } catch(err){
    console.warn('Rating fetch error:', err);
    return {average: 0, count: 0};
  }
}

// Get user's rating for a specific tool
async function getUserRating(toolId){
  const user = getCurrentUser();
  if(!user) return null;
  
  try {
    const {data, error} = await _sb
      .from('tool_ratings')
      .select('rating')
      .eq('tool_id', toolId)
      .eq('user_id', user.uid)
      .single();
    
    if(error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data ? data.rating : null;
  } catch(err){
    console.warn('User rating fetch error:', err);
    return null;
  }
}

// Submit or update rating
async function rateTool(toolId, rating){
  const user = getCurrentUser();
  if(!user){
    showToast('⚠️ Please sign in to rate tools');
    showPage('signin');
    return;
  }
  
  if(rating < 1 || rating > 5){
    showToast('⚠️ Rating must be between 1-5 stars');
    return;
  }
  
  try {
    // Check if user already rated this tool
    const {data: existing} = await _sb
      .from('tool_ratings')
      .select('id')
      .eq('tool_id', toolId)
      .eq('user_id', user.uid)
      .single();
    
    let result;
    if(existing){
      // Update existing rating
      result = await _sb
        .from('tool_ratings')
        .update({
          rating: rating,
          updated_at: new Date().toISOString()
        })
        .eq('tool_id', toolId)
        .eq('user_id', user.uid);
    } else {
      // Insert new rating
      result = await _sb
        .from('tool_ratings')
        .insert([{
          tool_id: toolId,
          user_id: user.uid,
          rating: rating,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
    }
    
    if(result.error) throw result.error;
    
    // Clear cache for this tool
    ratingsCache.delete(toolId);
    
    showToast(`⭐ Rated ${rating} star${rating > 1 ? 's' : ''}!`);
    
    // Update the rating display for this specific tool
    await updateSingleToolRating(toolId);
    
  } catch(err){
    console.error('Rating submission error:', err);
    showToast('⚠️ Failed to submit rating');
  }
}

// Update rating display for a single tool (efficient)
async function updateSingleToolRating(toolId){
  const ratingData = await getToolRating(toolId);
  const displayEl = document.getElementById(`rating-display-${toolId}`);
  const starsContainer = document.getElementById(`rating-stars-${toolId}`);
  
  if(displayEl){
    if(ratingData.count > 0){
      displayEl.textContent = `${ratingData.average} / 5 (${ratingData.count} rating${ratingData.count > 1 ? 's' : ''})`;
    } else {
      displayEl.textContent = 'No ratings yet';
    }
  }
  
  // Update star highlights based on user's rating
  if(starsContainer){
    const userRating = await getUserRating(toolId);
    updateStarHighlights(toolId, userRating);
  }
}

// Update star visual highlights
function updateStarHighlights(toolId, userRating){
  for(let i = 1; i <= 5; i++){
    const star = document.getElementById(`star-${toolId}-${i}`);
    if(star){
      if(userRating && i <= userRating){
        star.classList.add('text-lemon-500');
        star.classList.remove('text-warm-silver');
      } else {
        star.classList.add('text-warm-silver');
        star.classList.remove('text-lemon-500');
      }
    }
  }
}

/* ── 3. IMPROVED SEARCH with DEBOUNCE ── */
let searchDebounceTimer;

function improvedSearch(query){
  // Clear previous timer
  clearTimeout(searchDebounceTimer);
  
  // Debounce: wait 300ms after user stops typing
  searchDebounceTimer = setTimeout(() => {
    const q = query.toLowerCase().trim();
    if(!q){
      filterCat('all');
      return;
    }
    
    const tools = getTools();
    const filtered = tools.filter(t => {
      const matchName = t.name.toLowerCase().includes(q);
      const matchDesc = t.desc.toLowerCase().includes(q);
      const matchCat = t.cat.toLowerCase().includes(q);
      const matchPricing = t.pricing.toLowerCase().includes(q);
      return matchName || matchDesc || matchCat || matchPricing;
    });
    
    renderCards(filtered);
    document.getElementById('gridLabel').textContent = `Search: "${query}"`;
    document.getElementById('gridCount').textContent = `${filtered.length} results`;
  }, 300); // 300ms debounce
}

// Update search handlers to use improved search
function heroSearchHandler(val){
  improvedSearch(val);
}

function navSearchHandler(val){
  improvedSearch(val);
  if(val) showPage('home');
}

/* ── 4. TOOL OF THE WEEK CARD ── */
function renderToolOfTheWeek(){
  const container = document.getElementById('toolOfWeekContainer');
  if(!container) return;
  
  const tool = AI_TOOLS.find(t => t.id === TOOL_OF_THE_WEEK.id);
  if(!tool) return;
  
  const domain = getDomain(tool.url);
  const logo = logoUrl(tool.url);
  
  container.innerHTML = `
    <div class="tool-of-week-card bg-gradient-to-br from-matcha-800 to-matcha-600 border-2 border-matcha-600 rounded-clay-card p-8 shadow-clay-hard relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-4">
          <span class="bg-lemon-500 text-clay-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">⭐ Tool of the Week</span>
          <span class="text-matcha-300 text-sm font-medium">${new Date().toLocaleDateString('en-IN', {month: 'short', day: 'numeric'})}</span>
        </div>
        
        <div class="flex items-start gap-6 mb-6">
          <div class="w-20 h-20 bg-clay-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
            ${logo 
              ? `<img src="${logo}" class="w-14 h-14 object-contain" onerror="this.style.display='none';this.nextSibling.style.display='block'">
                 <span class="text-3xl" style="display:none">${tool.icon||'🤖'}</span>`
              : `<span class="text-3xl">${tool.icon||'🤖'}</span>`}
          </div>
          
          <div class="flex-1">
            <h3 class="font-bebas text-4xl text-white mb-2 tracking-wide">${tool.name}</h3>
            <p class="text-matcha-300 text-sm mb-3">${tool.cat} · ${tool.pricing}</p>
            <p class="text-white text-base leading-relaxed mb-4">${TOOL_OF_THE_WEEK.editorial}</p>
            <div class="flex gap-3">
              <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" 
                 class="bg-clay-white text-matcha-800 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-lemon-500 hover:text-clay-black transition-all duration-200 hover:-translate-y-1 hover:shadow-clay-hard inline-block">
                Try ${tool.name} →
              </a>
              <a href="https://cursor.com/learn" target="_blank" rel="noopener noreferrer"
                 class="bg-matcha-600 border-2 border-matcha-300 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-matcha-800 transition-all duration-200 inline-block">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ── 5. RECENTLY ADDED SECTION ── */
function renderRecentlyAdded(){
  const container = document.getElementById('recentlyAddedContainer');
  if(!container) return;
  
  const recentTools = AI_TOOLS.filter(t => RECENTLY_ADDED_IDS.includes(t.id));
  
  let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">';
  
  recentTools.forEach(tool => {
    const domain = getDomain(tool.url);
    const logo = logoUrl(tool.url);
    const badgeClass = tool.pricing === 'Free' ? 'badge-free' : tool.pricing === 'Paid' ? 'badge-paid' : 'badge-freemium';
    
    html += `
      <div class="bg-clay-white border-2 border-oat-border rounded-2xl p-5 hover:border-matcha-600 transition-all duration-200 cursor-pointer group hover:-translate-y-1 hover:shadow-clay" 
           onclick="showToolPreview(${tool.id})">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style="background:${tool.color}22;">
            ${logo 
              ? `<img src="${logo}" class="w-8 h-8 object-contain" onerror="this.style.display='none';this.nextSibling.style.display='block'">
                 <span class="text-xl" style="display:none">${tool.icon||'🤖'}</span>`
              : `<span class="text-xl">${tool.icon||'🤖'}</span>`}
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-sm text-clay-black truncate group-hover:text-matcha-600 transition-colors">${tool.name}</h4>
            <span class="text-xs text-warm-charcoal">${tool.cat}</span>
          </div>
        </div>
        <p class="text-xs text-warm-charcoal leading-relaxed mb-3 line-clamp-2">${tool.desc}</p>
        <div class="flex items-center justify-between">
          <span class="card-badge ${badgeClass} text-xs">${tool.pricing}</span>
          <span class="text-xs text-matcha-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">View →</span>
        </div>
      </div>
    `;
  });
  
  html += '</div>';
  container.innerHTML = html;
}

/* ══════════════════════════════════════════════════════════════════════
   CATEGORY PAGES
   ══════════════════════════════════════════════════════════════════════ */

/* ── RENDER CATEGORY PAGE ── */
/**
 * Renders a category page with filtered tools
 * @param {string} category - The category to filter by (e.g., 'Writing', 'Image', 'Coding', 'Video', 'Productivity')
 */
function renderCategoryPage(category) {
  const grid = document.getElementById('aiGrid');
  const toolCountEl = document.getElementById('toolCount');
  
  if (!grid) return;
  
  // Filter tools by category
  const filteredTools = AI_TOOLS.filter(tool => tool.cat === category);
  
  // Update tool count
  if (toolCountEl) {
    toolCountEl.textContent = `${filteredTools.length} tools`;
  }
  
  // Handle empty state
  if (filteredTools.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-xl font-bold text-clay-black mb-2">No tools found</h3>
        <p class="text-warm-charcoal mb-6">We're constantly adding new tools. Check back soon!</p>
        <a href="/" class="inline-block bg-matcha-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-matcha-800 transition-all duration-200 no-underline">
          Browse All Tools
        </a>
      </div>
    `;
    return;
  }
  
  // Call existing renderCards() function with filtered tools array
  renderCards(filteredTools);
}

/* ══════════════════════════════════════════════════════════════════════
   PHASE 4: TRUST & SOCIAL PROOF
   ══════════════════════════════════════════════════════════════════════ */

/* ── REAL STATS COUNTERS ── */
function updateRealStats(){
  const tools = getTools();
  const toolCount = tools.length;
  
  // Count tools submitted by users (tools with id > 1000000000000 are user-submitted)
  const submittedCount = tools.filter(t => t.id > 1000000000000).length;
  
  // Update hero stats
  const statsToolCountEl = document.getElementById('statsToolCount');
  const statsSubmittedCountEl = document.getElementById('statsSubmittedCount');
  
  if(statsToolCountEl) statsToolCountEl.textContent = toolCount;
  if(statsSubmittedCountEl) statsSubmittedCountEl.textContent = submittedCount;
  
  // Update about page stats
  const aboutToolCountEl = document.getElementById('aboutToolCount');
  const aboutSubmittedCountEl = document.getElementById('aboutSubmittedCount');
  
  if(aboutToolCountEl) aboutToolCountEl.textContent = toolCount;
  if(aboutSubmittedCountEl) aboutSubmittedCountEl.textContent = submittedCount;
}

/* ── INIT ── */
renderCards(getTools());       // Render from local cache immediately (fast)
renderBlogs(getBlogPosts());
renderAdminPosts();
renderAdminTools();
renderToolOfTheWeek();         // PHASE 3: Tool of the Week
renderRecentlyAdded();          // PHASE 3: Recently Added
updateRealStats();              // PHASE 4: Update real counters
updateNavAuth();
loadToolsFromSupabase();       // Then silently upgrade to 200 tools from Supabase

// ⌘K / Ctrl+K focuses hero search
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){
    e.preventDefault();
    const hs=document.getElementById('heroSearch');
    if(hs){hs.focus();hs.select();}
  }
});

document.addEventListener('visibilitychange',()=>{
  if(!document.hidden){
    renderBlogs(getBlogPosts());
    updateNavAuth();
    loadToolsFromSupabase(); // Refresh tools from Supabase silently
  }
});

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
  {id:46,name:"Cursor",cat:"Coding",icon:"",color:"#000000",desc:"AI-first code editor built on VS Code — chat with your codebase and ship faster.",pricing:"Freemium",url:"https://cursor.sh"},
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

/* ── DEFAULT BLOG DATA (linking to our own blog articles) ── */
const DEFAULT_BLOGS = [
  {id:1,tag:"students",emoji:"📚",bg:"linear-gradient(135deg,#4F46E5,#7C3AED)",
   title:"Best Free AI Tools for Indian Students in 2026",
   excerpt:"Discover 10 free AI tools that will help you study smarter, write better essays, and ace your exams.",
   date:"Apr 22, 2026",read:"6 min read",author:"IndiaKaAI Team",
   url:"/blog/best-free-ai-tools-indian-students.html"},
  {id:2,tag:"tools",emoji:"🤖",bg:"linear-gradient(135deg,#10a37f,#065F46)",
   title:"ChatGPT vs Gemini: Which is Better for India?",
   excerpt:"Detailed comparison of ChatGPT and Google Gemini for Indian users, including pricing and features.",
   date:"Apr 23, 2026",read:"8 min read",author:"IndiaKaAI Team",
   url:"/blog/chatgpt-vs-gemini-india.html"},
  {id:3,tag:"news",emoji:"🇮🇳",bg:"linear-gradient(135deg,#FF6B00,#FF8C00)",
   title:"Top AI Tools with Hindi Language Support",
   excerpt:"AI tools that work perfectly in Hindi - for content creation, translation, and more.",
   date:"Apr 24, 2026",read:"5 min read",author:"IndiaKaAI Team",
   url:"/blog/ai-tools-hindi-support.html"},
  {id:4,tag:"students",emoji:"💡",bg:"linear-gradient(135deg,#10B981,#059669)",
   title:"ChatGPT Kaise Use Karein - Complete Guide",
   excerpt:"ChatGPT ko Hindi mein kaise use karein - step by step guide with examples.",
   date:"Apr 25, 2026",read:"7 min read",author:"IndiaKaAI Team",
   url:"/blog/chatgpt-kaise-use-karein.html"},
  {id:5,tag:"tools",emoji:"🎯",bg:"linear-gradient(135deg,#F59E0B,#D97706)",
   title:"Best AI Tools in India 2026 - Complete List",
   excerpt:"The ultimate guide to AI tools available in India, with pricing in INR and local alternatives.",
   date:"Apr 26, 2026",read:"10 min read",author:"IndiaKaAI Team",
   url:"/blog/best-ai-tools-india-2026.html"},
  {id:6,tag:"tools",emoji:"🎨",bg:"linear-gradient(135deg,#7C3AED,#5B21B6)",
   title:"Midjourney vs DALL-E 3: Which AI Image Generator to Choose?",
   excerpt:"Compare features, pricing, and image quality of the two leading AI image generators.",
   date:"Apr 27, 2026",read:"8 min read",author:"IndiaKaAI Team",
   url:"/blog/midjourney-vs-dalle-comparison.html"},
  {id:7,tag:"money",emoji:"💼",bg:"linear-gradient(135deg,#EC4899,#BE185D)",
   title:"AI Tools for Small Businesses in India",
   excerpt:"Affordable AI tools that can help Indian small businesses automate and grow.",
   date:"Apr 28, 2026",read:"9 min read",author:"IndiaKaAI Team",
   url:"/blog/ai-tools-for-business-india.html"},
  {id:8,tag:"money",emoji:"🎬",bg:"linear-gradient(135deg,#06B6D4,#0284C7)",
   title:"Free AI Tools for Content Creators in 2026",
   excerpt:"Create videos, images, and written content using these completely free AI tools.",
   date:"Apr 29, 2026",read:"7 min read",author:"IndiaKaAI Team",
   url:"/blog/free-ai-tools-content-creation.html"},
  {id:9,tag:"tools",emoji:"⚡",bg:"linear-gradient(135deg,#374151,#111827)",
   title:"GitHub Copilot vs Cursor vs Codeium — Best AI Coding Tools",
   excerpt:"Developers share which AI code assistant made them 3x more productive.",
   date:"Apr 30, 2026",read:"7 min read",author:"IndiaKaAI Team",
   url:"https://www.techradar.com/best/best-ai-coding-assistants"},
  {id:10,tag:"news",emoji:"🚀",bg:"linear-gradient(135deg,#DC2626,#991B1B)",
   title:"India's AI Startup Ecosystem: The 2026 Report",
   excerpt:"A deep dive into India's growing AI ecosystem — which sectors are exploding.",
   date:"May 1, 2026",read:"6 min read",author:"IndiaKaAI Team",
   url:"https://inc42.com/features/india-ai-ecosystem/"},
  {id:11,tag:"students",emoji:"📖",bg:"linear-gradient(135deg,#10B981,#059669)",
   title:"How to Use ChatGPT to Score Better in Exams",
   excerpt:"Smart strategies to use AI for revision, doubt-clearing and practice questions.",
   date:"May 2, 2026",read:"8 min read",author:"IndiaKaAI Team",
   url:"https://www.geeksforgeeks.org/how-to-use-chatgpt-for-studying/"},
  {id:12,tag:"news",emoji:"🌐",bg:"linear-gradient(135deg,#FF6B00,#9333EA)",
   title:"Everything About the Latest GPT Models in 2026",
   excerpt:"Capabilities, pricing, API access for Indian developers and what changes for you.",
   date:"May 3, 2026",read:"5 min read",author:"IndiaKaAI Team",
   url:"https://techcrunch.com/tag/openai/"},
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
      ${isNew?'<span class="card-new-badge absolute top-3 right-3 bg-matcha-600 text-white text-[0.65rem] font-bold px-2 py-1 rounded-lg tracking-[0.04em] uppercase border-2 border-matcha-800">NEW</span>':''}
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
        ${user ? `<button onclick="toggleBookmark(${t.id}); event.stopPropagation();" class="bookmark-btn text-xl transition-all duration-200 hover:scale-125" title="${isBookmarked(t.id) ? 'Remove bookmark' : 'Bookmark this tool'}">${isBookmarked(t.id) ? '⭐' : '☆'}</button>` : ''}
        <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="visit-btn bg-matcha-600 text-white border-none px-4 py-2 rounded-xl text-[0.75rem] font-semibold cursor-pointer no-underline transition-all duration-200 font-outfit hover:bg-matcha-800 hover:-rotate-2 hover:-translate-y-0.5 hover:shadow-clay-hard">Visit →</a>
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
        <button class="btn-edit text-[0.73rem] px-2.5 py-1.5 flex-1 bg-slushie-500 bg-opacity-20 border-2 border-slushie-800 text-slushie-800 rounded-lg font-semibold hover:-rotate-1 hover:-translate-y-0.5" onclick="openToolModal(${t.id||0})">✏️ Edit</button>
        <button class="btn-del text-[0.73rem] px-2.5 py-1.5 flex-1 bg-pomegranate-400 bg-opacity-20 border-2 border-pomegranate-400 text-pomegranate-400 rounded-lg font-semibold hover:-rotate-1 hover:-translate-y-0.5" onclick="deleteTool(${t.id||0})">🗑️ Delete</button>
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
    const sourceHost=b.url?new URL(b.url).hostname.replace('www.',''):'';
    g.innerHTML+=`
    <div class="blog-card bg-card overflow-hidden transition-all duration-150 cursor-pointer hover:bg-card2" data-btag="${b.tag}">
      <div class="blog-thumb h-[160px] flex items-center justify-center text-[3rem] border-b border-border" style="background:${b.bg||'linear-gradient(135deg,#4F46E5,#7C3AED)'};cursor:pointer;" onclick="${b.url?`window.open('${b.url}','_blank','noopener,noreferrer')`:''}">
        <span class="text-[3.5rem]">${b.emoji||'📝'}</span>
      </div>
      <div class="blog-body p-[18px]">
        <span class="blog-tag inline-block bg-[#1a1a1a] text-muted2 text-[0.68rem] font-semibold px-2 py-0.5 rounded mb-2 uppercase tracking-[0.06em]">${label}</span>
        <div class="blog-title text-[0.95rem] font-semibold mb-1.5 leading-[1.4] text-[#f0f0f0] cursor-pointer" onclick="${b.url?`window.open('${b.url}','_blank','noopener,noreferrer')`:''}"> ${b.title}</div>
        <div class="blog-excerpt text-[0.78rem] text-[#666] leading-[1.55] mb-3">${b.excerpt}</div>
        <div class="blog-meta flex items-center justify-between text-[0.73rem] text-muted">
          <span>${b.date||''} · ${b.read||''}</span>
          <div class="flex gap-2 items-center">
            ${b.url?`<a href="${b.url}" target="_blank" rel="noopener noreferrer" class="text-muted text-[0.72rem] no-underline" title="Source: ${sourceHost}">🔗 ${sourceHost}</a>`:''}
            <span class="read-btn text-muted2 font-medium cursor-pointer text-[0.75rem]" onclick="${b.url?`window.open('${b.url}','_blank','noopener,noreferrer')`:''}">Read →</span>
          </div>
        </div>
        ${isAdmin?`<div class="flex gap-2 mt-2.5 pt-2.5 border-t border-border">
          <button class="btn-edit text-[0.75rem] px-3 py-1" onclick="showPage('admin');openBlogModal(${b.id})">✏️ Edit</button>
          <button class="btn-del text-[0.75rem] px-3 py-1" onclick="deletePost(${b.id})">🗑️ Delete</button>
        </div>`:''}
      </div>
    </div>`;
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
    const catLabels={all:'🔥 All Tools',Writing:'✍️ Writing',Image:'🎨 Image Gen',Video:'🎬 Video',Audio:'🎵 Audio & Music',Coding:'💻 Coding',Productivity:'⚡ Productivity',Research:'🔬 Research',Marketing:'📈 Marketing',Chatbot:'🤖 Chatbots',Data:'📊 Data',Design:'🖌️ Design',Finance:'💰 Finance'};
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
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const na=document.getElementById('nav-'+p);
  if(na)na.classList.add('active');
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
              <a href="${tool.url}" target="_blank" rel="noopener noreferrer" 
                 class="bg-clay-white text-matcha-800 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-lemon-500 hover:text-clay-black transition-all duration-200 hover:-translate-y-1 hover:shadow-clay-hard inline-block">
                Try ${tool.name} →
              </a>
              <button onclick="showToolPreview(${tool.id})" 
                      class="bg-matcha-600 border-2 border-matcha-300 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-matcha-800 transition-all duration-200">
                Learn More
              </button>
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

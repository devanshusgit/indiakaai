# Script to update all HTML files for performance fixes
$files = @(
    "blog/index.html",
    "blog/ai-content-creation-workflow-2026.html",
    "blog/ai-tools-for-business-india.html",
    "blog/ai-tools-hindi-support.html",
    "blog/best-ai-tools-india-2026.html",
    "blog/best-free-ai-tools-indian-students.html",
    "blog/chatgpt-kaise-use-karein.html",
    "blog/chatgpt-vs-gemini-india.html",
    "blog/free-ai-tools-content-creation.html",
    "blog/midjourney-vs-dalle-comparison.html",
    "explore/coding.html",
    "explore/image.html",
    "explore/productivity.html",
    "explore/video.html",
    "explore/writing.html",
    "tools/chatgpt.html",
    "tools/gemini.html"
)

foreach ($file in $files) {
    Write-Host "Processing $file..."
    $content = Get-Content $file -Raw
    
    # 1. Add preconnect hints after charset
    $content = $content -replace '(<meta charset="UTF-8">)', "`$1`n<link rel=`"preconnect`" href=`"https://fonts.googleapis.com`">`n<link rel=`"preconnect`" href=`"https://fonts.gstatic.com`" crossorigin>`n<link rel=`"dns-prefetch`" href=`"https://lnedatdaewcfukaqupze.supabase.co`">`n<link rel=`"dns-prefetch`" href=`"https://www.gstatic.com`">"
    
    # 2. Replace Tailwind CDN with output.css
    $content = $content -replace '<script src="https://cdn\.tailwindcss\.com"></script>[\s\S]*?</script>', '<link rel="stylesheet" href="/css/output.css">'
    
    # 3. Remove EmailJS SDK if present
    $content = $content -replace '<!-- EmailJS SDK -->[\s\S]*?<script src="https://cdn\.jsdelivr\.net/npm/@emailjs/browser@3/dist/email\.min\.js"></script>\s*', ''
    
    # 4. Remove Supabase SDK if present
    $content = $content -replace '<!-- Supabase JS -->[\s\S]*?<script src="https://cdn\.jsdelivr\.net/npm/@supabase/supabase-js@2"></script>\s*', ''
    
    # 5. Remove Firebase scripts if present
    $content = $content -replace '<!-- Firebase.*?-->[\s\S]*?<script src="https://www\.gstatic\.com/firebasejs/[^"]+/firebase-app-compat\.js"></script>\s*', ''
    $content = $content -replace '<script src="https://www\.gstatic\.com/firebasejs/[^"]+/firebase-auth-compat\.js"></script>\s*', ''
    $content = $content -replace '<script src="https://www\.gstatic\.com/firebasejs/[^"]+/firebase-firestore-compat\.js"></script>\s*', ''
    
    # 6. Add deferred scripts before </body> if they have custom JS
    if ($content -match '<script src="/js/') {
        $content = $content -replace '(<script src="/js/api\.js"></script>)', '<!-- SDKs -->`n<script defer src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>`n<script defer src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>`n<script defer src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`n<!-- Custom JS -->`n<script defer src="/js/api.js"></script>'
        $content = $content -replace '<script src="/js/firebase\.js"></script>', '<script defer src="/js/firebase.js"></script>'
        $content = $content -replace '<script src="/js/auth\.js"></script>', '<script defer src="/js/auth.js"></script>'
        $content = $content -replace '<script src="/js/app\.js"></script>', '<script defer src="/js/app.js"></script>'
    }
    
    Set-Content $file -Value $content -NoNewline
    Write-Host "✓ Updated $file"
}

Write-Host "`nAll files updated successfully!"

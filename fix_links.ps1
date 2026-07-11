$repo = "C:\Users\uu\.accio\accounts\1747554937\agents\DID-F456DA-2B0D4C\project\repo_check"

# Replacement map: old pattern → new URL
$replacements = @(
    # Home
    @{ Old='index.html'; New='/' },
    # Blog
    @{ Old='blog.html'; New='/blog' },
    # Product pages (direct)
    @{ Old='product-rigid-boxes.html'; New='/product-rigid-boxes' },
    @{ Old='product-paper-bags.html'; New='/product-paper-bags' },
    @{ Old='product-cake-boxes.html'; New='/product-cake-boxes' },
    @{ Old='product-mailer-boxes.html'; New='/product-mailer-boxes' },
    @{ Old='product-kraft-bags.html'; New='/product-kraft-bags' },
    # Industry pages (old redirect URLs → new canonical)
    @{ Old='custom-packaging-for-cosmetics.html'; New='/packaging-for-cosmetics-brands' },
    @{ Old='custom-packaging-for-jewelry.html'; New='/packaging-for-jewelry-brands' },
    @{ Old='custom-packaging-for-clothing-brands.html'; New='/packaging-for-clothing-boutiques' },
    @{ Old='custom-packaging-for-perfume.html'; New='/packaging-for-perfume-brands' },
    @{ Old='ddp-custom-packaging-supplier-china.html'; New='/packaging-for-ecommerce-brands' },
    @{ Old='luxury-gift-boxes-with-logo.html'; New='/packaging-for-gift-shops' },
    # Industry pages (direct)
    @{ Old='packaging-for-bakeries.html'; New='/packaging-for-bakeries' },
    @{ Old='packaging-for-candle-brands.html'; New='/packaging-for-candle-brands' },
    @{ Old='industry-solutions.html'; New='/industry-cases-2026' },
    @{ Old='industry-cases-2026.html'; New='/industry-cases-2026' },
    # Blog posts in blog.html (href="blog/SLUG.html" → href="/blog/SLUG")
    # These are handled by a regex below
    # index.html anchor
    @{ Old='index.html#factory'; New='/#factory' }
)

$files = @("$repo\index.html", "$repo\blog.html")
$count = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file, [System.Text.UTF8Encoding]::new($false))
    $originalLen = $content.Length

    # 1. Apply exact replacements
    foreach ($r in $replacements) {
        # Handle relative paths: href="old" or href="https://...old"
        $content = $content.Replace('href="' + $r.Old + '"', 'href="' + $r.New + '"')
        $content = $content.Replace('href="https://www.icolorpacks.com/' + $r.Old + '"', 'href="' + $r.New + '"')
    }

    # 2. Fix blog post links: href="blog/SLUG.html" → href="/blog/SLUG"
    $content = [regex]::Replace($content, 'href="blog/([^"]+)\.html"', 'href="/blog/$1"')

    # 3. Fix absolute blog links: https://www.icolorpacks.com/blog/SLUG.html → /blog/SLUG
    $content = [regex]::Replace($content, 'href="https://www\.icolorpacks\.com/blog/([^"]+)\.html"', 'href="/blog/$1"')

    # 4. Keep javascript:void(0).html unchanged - already handled since not in href pattern

    if ($content.Length -ne $originalLen) {
        $utf8 = New-Object System.Text.UTF8Encoding $false
        [System.IO.File]::WriteAllText($file, $content, $utf8)
        $count++
        Write-Output "Fixed: $(Split-Path $file -Leaf) ($originalLen → $($content.Length))"
    }
}

Write-Output "`nFiles modified: $count"
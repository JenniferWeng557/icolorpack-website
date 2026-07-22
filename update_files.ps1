$files = Get-ChildItem -Recurse -Filter *.html | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.git" }

$cake_images = @(
    "images/Ad0e285c6c65b45c89ff12c12f3581396V.webp",
    "images/A021e1d0985554e1ebb806f7c3c66082au.webp",
    "images/A7f3536f52b594e88909e095717803d217.webp"
)

foreach ($file in $files) {
    Write-Host "Updating $($file.FullName)"
    $content = [System.IO.File]::ReadAllText($file.FullName)

    # 1. Style
    if ($content -match '(?i)<style[^>]*>') {
        $rule = "`n        .dropdown:hover .dropdown-content { display: block !important; }"
        if ($content -notmatch [regex]::Escape($rule)) {
            $content = $content -replace '(?i)(<style[^>]*>)', "`$1$rule"
        }
    } else {
        $style_block = "<style>`n        .dropdown:hover .dropdown-content { display: block !important; }`n    </style>`n"
        $content = $content -replace '(?i)(</head>)', "$style_block`$1"
    }

    # 2. Add FAQ link after BLOG
    if ($content -notmatch 'faq.html') {
        $faq_link = '`n            <li><a href="faq.html">FAQ</a></li>'
        $content = $content -replace '(?i)(<li>\s*<a[^>]*href=["''][^"]*blog\.html[^>]*>.*?BLOG.*?</a>\s*</li>)', "`$1$faq_link"
    }

    # 3. Before </body>
    $script_part = '<div id="icpFE"></div><script src="icp-final-floating-fix.js?v=20260709"></script>'
    if ($content -match 'icp-final-floating-fix.js') {
        $content = $content -replace '(?i)<script src="[^"]*icp-final-floating-fix\.js[^"]*"></script>', $script_part
    } else {
        $content = $content -replace '(?i)(</body>)', "$script_part`$1"
    }

    # 4. Links end with .html
    $content = [regex]::Replace($content, 'href=["'']([^"'']+)["'']', {
        param($m)
        $link = $m.Groups[1].Value
        if ($link -match '^(http|https|mailto|tel|javascript|#)' -or $link -match '\.(html|png|webp|jpg|jpeg|css|js|gif|svg)$') {
            return "href=`"$link`""
        }
        $parts = $link.Split('#')
        $base = $parts[0]
        $anchor = if ($parts.Count -gt 1) { "#" + $parts[1] } else { "" }
        if ($base -ne "" -and $base -notmatch '\.') {
            return "href=`"$base.html$anchor`""
        }
        return "href=`"$link`""
    })

    # Special case: product-cake-boxes.html
    if ($file.Name -eq "product-cake-boxes.html") {
        $content = $content -replace '(?i)background:\s*url\([''"][^''"]+[''"]\)', 'background: url(''images/cake-boxes-banner-2026.png'')'
        
        $script:img_idx = 0
        $content = [regex]::Replace($content, '(?i)<div class="product-image"><img src="([^"]+)"', {
            param($m)
            if ($script:img_idx -lt 3) {
                $new_src = $cake_images[$script:img_idx]
                $script:img_idx++
                return "<div class=`"product-image`"><img src=`"$new_src`""
            }
            return $m.Value
        })
    }

    [System.IO.File]::WriteAllText($file.FullName, $content)
}

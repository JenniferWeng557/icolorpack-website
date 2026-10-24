$ErrorActionPreference = 'Stop'
$expectedUrls = @(
  'https://www.icolorpacks.com/product-cake-boxes',
  'https://www.icolorpacks.com/product-kraft-bags',
  'https://www.icolorpacks.com/product-mailer-boxes',
  'https://www.icolorpacks.com/product-paper-bags',
  'https://www.icolorpacks.com/product-rigid-boxes'
)
$repoRoot = Split-Path -Parent $PSScriptRoot
$sitemap = Get-Content -Raw -LiteralPath (Join-Path $repoRoot 'sitemap.xml')
$redirects = Get-Content -Raw -LiteralPath (Join-Path $repoRoot '_redirects')
$failures = @()
foreach ($url in $expectedUrls) {
  $slug = ([System.Uri]$url).AbsolutePath.TrimStart('/')
  $file = Join-Path $repoRoot ($slug + '.html')
  if (-not (Test-Path -LiteralPath $file)) { $failures += "Missing product file: $file" }
  if ($sitemap -notmatch [regex]::Escape("<loc>$url</loc>")) { $failures += "Missing sitemap URL: $url" }
  if ($redirects -match ("(?m)^/" + [regex]::Escape($slug) + "\s+")) { $failures += "Product URL is redirected: /$slug" }
}
if ($failures.Count) { $failures | ForEach-Object { Write-Error $_ }; exit 1 }
Write-Output "Product URL contract passed: $($expectedUrls.Count) existing product URLs are preserved."

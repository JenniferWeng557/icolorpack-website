$ErrorActionPreference = "Stop"
$dir = "C:\Users\uu\.accio\accounts\1747554937\agents\DID-F456DA-2B0D4C\project\cottonvalle-new"
$icons = [System.IO.File]::ReadAllText((Join-Path $dir "floating-icons.html"), [System.Text.Encoding]::UTF8).Trim()

Get-ChildItem $dir -Filter "*.html" -Exclude "floating-icons.html","thank-you.html" | ForEach-Object {
    $name = $_.Name
    $c = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    
    # Find and remove broken icon block: from "<!-- Floating" to after the second </a>
    $idx = $c.IndexOf("Floating WhatsApp")
    if ($idx -ge 0) {
        $a1 = $c.IndexOf("</a>", $idx + 20)
        $a2 = $c.IndexOf("</a>", $a1 + 5)
        if ($a2 -ge 0) {
            $before = $c.Substring(0, $idx - 5)
            $after = $c.Substring($a2 + 4)
            $c = $before + $after
        }
    }
    
    # Clean leftover escape artifacts
    $c = $c -replace '`n', ''
    $c = $c -replace '\\"', '"'
    
    # Insert clean icons right after <body...>
    $bodyIdx = $c.IndexOf('<body')
    $gtIdx = $c.IndexOf('>', $bodyIdx)
    $c = $c.Substring(0, $gtIdx + 1) + "`r`n" + $icons + $c.Substring($gtIdx + 1)
    
    [System.IO.File]::WriteAllText($_.FullName, $c, [System.Text.Encoding]::UTF8)
    Write-Output "OK: $name"
}


$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

$jsonData = Get-Content -Raw "data.json" | ConvertFrom-Json

# Title
$selection.ParagraphFormat.Alignment = 1
$selection.Font.Name = "Microsoft YaHei"
$selection.Font.Size = 22
$selection.Font.Bold = $true
$selection.TypeText("欧美包装经销商/批发商客户清单")
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 1
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 0

# Subtitle
$selection.Font.Size = 9
$selection.Font.Bold = $false
$selection.Font.Color = 8421504
$selection.TypeText("目标国家：美国 / 欧洲 | 产品：礼品袋、礼盒、蛋糕盒 | 共 20 家 | 生成日期：2026-04-16")
$selection.TypeParagraph()
$selection.TypeParagraph()

# Section
$selection.ParagraphFormat.Alignment = 0
$selection.Font.Size = 16
$selection.Font.Bold = $true
$selection.Font.Color = 0
$selection.TypeText("一、 美国（共 12 家）")
$selection.TypeParagraph()

foreach ($c in $jsonData) {
    # Header
    $selection.Font.Size = 11
    $selection.Font.Bold = $true
    $selection.Font.Color = 0
    $selection.TypeText($c.id + ". " + $c.name + " " + $c.suffix)
    $selection.TypeParagraph()
    
    $selection.Font.Size = 10
    
    # Inline Labels and Values
    function Add-F($label, $val) {
        $selection.Font.Bold = $true
        $selection.Font.Color = 3026426
        $selection.TypeText($label + " ")
        $selection.Font.Bold = $false
        $selection.Font.Color = 0
        $selection.TypeText($val + " ")
    }
    
    Add-F "网址" $c.url
    Add-F "产品类别" $c.cats
    Add-F "公司简介" $c.profile
    Add-F "联系电话" $c.phone
    Add-F "邮箱" $c.email
    Add-F "地址" $c.addr
    Add-F "联系人/部门" $c.contact
    Add-F "最低起订量" $c.moq
    Add-F "切入角度" $c.angle
    
    $selection.TypeParagraph()
    $selection.TypeParagraph()
}

$outputPath = Join-Path (Get-Location) "iColorPack_精美排版清单_最终版.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()
Write-Host "Success: $outputPath"

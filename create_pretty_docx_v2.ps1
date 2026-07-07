
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

# Styles
function Set-TitleStyle {
    $selection.ParagraphFormat.Alignment = 1
    $selection.Font.Name = "Microsoft YaHei"
    $selection.Font.Size = 22
    $selection.Font.Bold = $true
    $selection.Font.Color = 0
}

function Set-SubtitleStyle {
    $selection.ParagraphFormat.Alignment = 1
    $selection.Font.Size = 9
    $selection.Font.Bold = $false
    $selection.Font.Color = 8421504
}

function Set-SectionStyle {
    $selection.ParagraphFormat.Alignment = 0
    $selection.Font.Size = 16
    $selection.Font.Bold = $true
    $selection.Font.Color = 0
}

function Set-CompanyHeaderStyle {
    $selection.Font.Size = 11
    $selection.Font.Bold = $true
    $selection.Font.Color = 0
}

function Set-LabelStyle {
    $selection.Font.Size = 10
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426 # #2E8B7A
}

function Set-ValueStyle {
    $selection.Font.Size = 10
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
}

# Title
Set-TitleStyle
$selection.TypeText("欧美包装经销商/批发商客户清单")
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 1
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 0

# Subtitle
Set-SubtitleStyle
$selection.TypeText("目标国家：美国 / 欧洲 | 产品：礼品袋、礼盒、蛋糕盒 | 共 20 家 | 生成日期：2026-04-16")
$selection.TypeParagraph()
$selection.TypeParagraph()

# Section
Set-SectionStyle
$selection.TypeText("一、 美国（共 12 家）")
$selection.TypeParagraph()

# Data
$c1 = @{ id="1"; name="Nashville Wraps"; suffix="-- 美国领先零售及礼品包装分销商 [USA]"; url="https://www.nashvillewraps.com"; cats="礼品袋、各类礼盒、食品/烘焙包装、可持续环保包装。"; profile="Nashville Wraps 是美国礼品包装行业的佼佼者，主打 “Green Way” 环保理念。"; phone="+1 800-547-9727 (转采购部)"; email="abauer@nashvillewraps.com"; addr="2421 Atlan Industrial Dr, Nashville, TN 37207, USA"; contact="Angela Bauer / Product Development"; moq="1 箱起"; angle="对方极其看重环保资质。建议展示 iColorPack 的 FSC 认证。" }

function Add-Company($c) {
    Set-CompanyHeaderStyle
    $selection.TypeText($c.id + ". " + $c.name + " " + $c.suffix)
    $selection.TypeParagraph()
    
    Set-LabelStyle; $selection.TypeText("网址 ")
    Set-ValueStyle; $selection.Font.Color = 16711680; $selection.Font.Underline = 1; $selection.TypeText($c.url + " "); $selection.Font.Underline = 0; $selection.Font.Color = 0
    
    Set-LabelStyle; $selection.TypeText("产品类别 ")
    Set-ValueStyle; $selection.TypeText($c.cats + " ")
    
    Set-LabelStyle; $selection.TypeText("公司简介 ")
    Set-ValueStyle; $selection.TypeText($c.profile + " ")
    
    Set-LabelStyle; $selection.TypeText("联系电话 ")
    Set-ValueStyle; $selection.TypeText($c.phone + " ")
    
    Set-LabelStyle; $selection.TypeText("邮箱 ")
    Set-ValueStyle; $selection.TypeText($c.email + " ")
    
    Set-LabelStyle; $selection.TypeText("地址 ")
    Set-ValueStyle; $selection.TypeText($c.addr + " ")
    
    Set-LabelStyle; $selection.TypeText("最低起订量 ")
    Set-ValueStyle; $selection.TypeText($c.moq + " ")
    
    Set-LabelStyle; $selection.TypeText("切入角度 ")
    Set-ValueStyle; $selection.TypeText($c.angle + " ")
    
    $selection.TypeParagraph()
    $selection.TypeParagraph()
}

Add-Company $c1

$outputPath = Join-Path (Get-Location) "iColorPack_精美排版清单.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()
Write-Host "Success: $outputPath"

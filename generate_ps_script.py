
import json

# The script content with placeholders for Chinese
ps_script_template = r"""
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
$selection.TypeText("TITLE_PLACEHOLDER")
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 1
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 0

# Subtitle
$selection.Font.Size = 9
$selection.Font.Bold = $false
$selection.Font.Color = 8421504
$selection.TypeText("SUBTITLE_PLACEHOLDER")
$selection.TypeParagraph()
$selection.TypeParagraph()

# Section
$selection.ParagraphFormat.Alignment = 0
$selection.Font.Size = 16
$selection.Font.Bold = $true
$selection.Font.Color = 0
$selection.TypeText("SECTION_PLACEHOLDER")
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
    # Label
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL1_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.url + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL2_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.cats + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL3_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.profile + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL4_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.phone + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL5_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.email + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL6_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.addr + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL7_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.contact + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL8_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.moq + " ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("LABEL9_PLACEHOLDER ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText($c.angle + " ")
    
    $selection.TypeParagraph()
    $selection.TypeParagraph()
}

$outputPath = Join-Path (Get-Location) "iColorPack_精美排版清单_最终版.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()
"""

# Replace placeholders
ps_script = ps_script_template.replace("TITLE_PLACEHOLDER", "欧美包装经销商/批发商客户清单")
ps_script = ps_script.replace("SUBTITLE_PLACEHOLDER", "目标国家：美国 / 欧洲 | 产品：礼品袋、礼盒、蛋糕盒 | 共 20 家 | 生成日期：2026-04-16")
ps_script = ps_script.replace("SECTION_PLACEHOLDER", "一、 美国（共 12 家）")
ps_script = ps_script.replace("LABEL1_PLACEHOLDER", "网址")
ps_script = ps_script.replace("LABEL2_PLACEHOLDER", "产品类别")
ps_script = ps_script.replace("LABEL3_PLACEHOLDER", "公司简介")
ps_script = ps_script.replace("LABEL4_PLACEHOLDER", "联系电话")
ps_script = ps_script.replace("LABEL5_PLACEHOLDER", "邮箱")
ps_script = ps_script.replace("LABEL6_PLACEHOLDER", "地址")
ps_script = ps_script.replace("LABEL7_PLACEHOLDER", "联系人/部门")
ps_script = ps_script.replace("LABEL8_PLACEHOLDER", "最低起订量")
ps_script = ps_script.replace("LABEL9_PLACEHOLDER", "切入角度")

# Write to file with BOM
with open("create_pretty_final_v4.ps1", "w", encoding="utf-8-sig") as f:
    f.write(ps_script)

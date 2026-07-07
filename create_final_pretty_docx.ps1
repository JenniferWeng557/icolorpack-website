
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

$selection.Font.Name = "Microsoft YaHei"

# Title
$selection.ParagraphFormat.Alignment = 1
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

function Add-Entry($id, $name, $suffix, $url, $cats, $profile, $phone, $email, $addr, $contact, $moq, $angle) {
    $selection.Font.Size = 11
    $selection.Font.Bold = $true
    $selection.TypeText("$id. $name $suffix")
    $selection.TypeParagraph()
    
    $selection.Font.Size = 10
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("网址 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 16711680
    $selection.Font.Underline = 1
    $selection.TypeText("$url ")
    $selection.Font.Underline = 0
    $selection.Font.Color = 0
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("产品类别 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$cats ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("公司简介 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$profile ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("联系电话 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$phone ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("邮箱 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$email ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("地址 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$addr ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("联系人/部门 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$contact ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("最低起订量 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$moq ")
    
    $selection.Font.Bold = $true
    $selection.Font.Color = 3026426
    $selection.TypeText("切入角度 ")
    $selection.Font.Bold = $false
    $selection.Font.Color = 0
    $selection.TypeText("$angle ")
    
    $selection.TypeParagraph()
    $selection.TypeParagraph()
}

Add-Entry "1" "Nashville Wraps" "-- 美国领先零售及礼品包装分销商 [USA]" "https://www.nashvillewraps.com" "礼品袋、各类礼盒、食品/烘焙包装、可持续环保包装。" "Nashville Wraps 是美国礼品包装行业的佼佼者，主打“Green Way”环保理念。他们为独立零售商、美食店和精品店提供海量现货及定制服务。" "+1 800-547-9727 (转采购部)" "abauer@nashvillewraps.com" "2421 Atlan Industrial Dr, Nashville, TN 37207, USA" "Angela Bauer / Product Development" "1 箱起" "对方极其看重环保资质。建议展示 iColorPack 的 FSC 认证和再生纸产品线。"
Add-Entry "2" "Paper Mart" "-- 北美最大包装及礼品供应批发商 [USA]" "https://www.papermart.com" "全品类工业/零售包装、纸袋、瓦楞盒、缎带及礼盒。" "拥有百年历史的家族企业，全美规模最大的包装材料分销商之一，以海量库存和极速发货闻名。" "+1 714-787-4900" "hchubbuck@papermart.com" "Orange, CA, USA" "Purchasing Team" "大宗批发" "体量巨大，对价格极其敏感。直接报 FOB 直采价格对比。"

$outputPath = Join-Path (Get-Location) "iColorPack_精美排版清单_最终版.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()
Write-Host "Success: $outputPath"

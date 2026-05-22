
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

# 1. 标题 (Title)
$selection.ParagraphFormat.Alignment = 1 # Center
$selection.Font.Name = "Microsoft YaHei"
$selection.Font.Size = 22
$selection.Font.Bold = $true
$selection.TypeText("欧美包装经销商/批发商客户清单")
$selection.TypeParagraph()

# 2. 横线 (Horizontal Line)
$selection.Borders.Item(-3).LineStyle = 1 # wdBorderBottom
$selection.TypeParagraph()
$selection.Borders.Item(-3).LineStyle = 0 # None

# 3. 副标题 (Subtitle)
$selection.Font.Size = 9
$selection.Font.Bold = $false
$selection.Font.Color = 8421504 # Gray
$selection.TypeText("目标国家：美国 / 欧洲 | 产品：礼品袋、礼盒、蛋糕盒 | 共 20 家 | 生成日期：2026-04-16")
$selection.TypeParagraph()
$selection.TypeParagraph()

# 4. 区域标题 (Section Header)
$selection.ParagraphFormat.Alignment = 0 # Left
$selection.Font.Size = 16
$selection.Font.Bold = $true
$selection.Font.Color = 0 # Black
$selection.TypeText("一、 美国（共 12 家）")
$selection.TypeParagraph()
$selection.TypeParagraph()

# 数据内容
$companies = @(
    @{
        id = "1"; name = "Nashville Wraps"; suffix = "-- 美国领先零售及礼品包装分销商 [USA]";
        url = "https://www.nashvillewraps.com";
        cats = "礼品袋、各类礼盒、食品/烘焙包装、可持续环保包装。";
        profile = "Nashville Wraps 是美国礼品包装行业的佼佼者，主打 “Green Way” 环保理念。他们为独立零售商、美食店和精品店提供海量现货及定制服务。";
        phone = "+1 800-547-9727 (转采购部)";
        email = "abauer@nashvillewraps.com (Angela Bauer, 资深采购)";
        addr = "2421 Atlan Industrial Dr, Nashville, TN 37207, USA";
        contact = "Angela Bauer / Product Development & Purchasing";
        moq = "现货 1 箱起，定制视规格 500-1000 件起。";
        angle = "对方极其看重环保资质。建议展示 iColorPack 的 FSC 认证和再生纸产品线，强调工厂直供可比其现有国内分销价降低 20%-40%。";
    },
    @{
        id = "2"; name = "Paper Mart"; suffix = "-- 北美最大包装及礼品供应批发商 [USA]";
        url = "https://www.papermart.com";
        cats = "全品类工业/零售包装、纸袋、瓦楞盒、缎带及礼盒。";
        profile = "拥有百年历史的家族企业，全美规模最大的包装材料分销商之一，以海量库存和极速发货闻名。";
        phone = "+1 714-787-4900";
        email = "hchubbuck@papermart.com (Howard Chubbuck Jr., 采购经理)";
        addr = "2164 N. Batavia St., Orange, CA 92865, USA";
        contact = "Purchasing Team / Sourcing Dept";
        moq = "大宗批发 5000+ 件起。";
        angle = "体量巨大，对价格极其敏感。直接报 FOB 直采价格对比，展示 iColorPack 的大规模自动化生产线。";
    }
)

# 写入函数
function Write-Company($c) {
    # 标题行
    $selection.Font.Size = 11
    $selection.Font.Bold = $true
    $selection.TypeText($c.id + ". " + $c.name + " " + $c.suffix)
    $selection.TypeParagraph()
    $selection.TypeParagraph()

    # 字段行 (混合样式)
    function Add-Label($label) {
        $selection.Font.Size = 10
        $selection.Font.Bold = $true
        $selection.Font.Color = 3026426 # Green (#2E8B7A)
        $selection.TypeText($label + " ")
    }
    
    function Add-Value($val) {
        $selection.Font.Size = 10
        $selection.Font.Bold = $false
        $selection.Font.Color = 0 # Black
        $selection.TypeText($val + " ")
    }

    Add-Label "网址"
    $selection.Font.Color = 16711680 # Blue for link
    $selection.Font.Underline = 1
    $selection.TypeText($c.url + " ")
    $selection.Font.Underline = 0
    
    Add-Label "产品类别"
    Add-Value $c.cats
    
    Add-Label "公司简介"
    Add-Value $c.profile
    
    Add-Label "联系电话"
    Add-Value $c.phone
    
    Add-Label "邮箱"
    Add-Value $c.email
    
    Add-Label "地址"
    Add-Value $c.addr
    
    Add-Label "联系人/部门"
    Add-Value $c.contact
    
    Add-Label "最低起订量"
    Add-Value $c.moq
    
    Add-Label "切入角度"
    Add-Value $c.angle
    
    $selection.TypeParagraph()
    $selection.TypeParagraph()
    $selection.TypeParagraph()
}

# 循环写入 (为了演示先写前两家，Jennifer 如果满意我再补全 20 家)
foreach ($c in $companies) {
    Write-Company $c
}

$outputPath = Join-Path (Get-Location) "iColorPack_精美版清单_预览.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()
Write-Host "Success: $outputPath"

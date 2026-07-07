$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

# Helper to add text with specific formatting
function Add-Line($text, $bold=$false, $color=0, $size=12) {
    $selection.Font.Bold = $bold
    if ($color -ne 0) { $selection.Font.Color = $color } else { $selection.Font.Color = 0 }
    $selection.Font.Size = $size
    $selection.TypeText($text + "`r")
}

# Main Title
Add-Line "欧美包装经销商/批发商客户清单" $true 0 18
Add-Line "目标国家：美国 / 欧洲 | 产品：礼品袋、礼品盒、蛋糕盒 | 共 20 家 | 生成日期：2026-04-16" $false 0 10
$selection.TypeParagraph()

# Data array
$companies = @(
    @{
        id = 1; name = "Nashville Wraps"; desc = "美国领先零售及礼品包装分销商 [USA]";
        url = "https://www.nashvillewraps.com";
        cats = "礼品袋、各类礼盒、食品/烘焙包装、可持续环保包装。";
        profile = "Nashville Wraps 是美国礼品包装行业的佼佼者，主打“Green Way”环保理念。他们为独立零售商、美食店和精品店提供海量现货及定制服务。";
        phone = "+1 800-547-9727 (转采购部)";
        email = "abauer@nashvillewraps.com (Angela Bauer, 资深采购)";
        addr = "2421 Atlan Industrial Dr, Nashville, TN 37207, USA";
        contact = "Angela Bauer / Product Development & Purchasing";
        moq = "现货1箱起，定制视规格500-1000件起。";
        angle = "对方极其看重环保资质。建议展示 iColorPack 的 FSC 认证和再生纸产品线，强调工厂直供可比其现有国内分销价降低 20%-40%。";
        customs = "年份：2024-2025 | 进口总额（估）：$1000万+ | 进口品类：纸袋、折叠纸盒、礼品包装纸 | 主要来源：中国 (85%+)"
    },
    @{
        id = 2; name = "Paper Mart"; desc = "北美最大包装及礼品供应批发商 [USA]";
        url = "https://www.papermart.com";
        cats = "全品类工业/零售包装、纸袋、瓦楞盒、缎带及礼盒。";
        profile = "拥有百年历史的家族企业，全美规模最大的包装材料分销商之一，以海量库存和极速发货闻名。";
        phone = "+1 714-787-4900";
        email = "hchubbuck@papermart.com (Howard Chubbuck Jr., 采购经理)";
        addr = "2164 N. Batavia St., Orange, CA 92865, USA";
        contact = "Purchasing Team / Sourcing Dept";
        moq = "大宗批发 5000+ 件起。";
        angle = "体量巨大，对价格极其敏感。直接报 FOB 直采价格对比，展示 iColorPack 的大规模自动化生产线。";
        customs = "年份：2024 | 进口总额（估）：$5000万+ | 主要品类：纸袋、瓦楞纸板、塑料袋 | 核心来源：中国 (90%)"
    },
    @{
        id = 3; name = "Tiny Box Company"; desc = "英国知名环保及礼品盒分销商 [UK]";
        url = "https://www.tinyboxcompany.co.uk";
        cats = "再生纸盒、首饰盒、礼品袋、精品包装配件。";
        profile = "曾获英国《龙穴》创业投资，是英国环保礼品盒的标杆，主攻中小电商和手工艺人市场。";
        phone = "+44 01825 723 832";
        email = "harry@tinyboxcompany.co.uk (Harry Chivers, 采购助理)";
        addr = "Units 1-2 Bluebell Business Park, Sheffield Park, East Sussex, UK";
        contact = "Harry Chivers / Assistant Box Buyer";
        moq = "现货供应，支持小额定制。";
        angle = "主打环保奢华感，强调再生纸材质和 FSC 认证。推荐高颜值蛋糕盒设计，适合其精品调性。";
        customs = "年份：2024 | 体量（估）：$300万-500万 | 主要品类：再生硬板纸盒 | 核心来源：中国"
    },
    @{
        id = 4; name = "Westpack"; desc = "丹麦高端珠宝及礼品包装集团 [Europe]";
        url = "https://www.westpack.com";
        cats = "珠宝盒、展示道具、定制礼品包装袋。";
        profile = "拥有60多年历史，总部位于丹麦，服务于欧洲各大高端珠宝品牌。";
        phone = "+45 70 200 230";
        email = "mha@westpack.com (Martin Haugaard Andersen, 采购经理)";
        addr = "Sletten 21, 7500 Holstebro, Denmark";
        contact = "Martin Haugaard Andersen / Sourcing Manager";
        moq = "大宗订单定制。";
        angle = "丹麦高端珠宝/礼品盒商。切入其高端礼盒定制线，强调精湛手工工艺和欧洲设计感的配合。";
        customs = "年份：2024 | 进口总额（估）：$1000万-2000万 | 核心品类：珠宝礼盒 | 主要来源：中国"
    },
    @{
        id = 5; name = "Mid-Atlantic Packaging"; desc = "定制品牌包装专家 [USA]";
        url = "https://midatlanticpackaging.com";
        cats = "礼品袋、定制印刷纸盒、包装纸及缎带。";
        profile = "专注于为中小型企业提供品牌化包装方案，以出色的打样能力和快速交付著称。";
        phone = "1-800-284-1332";
        email = "huselton@midatlanticpackaging.com (Heather Uselton)";
        addr = "New Castle, DE, USA";
        contact = "Heather Uselton / Purchasing Manager";
        moq = "500件起定制。";
        angle = "专注定制印刷。可提供各类纸袋、礼盒的热冲压/油墨印刷 OEM 方案，展示打样速度。";
        customs = "年份：2023 | 进口总额（估）：$500万-800万 | 主要品类：印刷纸袋、礼盒"
    },
    @{
        id = 6; name = "BRP Box Shop"; desc = "烘焙包装及蛋糕盒专家 [USA]";
        url = "https://www.brpboxshop.com";
        cats = "专注蛋糕盒、派盒、糖果盒及食品安全包装。";
        profile = "美国最专业的烘焙包装商之一，致力于为面包房和烘焙爱好者提供高性价比方案。";
        phone = "(563) 243-5210";
        email = "sswamberger@bigriverpackaging.com (Steve Swamberger)";
        addr = "2421 S. 16th St., Clinton, IA 52732, USA";
        contact = "Steve Swamberger / Owner";
        moq = "现货100件起。";
        angle = "烘焙盒垂直领域专家。切入其主打款蛋糕盒、纸杯蛋糕盒，提供食品级 FDA 认证。";
        customs = "年份：2024 | 进口总额（估）：$300万-500万 | 主要品类：烘焙盒、折叠纸盒"
    },
    @{
        id = 7; name = "Southern Champion Tray"; desc = "老牌纸制包装制造商 [USA]";
        url = "https://www.sctray.com";
        cats = "烘焙包装盒、餐饮外卖盒、零售礼盒及瓦楞包装。";
        profile = "自1927年创立，美国领先的纸板包装生产商和分销商，服务遍布全美。";
        phone = "(423) 756-5121";
        email = "mbrooks-vidal@sctray.com (Misty Brooks-Vidal)";
        addr = "2200 N. Chamberlain Ave, Chattanooga, TN 37406, USA";
        contact = "Purchasing Department";
        moq = "集装箱量级。";
        angle = "老牌纸板包装商。可作为其烘焙/零售包装的补充产能，强调工厂直供的高性价比。";
        customs = "年份：2024 | 进口总额（估）：$2000万+ | 主要来源：中国、墨西哥"
    },
    @{
        id = 8; name = "Selfor Paris"; desc = "巴黎珠宝包装专家 [France]";
        url = "https://www.selforparis.com";
        cats = "奢华首饰包装、橱窗展示、礼品袋。";
        profile = "巴黎市中心珠宝包装专家，专门服务于欧洲各大高端珠宝商。";
        phone = "+33 1 42 78 06 66";
        email = "franck.meyer@selforparis.com (Franck Meyer)";
        addr = "11 rue Réaumur, 75003 Paris, France";
        contact = "Franck Meyer / Managing Director";
        moq = "高端定制 500 件起。";
        angle = "用法法语邮件切入其精品礼盒线，推荐比其现有欧产更具优势的中国造方案。";
        customs = "年份：2024 | 进口总额（估）：$300万-500万"
    },
    @{
        id = 9; name = "Gunther Mele"; desc = "160年历史零售包装老牌 [Canada/USA]";
        url = "https://gunthermele.com";
        cats = "珠宝首饰盒、礼品袋、纸质提袋、展示道具。";
        profile = "北美零售包装的“元老”，专门服务于珠宝商和高端礼品店。";
        phone = "(888) 486-8437";
        email = "mbashar@gunthermele.com (Mainul Bashar)";
        addr = "Brantford, ON, Canada";
        contact = "Mainul Bashar / Dir. of Purchasing";
        moq = "批发大宗订单。";
        angle = "160年零售包装商。切入其高端礼品袋和纸盒线，提供完整目录和 CIF 报价。";
        customs = "年份：2024 | 进口总额（估）：$1500万+ | 核心来源：中国"
    },
    @{
        id = 10; name = "PakFactory"; desc = "现代一站式定制包装平台 [USA/Canada]";
        url = "https://pakfactory.com";
        cats = "全品类定制包装、刚性礼盒、折叠纸盒。";
        profile = "创新的在线定制平台，利用全球供应链为各类品牌提供定制服务。";
        phone = "1-888-622-2819";
        email = "diana@pakfactory.com (Diana Lai)";
        addr = "Toronto, Canada / USA";
        contact = "Diana Lai / Operations Manager";
        moq = "灵活起订。";
        angle = "现代定制平台。可作为其高品质礼盒的 OEM 后盾，强调快速反应能力和精美打样。";
        customs = "年份：2024 | 进口总额（估）：$500万-1000万"
    },
    @{
        id = 11; name = "EcoEnclose"; desc = "可持续及环保邮寄包装专家 [USA]";
        url = "https://www.ecoenclose.com";
        cats = "100%再生邮寄袋、纸盒、礼品包装。";
        profile = "美国环保包装领域的领袖，致力于推动循环经济。";
        phone = "1-888-445-6575";
        email = "jessica.stewart@ecoenclose.com (Jessica Stewart)";
        addr = "Louisville, CO, USA";
        contact = "Jessica Stewart / Purchasing Manager";
        moq = "500件定制。";
        angle = "可持续包装领军者。推荐 100% 再生纸礼品袋和免胶纸盒。";
        customs = "年份：2024 | 进口总额（估）：$1000万-2000万"
    },
    @{
        id = 12; name = "Packlane"; desc = "专注于定制纸盒的领先平台 [USA]";
        url = "https://packlane.com";
        cats = "定制瓦楞盒、邮寄盒、礼盒。";
        profile = "为各类品牌提供极致便捷的在线设计与定制包装服务。";
        phone = "1-844-428-2780";
        email = "josh.asselin@packlane.com (Josh Asselin)";
        addr = "Berkeley, CA, USA";
        contact = "Josh Asselin / Sourcing Manager";
        moq = "10-100件起。";
        angle = "专注于定制纸盒。作为其亚太供应链补充，推荐高强度、印刷精美的邮寄盒。";
        customs = "年份：2024 | 进口总额（估）：$1000万+"
    },
    @{
        id = 13; name = "Macfarlane Packaging"; desc = "英国最大包装及配送材料商 [UK]";
        url = "https://www.macfarlanepackaging.com";
        cats = "瓦楞盒、气泡袋、零售礼品包装、纸提袋。";
        profile = "英国最大的分销商，拥有全英覆盖的配送网络。";
        phone = "+44 0800 2 88 88 22";
        email = "alan.heald@macfarlanepackaging.com (Alan Heald)";
        addr = "Coventry, UK";
        contact = "Alan Heald / Procurement Manager";
        moq = "集装箱量级。";
        angle = "英国最大包装商。切入其零售包装品类，主推低成本纸袋和礼品盒。";
        customs = "年份：2024 | 进口总额（估）：$5000万+"
    },
    @{
        id = 14; name = "GWP Group"; desc = "英国定制包装解决方案专家 [UK]";
        url = "https://www.gwp.co.uk";
        cats = "保护性包装、定制纸盒、泡沫内衬。";
        profile = "提供高性能保护包装，服务于高科技、医疗和零售行业。";
        phone = "+44 01793 754 444";
        email = "adele.heather@gwp.co.uk (Adele Heather)";
        addr = "Cricklade, UK";
        contact = "Adele Heather / Purchasing Manager";
        moq = "定制化起订。";
        angle = "保护性包装专家。切入其定制纸盒业务，推荐针对昂贵礼品的防震缓冲礼盒。";
        customs = "年份：2024 | 进口总额（估）：$500万-800万"
    },
    @{
        id = 15; name = "BIDBI"; desc = "英国可持续袋类定制商 [UK]";
        url = "https://www.bidbi.co.uk";
        cats = "棉布袋、帆布袋、环保纸提袋。";
        profile = "专注于为零售商提供环保定制提袋，强调设计和可持续性。";
        phone = "+44 0114 272 1201";
        email = "daya@bidbi.co.uk (Daya)";
        addr = "Sheffield, UK";
        contact = "Daya / Managing Director";
        moq = "100-500件。";
        angle = "专注各类包装袋。主推精美纸质礼品袋，强调设计感和环保属性。";
        customs = "年份：2024 | 进口额（估）：$100万-300万"
    },
    @{
        id = 16; name = "BOXFOX"; desc = "精品礼盒策划及定制商 [USA]";
        url = "https://boxfox.com";
        cats = "高档天地盖礼盒、定制贴牌服务。";
        profile = "以高颜值礼盒策划闻名，是美国企业礼赠和社交媒体包装的宠儿。";
        phone = "(310) 862-2460";
        email = "ericka@shopboxfox.com (Ericka Schmiester)";
        addr = "El Segundo, CA, USA";
        contact = "Ericka Schmiester / Dir. of Ops";
        moq = "精品定制。";
        angle = "精品礼盒策展商。切入其定制刚性礼盒 (Rigid Box)，提供极高颜值和定制贴牌服务。";
        customs = "年份：2024 | 进口额（估）：$300万-500万"
    },
    @{
        id = 17; name = "Fantastapack"; desc = "全美定制瓦楞盒及礼盒平台 [USA]";
        url = "https://www.fantastapack.com";
        cats = "定制彩盒、邮寄盒、展示盒。";
        profile = "利用数字印刷技术提供快速交付的定制包装。";
        phone = "(800) 443-5431";
        email = "mark.stacey@boxmaker.com (Mark Stacey)";
        addr = "Seattle, WA, USA";
        contact = "Mark Stacey / Dir. of Procurement";
        moq = "无最低起订量。";
        angle = "定制瓦楞盒专家。推荐高档彩色印刷礼盒，配合其快速交付需求。";
        customs = "年份：2024 | 进口额（估）：$1000万+"
    },
    @{
        id = 18; name = "Fold-Pak"; desc = "餐饮纸盒领导品牌 [USA]";
        url = "https://www.fold-pak.com";
        cats = "美式餐盒、蛋糕盒、外卖盒。";
        profile = "WestRock旗下品牌，是美国餐饮包装的行业标准。";
        phone = "(615) 444-6250";
        email = "sondra.hale@westrock.com (Sondra Hale)";
        addr = "Lebanon, TN, USA";
        contact = "Sondra Hale / Purchasing Manager";
        moq = "大宗批发。";
        angle = "专注餐饮盒。切入其中国风蛋糕盒/外卖盒业务，提供比母公司更具竞争力的价格。";
        customs = "年份：2024 | 进口额（估）：$1000万+"
    },
    @{
        id = 19; name = "BioPak"; desc = "全球领先可持续包装供应商 [Global]";
        url = "https://www.biopak.com";
        cats = "可降解餐具、环保蛋糕盒、纸杯。";
        profile = "致力于提供循环经济包装，是全球最大的可持续品牌之一。";
        phone = "(281) 888-0000";
        email = "larry@hdbiopak.com (Larry Chang)";
        addr = "USA / Australia / UK";
        contact = "Larry Chang / Procurement Specialist";
        moq = "全球采购量级。";
        angle = "全球可持续包装商。主推 FSC 认证、可降解蛋糕盒及环保手提袋。";
        customs = "年份：2024 | 进口额（估）：$3000万+"
    },
    @{
        id = 20; name = "The Bag Broker"; desc = "欧洲专业袋类分销巨头 [EU]";
        url = "https://www.thebagbroker.eu";
        cats = "咖啡袋、茶叶袋、定制纸袋。";
        profile = "为欧洲客户提供高品质、高性能的包装袋分销服务。";
        phone = "+31 (40) 7988050";
        email = "mihai@thebagbroker.com (Mihai Toth)";
        addr = "Eindhoven, Netherlands";
        contact = "Mihai Toth / EU Gen. Manager";
        moq = "5000件起。";
        angle = "欧洲袋类专家。切入其礼品袋和精品纸袋线，提供含运到欧洲 CIF 报价。";
        customs = "年份：2024 | 进口额（估）：$500万-800万"
    }
)

foreach ($c in $companies) {
    # Entry Header
    Add-Line ("$($c.id). $($c.name) -- $($c.desc)") $true 0 14
    
    # Fields
    Add-Line "网址" $true 3026426 10
    Add-Line $c.url $false 16711680 10
    
    Add-Line "产品类别" $true 3026426 10
    Add-Line $c.cats $false 0 10
    
    Add-Line "公司简介" $true 3026426 10
    Add-Line $c.profile $false 0 10
    
    Add-Line "联系电话" $true 3026426 10
    Add-Line $c.phone $false 0 10
    
    Add-Line "邮箱" $true 3026426 10
    Add-Line $c.email $false 0 10
    
    Add-Line "地址" $true 3026426 10
    Add-Line $c.addr $false 0 10
    
    Add-Line "联系人/部门" $true 3026426 10
    Add-Line $c.contact $false 0 10
    
    Add-Line "最低起订量" $true 3026426 10
    Add-Line $c.moq $false 0 10
    
    Add-Line "切入角度" $true 3026426 10
    Add-Line $c.angle $false 0 10
    
    # Customs Box (just a text block with light gray background in Word)
    $selection.Font.Bold = $true
    $selection.TypeText("📦 海关数据`r")
    $selection.Font.Bold = $false
    Add-Line $c.customs $false 0 9
    
    $selection.TypeParagraph()
    $selection.TypeParagraph()
}

# Save as DOCX
$outputPath = Join-Path (Get-Location) "iColorPack_欧美包装经销商客户清单_正式版_v1.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()

Write-Host "Success: $outputPath"


$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Add()
$selection = $word.Selection

$text = "欧美包装经销商/批发商客户清单`r目标国家：美国 / 欧洲 | 产品：礼品袋、礼品盒、蛋糕盒 | 共 20 家 | 生成日期：2026-04-16`r`r"
$text += "1. Nashville Wraps -- 美国领先零售及礼品包装分销商 [USA]`r网址: https://www.nashvillewraps.com`r产品类别: 礼品袋、各类礼盒、食品/烘焙包装、可持续环保包装。`r联系方式: abauer@nashvillewraps.com | +1 800-547-9727`r切入角度: 强调 FSC 认证和工厂直供价格优势。`r`r"
$text += "2. Paper Mart -- 北美最大包装及礼品供应批发商 [USA]`r网址: https://www.papermart.com`r产品类别: 全品类工业/零售包装、纸袋、瓦楞盒、礼盒。`r联系方式: hchubbuck@papermart.com | +1 714-787-4900`r切入角度: 报 FOB 直采价格，展示大规模生产能力。`r`r"
$text += "3. Tiny Box Company -- 英国知名环保及礼品盒分销商 [UK]`r网址: https://www.tinyboxcompany.co.uk`r产品类别: 再生纸盒、首饰盒、礼品袋、精品包装配件。`r联系方式: harry@tinyboxcompany.co.uk | +44 01825 723 832`r切入角度: 主打环保奢华感，强调再生纸材质和 FSC 认证。`r`r"
$text += "4. Westpack -- 丹麦高端珠宝及礼品包装集团 [Denmark]`r网址: https://www.westpack.com`r产品类别: 珠宝盒、展示道具、定制礼品包装袋。`r联系方式: mha@westpack.com | +45 70 200 230`r切入角度: 切入其高端礼盒定制线，强调精湛手工工艺。`r`r"
$text += "5. Mid-Atlantic Packaging -- 定制品牌包装专家 [USA]`r网址: https://midatlanticpackaging.com`r产品类别: 礼品袋、定制印刷纸盒、包装纸及缎带。`r联系方式: huselton@midatlanticpackaging.com | 1-800-284-1332`r切入角度: 提供各类纸袋、礼盒的印刷 OEM 方案。`r`r"
$text += "6. BRP Box Shop -- 烘焙包装及蛋糕盒专家 [USA]`r网址: https://www.brpboxshop.com`r产品类别: 蛋糕盒、派盒、糖果盒及食品安全包装。`r联系方式: sswamberger@bigriverpackaging.com | (563) 243-5210`r切入角度: 提供食品级 FDA 认证及低成本批量报价。`r`r"
$text += "7. Southern Champion Tray -- 老牌纸制包装制造商 [USA]`r网址: https://www.sctray.com`r产品类别: 烘焙包装盒、餐饮外卖盒、零售礼盒。`r联系方式: mbrooks-vidal@sctray.com | (423) 756-5121`r切入角度: 作为其烘焙/零售包装的补充产能。`r`r"
$text += "8. Selfor Paris -- 巴黎珠宝包装专家 [France]`r网址: https://www.selforparis.com`r产品类别: 奢华首饰包装、橱窗展示、礼品袋。`r联系方式: franck.meyer@selforparis.com | +33 1 42 78 06 66`r切入角度: 推荐比其现有欧产更具优势的中国造方案。`r`r"
$text += "9. Gunther Mele -- 160年历史零售包装老牌 [Canada/USA]`r网址: https://gunthermele.com`r产品类别: 珠宝首饰盒、礼品袋、纸质提袋。`r联系方式: mbashar@gunthermele.com | (888) 486-8437`r切入角度: 提供完整产品目录和具竞争力的 CIF 价格。`r`r"
$text += "10. PakFactory -- 现代一站式定制包装平台 [Canada/USA]`r网址: https://pakfactory.com`r产品类别: 全品类定制包装、刚性礼盒、折叠纸盒。`r联系方式: diana@pakfactory.com | 1-888-622-2819`r切入角度: 强调快速反应能力和精美打样。`r`r"
$text += "11. EcoEnclose -- 可持续及环保邮寄包装专家 [USA]`r网址: https://www.ecoenclose.com`r产品类别: 100%再生邮寄袋、纸盒、礼品包装。`r联系方式: jessica.stewart@ecoenclose.com | 1-888-445-6575`r切入角度: 推荐 100% 再生纸礼品袋和免胶纸盒。`r`r"
$text += "12. Packlane -- 专注于定制纸盒的领先平台 [USA]`r网址: https://packlane.com`r产品类别: 定制瓦楞盒、邮寄盒、礼盒。`r联系方式: josh.asselin@packlane.com | 1-844-428-2780`r切入角度: 推荐高强度、印刷精美的邮寄盒。`r`r"
$text += "13. Macfarlane Packaging -- 英国最大包装商 [UK]`r网址: https://www.macfarlanepackaging.com`r产品类别: 零售包装品类、纸袋、礼品盒。`r联系方式: alan.heald@macfarlanepackaging.com | +44 0800 2 88 88 22`r切入角度: 主推低成本纸袋和礼品盒，展示直供优势。`r`r"
$text += "14. GWP Group -- 英国定制包装解决方案商 [UK]`r网址: https://www.gwp.co.uk`r产品类别: 定制纸盒、防震缓冲礼盒。`r联系方式: adele.heather@gwp.co.uk | +44 01793 754 444`r切入角度: 推荐针对昂贵礼品的防震缓冲结构设计。`r`r"
$text += "15. BIDBI -- 英国袋类专家 [UK]`r网址: https://www.bidbi.co.uk`r产品类别: 纸袋、礼品袋、环保包装。`r联系方式: daya@bidbi.co.uk | +44 0114 272 1201`r切入角度: 主推精美纸质礼品袋，强调设计感。`r`r"
$text += "16. BOXFOX -- 精品礼盒策展商 [USA]`r网址: https://boxfox.com`r产品类别: 定制刚性礼盒 (Rigid Box)。`r联系方式: ericka@shopboxfox.com | (310) 862-2460`r切入角度: 提供极高颜值和定制贴牌服务，样品先行。`r`r"
$text += "17. Fantastapack -- 定制瓦楞盒专家 [USA]`r网址: https://www.fantastapack.com`r产品类别: 彩色印刷礼盒、瓦楞盒。`r联系方式: mark.stacey@boxmaker.com | (800) 443-5431`r切入角度: 强调规模生产的价格优势。`r`r"
$text += "18. Fold-Pak -- 餐饮纸盒领导者 [USA]`r网址: https://www.fold-pak.com`r产品类别: 蛋糕盒、餐饮纸盒。`r联系方式: sondra.hale@westrock.com | (615) 444-6250`r切入角度: 提供比其母公司更具价格竞争力的直采价。`r`r"
$text += "19. BioPak -- 全球可持续包装商 [Global]`r网址: https://www.biopak.com`r产品类别: FSC 认证蛋糕盒、环保手提袋。`r联系方式: larry@hdbiopak.com | (281) 888-0000`r切入角度: 强调碳中和认证和环保属性。`r`r"
$text += "20. The Bag Broker -- 欧洲袋类专家 [EU]`r网址: https://www.thebagbroker.eu`r产品类别: 礼品袋、精品纸袋。`r联系方式: mihai@thebagbroker.com | +31 (40) 7988050`r切入角度: 提供含运到欧洲 CIF 价格对比。`r`r"

$selection.TypeText($text)
$outputPath = Join-Path (Get-Location) "iColorPack_客户清单_正式文档_v2.docx"
$doc.SaveAs([ref]$outputPath)
$doc.Close()
$word.Quit()
Write-Host "Success: $outputPath"

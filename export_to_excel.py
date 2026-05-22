import pandas as pd
import re

content = """
| 序号 | 公司名称 | 网址 | 重点联系人 (采购/开发) | 职位 | 邮箱 | 手机/直拨 | 所在地 | 切入角度 | 📦 海关数据/体量 (估) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Nashville Wraps** | [nashvillewraps.com](https://www.nashvillewraps.com) | Angela Bauer | Product Dev Mgr / Senior Buyer | abauer@nashvillewraps.com | 1-800-547-9727 (转采购) | TN, USA | 该司主打环保礼品包装，可推荐其核心款式的工厂直供方案，强调 MOQ 灵活及比其现有供应商低 20-30% 的价格。 | $1000万+ (核心供应商来自中国) |
| 2 | **Paper Mart** | [papermart.com](https://www.papermart.com) | Howard Chubbuck Jr. | Purchasing Manager | hchubbuck@papermart.com | 714-787-4900 | CA, USA | 超大型批发商，痛点在于高周转和成本控制。可提供大宗纸袋/纸盒采购目录，附 FOB 价格优势分析。 | $5000万+ (全品类进口大户) |
| 3 | **Tiny Box Company** | [tinyboxcompany.co.uk](https://www.tinyboxcompany.co.uk) | Harry Chivers | Assistant Box Buyer | harry@tinyboxcompany.co.uk | +44 01825 723 832 | UK | 主打环保奢华感，强调再生纸材质和 FSC 认证。推荐高颜值蛋糕盒设计，适合其精品调性。 | $200万-500万 (英国环保包装翘楚) |
| 4 | **Westpack** | [westpack.com](https://www.westpack.com) | Martin Haugaard Andersen | Sourcing Manager | mha@westpack.com | +45 70 200 230 | Denmark | 丹麦高端珠宝/礼品盒商。切入其高端礼盒定制线，强调精湛手工工艺和欧洲设计感的配合。 | $1000万-2000万 (欧洲跨国直采) |
| 5 | **Mid-Atlantic Packaging** | [midatlanticpackaging.com](https://midatlanticpackaging.com) | Heather Uselton | Purchasing Manager | huselton@midatlanticpackaging.com | 1-800-284-1332 | DE, USA | 专注定制印刷。可提供各类纸袋、礼盒的热冲压/油墨印刷 OEM 方案，展示打样速度。 | $500万-800万 |
| 6 | **BRP Box Shop** | [brpboxshop.com](https://www.brpboxshop.com) | Steve Swamberger | President / Owner | sswamberger@bigriverpackaging.com | (563) 243-5210 | IA, USA | 烘焙盒垂直领域专家。切入其主打款蛋糕盒、纸杯蛋糕盒，提供食品级 FDA 认证及低成本批量报价。 | $300万-500万 |
| 7 | **Southern Champion Tray** | [sctray.com](https://www.sctray.com) | Misty Brooks-Vidal | Purchasing Manager | mbrooks-vidal@sctray.com | (423) 756-5121 | TN, USA | 老牌纸板包装商。可作为其烘焙/零售包装的补充产能，强调工厂直供的高性价比和多样化规格。 | $2000万+ (自有工厂+进口) |
| 8 | **Selfor Paris** | [selforparis.com](https://www.selforparis.com) | Franck Meyer | Managing Director | franck.meyer@selforparis.com | +33 1 42 78 06 66 | France | 巴黎珠宝包装专家。用法语法语邮件切入其精品礼盒线，推荐比其现有欧产更具优势的中国造方案。 | $300万-500万 |
| 9 | **Gunther Mele** | [gunthermele.com](https://gunthermele.com) | Mainul Bashar | Dir. of Purchasing & SCM | mbashar@gunthermele.com | (888) 486-8437 | Canada | 160年零售包装商。切入其高端礼品袋和纸盒线，提供完整的产品目录和具竞争力的 CIF 价格。 | $1500万+ (北美跨国直采) |
| 10 | **PakFactory** | [pakfactory.com](https://pakfactory.com) | Diana Lai | Operations Manager | diana@pakfactory.com | 1-888-622-2819 | Canada/USA | 现代定制平台。可作为其高品质礼盒的 OEM 后盾，强调快速反应能力和精美打样，配合其在线设计。 | $500万-1000万 |
| 11 | **EcoEnclose** | [ecoenclose.com](https://www.ecoenclose.com) | Jessica Stewart | Purchasing Manager | jessica.stewart@ecoenclose.com | 1-888-445-6575 | CO, USA | 可持续包装领军者。推荐 100% 再生纸礼品袋和免胶纸盒，强调循环利用理念及合规证明。 | $1000万-2000万 |
| 12 | **Packlane** | [packlane.com](https://packlane.com) | Josh Asselin | Sourcing Manager | josh.asselin@packlane.com | 1-844-428-2780 | CA, USA | 专注于定制纸盒。作为其亚太供应链补充，推荐高强度、印刷精美的邮寄盒/礼盒系列。 | $1000万+ |
| 13 | **Macfarlane Packaging** | [macfarlanepackaging.com](https://www.macfarlanepackaging.com) | Alan Heald | Procurement Manager | alan.heald@macfarlanepackaging.com | +44 0800 2 88 88 22 | UK | 英国最大包装商。切入其零售包装品类，主推低成本纸袋和礼品盒，展示工厂直供优势。 | $5000万+ (欧洲分销大户) |
| 14 | **GWP Group** | [gwp.co.uk](https://www.gwp.co.uk) | Adele Heather | Purchasing Manager | adele.heather@gwp.co.uk | +44 01793 754 444 | UK | 保护性包装专家。切入其定制纸盒业务，推荐针对昂贵礼品的防震缓冲礼盒结构设计。 | $500万-800万 |
| 15 | **BIDBI (Bag It Don't Bin It)** | [bidbi.co.uk](https://bidbi.co.uk) | Daya | Managing Director | daya@bidbi.co.uk | +44 0114 272 1201 | UK | 专注各类包装袋。主推精美纸质礼品袋，强调设计感和环保属性，切入其零售礼品渠道。 | $100万-300万 |
| 16 | **BOXFOX** | [boxfox.com](https://boxfox.com) | Ericka Schmiester | Director of Operations | ericka@shopboxfox.com | (310) 862-2460 | CA, USA | 精品礼盒策展商。切入其定制刚性礼盒 (Rigid Box)，提供极高颜值和定制贴牌服务，样品先行。 | $300万-500万 |
| 17 | **Fantastapack** | [fantastapack.com](https://www.fantastapack.com) | Mark Stacey | Dir. of Americas Procurement | mark.stacey@boxmaker.com | (800) 443-5431 | WA, USA | 定制瓦楞盒专家。推荐高档彩色印刷礼盒，配合其快速交付需求，强调规模生产的价格优势。 | $1000万+ |
| 18 | **Fold-Pak** | [fold-pak.com](https://www.fold-pak.com) | Sondra Hale | Purchasing Manager | sondra.hale@westrock.com | (615) 444-6250 | TN, USA | 专注餐饮盒。切入其中国风蛋糕盒/外卖盒业务，提供比其西 rock 母公司更具价格竞争力的直采价。 | $1000万+ (集团内部采购) |
| 19 | **BioPak** | [biopak.com](https://www.biopak.com) | Larry Chang | Procurement Specialist | larry@hdbiopak.com | (281) 888-0000 | Global/USA | 全球可持续包装商。主推 FSC 认证、可降解蛋糕盒及环保手提袋，强调碳中和认证。 | $3000万+ |
| 20 | **The Bag Broker** | [thebagbroker.eu](https://www.thebagbroker.eu) | Mihai Toth | EU General Manager | mihai@thebagbroker.com | +31 (40) 7988050 | Netherlands | 欧洲袋类专家。切入其礼品袋和精品纸袋线，提供含运到欧洲 CIF 价格对比，主打大批量。 | $500万-800万 |
"""

lines = content.strip().split('\n')
rows = []
for line in lines:
    if '|' in line and not ':---' in line:
        cols = [c.strip() for c in line.split('|')]
        # Clean markdown formatting like **Name** or [link](url)
        cleaned_cols = []
        for c in cols:
            c = re.sub(r'\*\*(.*?)\*\*', r'\1', c)
            c = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', c)
            cleaned_cols.append(c)
        # Handle rows that might have extra empty elements from split
        filtered_cols = [c for c in cleaned_cols if c or (cols.index(cleaned_cols.index(c)) > 0 and cols.index(cleaned_cols.index(c)) < len(cols)-1)]
        # Based on structure, we want elements from index 1 to -1
        if cleaned_cols[1:-1]:
            rows.append(cleaned_cols[1:-1])

df = pd.DataFrame(rows[1:], columns=rows[0])
output_path = '欧美经销商客户开发清单_礼品袋礼盒蛋糕盒_2026-04-16.xlsx'
df.to_excel(output_path, index=False)
print(f"Excel file created: {output_path}")

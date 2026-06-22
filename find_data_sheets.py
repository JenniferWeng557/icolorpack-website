import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)

print("Checking sheets with actual follow-up dates or contact info...")
filled_sheets = []
for name in xl.sheet_names:
    if name == '客户总览':
        continue
    df = xl.parse(name, header=None)
    # If the sheet has more than 10 rows, or if some cells that should contain values are not null
    # Template has headings. Let's check cells.
    # For example, cell (0, 1), (0, 3), (1, 1), (1, 3)...
    # Let's count non-null values in the sheet
    non_null_count = df.notnull().sum().sum()
    # Template has some headings:
    # 类别, 公司名, 电子邮箱, 客户行业及平台领域, 意向产品, 联系人, 电话, 手机号/WhatsApp, 网址, 品牌, 层级, 合作阶段, 最后跟进日期
    # 跟进日期, 跟进反馈, 备注
    # This is about 16 text headings.
    if non_null_count > 16:
        filled_sheets.append((name, non_null_count))

print("Filled sheets found:", len(filled_sheets))
for name, cnt in filled_sheets[:20]:
    print(f"Sheet '{name}' has {cnt} non-null values.")

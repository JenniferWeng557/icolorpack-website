import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)
df = xl.parse('客户总览', header=None)

for r in range(15):
    row_vals = []
    for c in range(df.shape[1]):
        val = df.iloc[r, c]
        if pd.notnull(val):
            row_vals.append(f"col {c}: {repr(val)}")
    print(f"Row {r}: {row_vals}")

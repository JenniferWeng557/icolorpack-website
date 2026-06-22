import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)
df = xl.parse('4', header=None)

print("Sheet '4' shape:", df.shape)
print("Sheet '4' columns:", list(df.columns))
print("All non-null values in Sheet '4' (row, col, value):")
for r in range(df.shape[0]):
    for c in range(df.shape[1]):
        val = df.iloc[r, c]
        if pd.notnull(val):
            print(f"  ({r}, {c}) = {repr(val)}")

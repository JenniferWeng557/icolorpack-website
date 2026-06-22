import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)
df = xl.parse('客户总览', header=None)

print("Shape of 客户总览:", df.shape)

# Count non-empty values per row (excluding column 0 which is just 序号)
non_empty_rows = []
for r in range(df.shape[0]):
    row_data = df.iloc[r]
    # Check if there is any non-null value in columns 1 to 19
    non_null_cols = row_data.iloc[1:].notnull().sum()
    if non_null_cols > 0:
        non_empty_rows.append((r, non_null_cols, list(row_data.dropna())))

print(f"Total non-empty rows: {len(non_empty_rows)}")
print("\nFirst 10 non-empty rows:")
for r, count, vals in non_empty_rows[:20]:
    print(f"Row {r} ({count} values): {vals[:10]}")

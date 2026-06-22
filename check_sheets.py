import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)

print("Total sheets:", len(xl.sheet_names))
print("First 10 sheet names:", xl.sheet_names[:10])

# Check contents of sheet '1'
df_1 = xl.parse('1', header=None)
print("\nFirst 10 rows of sheet '1':")
print(df_1.head(10).to_string())

# Check contents of sheet '2'
df_2 = xl.parse('2', header=None)
print("\nFirst 10 rows of sheet '2':")
print(df_2.head(10).to_string())

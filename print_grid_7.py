import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)
df = xl.parse('7', header=None)

print(df.iloc[:15, :4])

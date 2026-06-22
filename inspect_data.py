import pandas as pd
import sys

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"

try:
    # Try reading sheet names
    xl = pd.ExcelFile(file_path)
    print("Sheet names:", xl.sheet_names)
    
    # Read first sheet
    df = xl.parse(xl.sheet_names[0], header=None)
    print("First 15 rows of the first sheet:")
    print(df.head(15).to_string())
    
    print("\nShape of the sheet:", df.shape)
except Exception as e:
    print("Error:", e)

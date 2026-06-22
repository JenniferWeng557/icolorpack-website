import pandas as pd

file_path = r"C:\Users\uu\Desktop\客户跟进与管理表格.xls"
xl = pd.ExcelFile(file_path)

for name in ['4', '7']:
    df = xl.parse(name, header=None)
    print(f"\n================ Sheet {name} ================")
    # Print it cell by cell with column and row indices
    for r in range(len(df)):
        row_vals = []
        for c in range(len(df.columns)):
            val = df.iloc[r, c]
            if pd.notnull(val):
                row_vals.append(f"col {c}: {repr(val)}")
        if row_vals:
            print(f"Row {r}: {', '.join(row_vals)}")

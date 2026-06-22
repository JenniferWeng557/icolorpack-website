import winreg

try:
    key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, r"Software\Microsoft\Windows\CurrentVersion\Internet Settings")
    proxy_enable, _ = winreg.QueryValueEx(key, "ProxyEnable")
    proxy_server, _ = winreg.QueryValueEx(key, "ProxyServer")
    print(f"ProxyEnable: {proxy_enable}")
    print(f"ProxyServer: {proxy_server}")
except Exception as e:
    print("Error querying registry:", e)

$proxyServer = ""
# Désactiver le proxy
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0

# Supprimer le serveur proxy
Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name "$proxyServer"

# Actualiser les paramètres Internet Explorer
Invoke-WebRequest -Uri "http://www.msftconnecttest.com/connecttest.txt" -ErrorAction SilentlyContinue

Write-Output "Proxy désactivé et paramètres réinitialisés avec succès."
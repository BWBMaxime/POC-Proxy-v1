$proxyServer = ""  # Mettez à jour avec l'adresse et le port de votre serveur proxy

# Désactiver le proxy
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 0

Remove-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name "$proxyServer"

# Actualiser les paramètres Internet Explorer
Invoke-WebRequest -Uri "http://www.msftconnecttest.com/connecttest.txt"

Write-Output "Proxy désactivé et paramètres réinitialisés avec succès."

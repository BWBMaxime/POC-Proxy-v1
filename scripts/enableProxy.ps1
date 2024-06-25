$proxyServer = "http://localhost:8000"  # Mettez à jour avec l'adresse et le port de votre serveur proxy
# Configurer le proxy pour HTTP et HTTPS
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyServer -Value "$proxyServer"
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings" -Name ProxyEnable -Value 1

# Actualiser les paramètres Internet Explorer
Invoke-WebRequest -Uri "http://www.msftconnecttest.com/connecttest.txt" -Proxy $proxyServer

Write-Output "Proxy configuré avec succès."

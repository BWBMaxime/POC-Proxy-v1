const { exec } = require('child_process');
const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');
const net = require('net');
const path = require('path');

const pathPowershell = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'; // Remplacez par votre chemin exact
const logFile = 'requests.log';
let server;

const proxy = httpProxy.createProxyServer({});

function runPowerShellScript(pathScriptPowershell) {
    // Exécuter le script PowerShell
    exec(`${pathPowershell} -ExecutionPolicy Bypass -File "${pathScriptPowershell}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PowerShell script: ${error}`);
            return;
        }
        console.log(`PowerShell script executed successfully: ${stdout}`);
    });
}

function handleRequest(req, res) {
    fs.appendFileSync(logFile, `${new Date().toISOString()} - ${req.method} ${req.url}\n`);
    proxy.web(req, res, { target: req.url });
}

function handleConnect(req, socket, head) {
    const [, targetHost, targetPort] = req.url.match(/^([^:]+):(\d+)$/);
    const filterStrings = ['chatgpt', 'discord', 'writesonic'];

    // Vérifier si l'une des chaînes filterStrings est présente dans l'URL de la requête
    const isFiltered = filterStrings.some(filterString => req.url.includes(filterString));

    if (isFiltered) {
        fs.appendFileSync(logFile, `${new Date().toISOString()} - CONNECT ${targetHost}:${targetPort}\n`);
    }

    const proxySocket = net.connect(targetPort, targetHost, () => {
        socket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        proxySocket.write(head);
        proxySocket.pipe(socket);
        socket.pipe(proxySocket);
    });
}

function startProxyServer() {
    server = http.createServer((req, res) => {
        handleRequest(req, res);
    });

    server.on('connect', (req, socket, head) => {
        handleConnect(req, socket, head);
    });

    const port = 8000;
    server.listen(port, () => {
        console.log(`Proxy server running on port ${port}`);
        const pathScriptEnableProxy = './NaR-api/scripts/enableProxy.ps1'
        runPowerShellScript(pathScriptEnableProxy);
    });
}

function startProxy() {
    if (!server) {
        const logFilePath = path.join(__dirname, '../../requests.log');
        fs.writeFileSync(logFilePath, '', 'utf8');
        console.log('requests.log file created at the project root');
        console.log('requests.log file created at the project root');
        startProxyServer();
    } else {
        console.log('Proxy server is already running');
    }
}


function stopProxy() {
    if (server) {
        const pathScriptDisableProxy = './NaR-api/scripts/disableProxy.ps1'
        runPowerShellScript(pathScriptDisableProxy);
    } else {
        console.log('Proxy server is already stop');
    }
}



module.exports = {
    startProxy,
    stopProxy
};

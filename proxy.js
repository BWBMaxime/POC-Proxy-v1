const { exec } = require('child_process');
const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');
const net = require('net');

const pathPowershell = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe'; // Remplacez par votre chemin exact
const logFile = 'requests.log';
let server;

const proxy = httpProxy.createProxyServer({});

function runPowerShellScript() {
    exec(`${pathPowershell} -ExecutionPolicy Bypass -File "./scripts/enableProxy.ps1"`, (error, stdout, stderr) => {
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

    fs.appendFileSync(logFile, `${new Date().toISOString()} - CONNECT ${targetHost}:${targetPort}\n`);

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
        runPowerShellScript();
    });
}

function startProxy() {
    if (!server) {
        startProxyServer();
    } else {
        console.log('Proxy server is already running');
    }
}

module.exports = {
    startProxy,
};

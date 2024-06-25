const proxy = require('../proxy');

function enableProxy(req, res) {
    proxy.startProxy();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Proxy enabled successfully');
}

function disableProxy(req, res) {
    proxy.stopProxy();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Proxy enabled successfully');
}

module.exports = {
    enableProxy,
    disableProxy,
};

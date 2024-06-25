const { enableProxy, disableProxy } = require('../controllers/proxy.controller');

module.exports = function routes(req, res) {
    const { url, method } = req;

    if (method === 'GET' && url === '/enableProxy') {
        enableProxy(req, res);
    } else if (method === 'GET' && url === '/disableProxy') {
        disableProxy(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};

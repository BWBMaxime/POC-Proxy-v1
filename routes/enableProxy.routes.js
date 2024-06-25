const { enableProxy } = require('../controllers/proxy.controller');

module.exports = function routes(req, res) {
    const { url, method } = req;

    // Définir vos routes ici
    if (method === 'GET' && url === '/enableProxy') {
        enableProxy(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
};

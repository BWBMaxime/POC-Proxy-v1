const http = require('http');
const routes = require('./routes/proxy.routes');

const port = 8002;

const server = http.createServer(routes);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

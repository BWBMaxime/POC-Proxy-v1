const http = require('http');
const routes = require('./routes/enableProxy.routes');

const port = 8001;

const server = http.createServer(routes);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

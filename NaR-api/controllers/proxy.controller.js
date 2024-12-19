const proxy = require('../proxy');
const fs = require('fs');
const path = require('path');

function enableProxy(req, res) {
    proxy.startProxy();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Proxy enabled successfully');
}

function disableProxy(req, res) {
    // Arrêter le proxy (comme dans votre code original)
    proxy.stopProxy();

    // Chemin vers le fichier requests.log
    const logFilePath = path.join(__dirname, '../../requests.log');

    // Lire le fichier et compter le nombre de lignes
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error reading log file' }));
            return;
        }

        // Compter le nombre de lignes
        const lineCount = data.split('\n').length;

        // Créer l'objet de réponse
        const responseObject = {
            proxy: 'disabled',
            numberLine: lineCount - 1
        };
        fs.unlink(logFilePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting log file:', unlinkErr);
            } else {
                console.log('Log file successfully deleted');
            }
        });
        // Envoyer la réponse
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseObject));
    });
}

module.exports = {
    enableProxy,
    disableProxy,
};

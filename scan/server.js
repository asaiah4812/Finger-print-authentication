const https = require('https');
const fs = require('fs');
const path = require('path');

// Generate self-signed certificates using openssl
const options = {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};

const server = https.createServer(options, (req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

server.listen(3000, () => {
    console.log('Server running at https://localhost:3000/');
});
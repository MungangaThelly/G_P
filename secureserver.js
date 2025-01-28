const https = require('https');
const fs = require('fs');
const app = require('./app');

const SECURE_PORT = process.env.SECURE_PORT || 443;

const privateKey = fs.readFileSync('./src/certs/server.key', 'utf8');
const certificate = fs.readFileSync('./src/certs/server.crt', 'utf8');


const credentials = { key: privateKey, cert: certificate };


https.createServer(credentials, app).listen(SECURE_PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${SECURE_PORT}`);
});

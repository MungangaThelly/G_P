const https = require('https');
const fs = require('fs');
const app = require('./app');

const SECURE_PORT = process.env.SECURE_PORT || 443;

// Check if certificate files exist
const privateKeyPath = './src/certs/server.key';
const certificatePath = './src/certs/server.crt';

try {
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    const certificate = fs.readFileSync(certificatePath, 'utf8');
    
    const credentials = { key: privateKey, cert: certificate };
    
    https.createServer(credentials, app).listen(SECURE_PORT, () => {
        console.log(`HTTPS Server is running on https://localhost:${SECURE_PORT}`);
    });

} catch (error) {
    console.error(`Error reading SSL certificates: ${error.message}`);
    process.exit(1); // Exit the process if certificate files cannot be loaded
}


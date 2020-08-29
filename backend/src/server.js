const path = require('path');
const fs = require('fs');

const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');

require('dotenv').config();

async function main() {

    // Set up Express server
    const app = express();
    const cookieParser = require('cookie-parser');
    app.use(cookieParser());

    // Set up auth endpoints
    const auth = require('./auth.js');
    app.use('/auth', auth.routes);

    // Set up CORS
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    if (enableCors) {
        const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:3000';
        const methods = 'POST';
        const corsOptions = { origin, methods, credentials: true };
        app.use(cors(corsOptions));
    }

    const port = process.env.API_SERVER_PORT || 4000;
    const httpsPort = 8443;
    const key = fs.readFileSync(path.join(__dirname,'../ssl/localhost.key'));
    const cert = fs.readFileSync(path.join(__dirname,'../ssl/localhost.crt'));
    const credentials = {
        key, cert
    };
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);

    httpServer.listen(port, () => {
        console.log(`Backend server running on http://localhost:${port}`);
    });
    httpsServer.listen(httpsPort, () => {
        console.log(`HTTPS version running on https://localhost:${httpsPort}`);
    });
}

main().catch(console.error);


const express = require('express');

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
        const cors = { origin, methods, credentials: true };
        app.use(cors);
    }

    const port = process.env.API_SERVER_PORT || 4000;
    app.listen(port, () => {
        console.log(`Backend server running on http://localhost:${port}`);
    });
}

main().catch(console.error);


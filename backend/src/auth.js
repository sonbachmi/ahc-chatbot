/* Handle server-side user authentication */

const Router = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = new Router();
routes.use(bodyParser.json());

const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:3000';
routes.use(cors({ origin, credentials: true }));

// Get user info
routes.get('/user', (req, res) => {
    res.send({ public: true });
});
routes.get('/callback', (req, res) => {
    console.log('Got auth callback', res.body);
    res.statusCode(200);
});

module.exports = { routes };

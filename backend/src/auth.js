/* Handle server-side user authentication */
const LazadaAPI = require('lazada-open-platform-sdk');

const Router = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = new Router();
routes.use(bodyParser.json());

const lazada = new LazadaAPI('122309', 'sjcJVjql9uGKQys0XgE7AEgynMITsP9M', 'VIETNAM');

const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:3000';
routes.use(cors({ origin, credentials: true }));


async function getAccessToken(code) {
    if (!code) return;
    const token = await lazada.generateAccessToken({code});
    lazada.accessToken = token;
    return token;
}

async function getData(accessToken) {
    let response = await lazada.getBrands({
        offset: '0',
        limit: '10',
    });
    const brands = response.data;
    response = await lazada.getCategoryTree({});
    const categories = response.data;
    response = await lazada.getProducts({
        access_token: accessToken,
        filter: 'all',
        limit: 20
    });
    const products = response.data;

    return { brands, categories, products };
}

// Get user info
routes.get('/user', (req, res) => {
    res.send({ public: true });
});
routes.get('/callback', (req, res) => {
    console.log('Got auth callback', res.body);
    res.statusCode(200);
});
routes.post('/lazada', async (req, res) => {
    const response = { error: true };
    console.log(req.body.code)
    try {
        const accessToken = await getAccessToken(req.body.code);
        console.log(accessToken);
        const data = await getData(accessToken);
        res.send({accessToken, data});
    } catch(err) {
        res.send({...response, ...err})
    }
});

module.exports = { routes };

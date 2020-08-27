const path = require('path');
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const enableHMR = (process.env.ENABLE_HMR || 'true') === 'true';
if (enableHMR && (process.env.NODE_ENV !== 'production')) {
    console.log('Adding dev middleware, enabling HMR');
    /* eslint "global-require": "off" */
    /* eslint "import/no-extraneous-dependencies": "off" */
    const webpack = require('webpack');
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config.js');
    config.entry.app.push('webpack-hot-middleware/client');
    config.plugins = config.plugins || [];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    const compiler = webpack(config);
    app.use(devMiddleware(compiler));
    app.use(hotMiddleware(compiler));
}
app.use(express.static('public'));
const apiProxyTarget = process.env.API_PROXY_TARGET;
if (apiProxyTarget) {
    app.use('/graphql', createProxyMiddleware({
        target: apiProxyTarget,
        changeOrigin: true,
    }));
    app.use('/auth', createProxyMiddleware({
        target: apiProxyTarget,
        changeOrigin: true,
    }));
}
if (!process.env.UI_SERVER_API_ENDPOINT) {
    process.env.UI_SERVER_API_ENDPOINT = process.env.UI_API_ENDPOINT;
}
const env = {
    UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
};
app.get('/env.js', (req, res) => {
    res.send(`window.ENV = ${JSON.stringify(env)}`);
});
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});
const port = process.env.UI_SERVER_PORT || 3000;
app.listen(port, () => {
    console.log(`UI server running on http://localhost:${port}`);
});

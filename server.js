const http = require('http');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const {port} = require('./settings/server/config.js');
const contentSecurityPolicy = require('./settings/server/content-security-policy.js');

const csie = require('./routes/urls.js');
const apis = require('./apis/urls.js');

/**
 * Create HTTP server instance.
 */

const server = express();
const httpServer = http.createServer(server);

/**
 * Start HTTP server.
 */

httpServer.listen(port);

/**
 * Remove default express HTTP response header `x-powered-by`.
 */

server.set('x-powered-by', false);

/**
 * Put easter egg in HTTP response header.
 */

server.use(({}, res, next) => {
    res.set('x-powered-by', 'toolbuddy');
    next();
});

/**
 * Set `Content-Security-Policy-Report-Only` header.
 * Settings can be found at `settings/server/content-security-policy`.
 * Don't change this unless you know what you are doing.
 * @todo reportOnly: false.
 */

server.use(helmet.contentSecurityPolicy({
    directives: contentSecurityPolicy(),
    loose: false,
    reportOnly: true,
}));

/**
 * Compress all HTTP response body using gzip.
 * Use this to minimize transmit data.
 */

server.use(compression());

/**
 * Setup web api routes.
 */

server.use('/api', apis);

/**
 * Setup web page routes.
 */

server.use('/', csie);

/**
 * Setup error handler.
 */

server.use((error, {}, res, {}) => {
    console.error(error);
    res.status(error.status || 500).send(error.message);
});

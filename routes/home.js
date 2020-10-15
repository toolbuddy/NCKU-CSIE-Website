/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/`
 * - `/search`
 */

const express = require('express');

const staticHtml = require('routes/utils/static-html.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

/**
 * Resolve URL `/`.
 */

router.
route([
    '/',
    '/index',
]).
get(staticHtml('home/index'));

/**
 * Resolve URL `/search`.
 */

router.
route('/search').
get(staticHtml('home/search'));

// TODO: implement this route
// .post( urlEncoded, jsonParser, (req, res, next) => {} );

module.exports = router;

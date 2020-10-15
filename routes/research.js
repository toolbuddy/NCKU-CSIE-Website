/**
 * Router module for route `/research`.
 *
 * Including following sub-routes:
 * - `/research`
 * - `/research/lab`
 * - `/research/publication`
 */

const express = require('express');

const staticHtml = require('routes/utils/static-html.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

/**
 * Resolve URL `/research`.
 */

router.
route([
    '/',
    '/index',
]).
get(staticHtml('research/index'));

/**
 * Resolve URL `/research/lab`.
 */

router.
route('/lab').
get(staticHtml('research/lab'));

/**
 * Resolve URL `/research/publication`.
 */

router.
route('/publication').
get(staticHtml('research/publication'));

module.exports = router;

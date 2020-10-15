/**
 * Router module for route `/developer`.
 *
 * Including following sub-routes:
 * - `/`
 */

const express = require('express');

const staticHtml = require('routes/utils/static-html.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

/**
 * Resolve URL `/developer`.
 */

router.
route('/').
get(staticHtml('developer/index'));

module.exports = router;

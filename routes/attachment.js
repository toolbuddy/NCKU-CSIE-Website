/**
 * Router module for route `/developer`.
 *
 * Including following sub-routes:
 * - `/`
 */

const express = require('express');

const staticHtml = require('./utils/static-html.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

/**
 * Resolve URL `/attachment`.
 */

router
.route('/')
.get(staticHtml('attachment/attachment'));

module.exports = router;

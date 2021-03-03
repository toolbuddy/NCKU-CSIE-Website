/**
 * Router module for route `/resource`.
 *
 * Including following sub-routes:
 * - `/resource`
 * - `/resource/rule`
 * - `/resource/rent`
 * - `/resource/fix`
 * - `/resource/ieet`
 * - `/resource/sitemap`
 * - `/resource/alumni`
 * - `/resource/link`
 */

const express = require('express');

const staticHtml = require('./utils/static-html.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

/**
 * Resolve URL `/resource`.
 */

router
.route([
    '/',
    '/index',
])
.get(staticHtml('resource/index'));

/**
 * Resolve URL `/resource/rule`.
 */

router
.route('/rule')
.get(staticHtml('resource/rule'));

/**
 * Resolve URL `/resource/rent`.
 */

router
.route('/rent')
.get(({}, res) => {
    res.redirect('http://www.csie.ncku.edu.tw/Class2014/');
});

/**
 * Resolve URL `/resource/ieet`.
 */

router
.route('/ieet')
.get(({}, res) => {
    res.redirect('http://ieet.csie.ncku.edu.tw/');
});

/**
 * Resolve URL `/resource/ieet`.
 */

router
.route('/ieet')
.get(staticHtml('resource/ieet'));

/**
 * Resolve URL `/resource/sitemap`.
 */

router
.route('/sitemap')
.get(staticHtml('resource/sitemap'));

/**
 * Resolve URL `/resource/alumni`.
 */

router
.route('/alumni')
.get(({}, res) => {
    res.redirect('http://www.csie.ncku.edu.tw/classmate/index.php');
});

/**
 * Resolve URL `/resource/link`.
 */

router
.route('/link')
.get(staticHtml('resource/link'));

module.exports = router;

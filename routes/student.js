/**
 * Router module for route `/student`.
 *
 * Including following sub-routes:
 * - `/student`
 * - `/studetn/high-school`
 * - `/student/college`
 * - `/student/master`
 * - `/student/phd`
 */

const express = require('express');

const staticHtml = require('./utils/static-html.js');

const router = express.Router({
    caseSensitive: true,
    mergeParams: false,
    strict: false,
});

/**
 * Resolve URL `/student`.
 */

router.
route([
    '/',
    '/index',
]).
get(staticHtml('student/index'));

/**
 * Resolve URL `/student/high-school`.
 */

router.
route('/high-school').
get(staticHtml('student/high-school'));

/**
 * Resolve URL `/student/college`.
 */

router.
route('/college').
get(staticHtml('student/college'));

/**
 * Resolve URL `/student/master`.
 */

router.
route('/master').
get(staticHtml('student/master'));

/**
 * Resolve URL `/student/phd`.
 */

router.
route('/phd').
get(staticHtml('student/phd'));

module.exports = router;

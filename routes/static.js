/**
 * Router module for route `/static`.
 *
 * Including following sub-routes:
 * - `/static/css`
 * - `/static/js`
 * - `/static/image`
 */

const express = require('express');
const path = require('path');

const {maxAge, } = require('../settings/server/config.js');
const projectRoot = path.resolve(__dirname, '../..')

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

/**
 * Resolve URL `/static/css`.
 */

router
.use( '/css', express.static(
    path.join( projectRoot, '/static/dist/css' ),
    {
        extensions:  [ 'css', ],
        fallthrough: true,
        index:       false,
        maxAge,
        redirect:    false,
    }
) );

/**
 * Resolve URL `/static/js`.
 */

router
.use( '/js', express.static(
    path.join( projectRoot, '/static/dist/js' ),
    {
        extensions:  [ 'js', ],
        fallthrough: true,
        index:       false,
        maxAge,
        redirect:    false,
    }
) );

/**
 * Resolve URL `/static/image`.
 */

router
.use( '/image', express.static(
    path.join( projectRoot, '/static/src/image' ),
    {
        extensions: [
            'jpg',
            'png',
            'svg',
            'bmp',
        ],
        fallthrough: true,
        index:       false,
        maxAge,
        redirect:    false,
    }
), express.static(
    path.join( projectRoot, '/static/dist/image' ),
    {
        extensions: [
            'jpg',
            'png',
            'svg',
            'bmp',
        ],
        fallthrough: true,
        index:       false,
        maxAge,
        redirect:    false,
    }
) );

module.exports = router;

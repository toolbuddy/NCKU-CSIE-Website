/**
 * Router module for route `/static`.
 *
 * Including following sub-routes:
 * - `/static/css`
 * - `/static/js`
 * - `/static/image`
 */

import path from 'path';

import express from 'express';

import { projectRoot, maxAge, } from 'settings/server/config.js';

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
        fallthrough: false,
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
        fallthrough: false,
        index:       false,
        maxAge,
        redirect:    false,
    }
) );

/**
 * Resolve URL `/static/image`.
 * @todo solve webpack conflict, server side render did not provide data url conversion.
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
        fallthrough: false,
        index:       false,
        maxAge,
        redirect:    false,
    }
) );

export default router;

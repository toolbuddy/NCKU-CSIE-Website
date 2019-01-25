/**
 * Router module for route `/research`.
 *
 * Including following sub-routes:
 * - `/research`
 * - `/research/labs`
 * - `/research/publications`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

const router = express.Router();

/**
 * Resolve URL `/research`.
 */

router
.route( '/' )
.get( staticHtml( 'research/index' ) );

/**
 * Resolve URL `/research/labs`.
 */

router
.route( '/labs' )
.get( staticHtml( 'research/labs' ) );

/**
 * Resolve URL `/research/publications`.
 */

router
.route( '/publications' )
.get( staticHtml( 'research/publications' ) );

export default router;

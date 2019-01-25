/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/`
 * - `/login`
 * - `/search`
 * - `/calendar`
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

const router = express.Router();

/**
 * Resolve URL `/`.
 */

router
.route( '/' )
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/login`.
 */

router
.route( '/login' )
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/search`.
 */

router
.route( '/search' )
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/calender`.
 */

router
.route( '/calendar' )
.get( staticHtml( 'home/index' ) );

/**
 * Resolve URL `/error`.
 */

router
.route( '/error' )
.get( staticHtml( 'home/index' ) );

export default router;

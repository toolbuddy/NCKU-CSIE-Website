/**
 * Router module for route `/`.
 *
 * Including following sub-routes:
 * - `/`
 * - `/login`
 * - `/search`
 * - `/calendar`
 */

import path from 'path';

import express from 'express';

import config from 'settings/server/config.js';

const router = express.Router();

/**
 * Resolve URL `/`.
 */

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/login`.
 */

router.get( /^\/login$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/search`.
 */

router.get( /^\/search$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/calender`.
 */

router.get( /^\/calendar$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/home/index.${ req.query.language }.html` ) );
} );

export default router;

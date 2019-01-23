/**
 * Router module for route `/research`.
 *
 * Including following sub-routes:
 * - `/research`
 * - `/research/labs`
 * - `/research/publications`
 */

import path from 'path';

import express from 'express';

import { projectRoot, } from 'settings/server/config.js';

const router = express.Router();

/**
 * Resolve URL `/research`.
 */

router.get( '/', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/index.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/research/labs`.
 */

router.get( '/labs', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/labs.${ req.query.languageId }.html` ) );
} );

/**
 * Resolve URL `/research/publications`.
 */

router.get( '/publications', ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/publications.${ req.query.languageId }.html` ) );
} );

export default router;

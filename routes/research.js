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

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/index.${ req.query.language }.html` ) );
<<<<<<< HEAD
} );

/**
 * Resolve URL `/research/groups`.
 */

router.get( /^\/groups$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/groups.${ req.query.language }.html` ) );
=======
>>>>>>> b3666109267378fc0667e4b337114d5c0afb0ef8
} );

/**
 * Resolve URL `/research/labs`.
 */

router.get( /^\/labs$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/labs.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/research/publications`.
 */

router.get( /^\/publications$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/research/publications.${ req.query.language }.html` ) );
} );

export default router;

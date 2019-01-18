/**
 * Router module for route `/student`.
 *
 * Including following sub-routes:
 * - `/student`
 * - `/student/college`
 * - `/student/master`
 * - `/student/phd`
 */

import path from 'path';

import express from 'express';

import { projectRoot, } from 'settings/server/config.js';

const router = express.Router();

/**
 * Resolve URL `/student`.
 */

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/student/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/college`.
 */

router.get( /^\/college/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/student/college.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/master`.
 */

router.get( /^\/master$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/student/master.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/student/phd`.
 */

router.get( /^\/phd$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/student/phd.${ req.query.language }.html` ) );
} );

export default router;

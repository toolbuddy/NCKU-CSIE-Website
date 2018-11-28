/**
 * Router module for route `/announcement`.
 *
 * Including following sub-routes:
 * - `/announcement/`
 * - `/announcement/activity`
 * - `/announcement/all`
 * - `/announcement/recruitment`
 * - `/announcement/[id]`
 * - `/announcement/staff`
 */

import path from 'path';

import express from 'express';

import config from 'settings/server/config.js';

const router = express.Router();

/**
 * Resolve URL `/announcement`.
 */

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/announcement/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/announcement/activity`.
 */

router.get( /^\/activity$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/announcement/activity.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/announcement/all`.
 */

router.get( /^\/all$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/announcement/all.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/announcement/recruitment`.
 */

router.get( /^\/recruitment$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/announcement/recruitment.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/announcement/[id]`.
 */

router.get( /^\/\d+$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/announcement/announcement.${ req.query.language }.html` ) );
} );

export default router;

/**
 * Router module for route `/about`.
 *
 * Including following sub-routes:
 * - `/about/`
 * - `/about/award`
 * - `/about/contact`
 * - `/about/intro`
 * - `/about/faculty`
 * - `/about/faculty/[id]`
 * - `/about/staff`
 */

import path from 'path';

import express from 'express';

import { projectRoot, host, staticHost, } from 'settings/server/config.js';

import getFacultyDetail from 'models/faculty/operation/get-faculty-detail.js';

const router = express.Router();

/**
 * Resolve URL `/about`.
 */

router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/index.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/about/award`.
 */

router.get( /^\/award$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/award.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/about/contact`.
 */

router.get( /^\/contact$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/contact.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/about/intro`.
 */

router.get( /^\/intro$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/intro.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/about/faculty`.
 */

router.get( /^\/faculty$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/faculty.${ req.query.language }.html` ) );
} );

/**
 * Resolve URL `/about/faculty/[id]`.
 */

router.get( /^\/faculty\/(\d+)$/, async ( req, res ) => {
    const data = await getFacultyDetail( { profileId: req.params[ 0 ], language: req.query.language, } );
    data.language = req.query.language;
    data.host = host;
    data.staticHost = staticHost;
    res.render( 'about/faculty-detail.pug', data );
} );

/**
 * Resolve URL `/about/staff`.
 */

router.get( /^\/staff$/, ( req, res ) => {
    res.sendFile( path.join( projectRoot, `/static/dist/html/about/staff.${ req.query.language }.html` ) );
} );

export default router;

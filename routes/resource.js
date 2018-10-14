// Router for /resource
import express from 'express';
import path from 'path';
import config from 'settings/server/config.js';

const router = express.Router();

// Resolve URL `/resource`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/index.${ req.query.language }.html` ) );
} );

// Resolve URL `resource/rule`
router.get( /^\/rule$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/rule.${ req.query.language }.html` ) );
} );

// Resolve URL `resource/rent`
router.get( /^\/rent$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/rent.${ req.query.language }.html` ) );
} );

// Resolve URL `resource/fix`
router.get( /^\/fix$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/fix.${ req.query.language }.html` ) );
} );

// Resolve URL `resource/ieet`
router.get( /^\/ieet$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/ieet.${ req.query.language }.html` ) );
} );

// Resolve URL `resource/sitemap`
router.get( /^\/sitemap$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/sitemap.${ req.query.language }.html` ) );
} );

// Resolve URL `resource/alumni`
router.get( /^\/alumni$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot, `/static/dist/html/resource/alumni.${ req.query.language }.html` ) );
} );

export default router;

// Router for `/about`
import express from 'express';
import path from 'path';
import config from 'settings/server/config.js';

const router = express.Router();

// Resolve URL `/about`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/index.${ req.query.language }.html` ));
} );

// Resolve URL `/about/award`
router.get( /^\/award$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/award.${ req.query.language }.html` ));
} );

// Resolve URL `/about/contact`
router.get( /^\/contact$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/contact.${ req.query.language }.html` ));
} );

// Resolve URL `/about/intro`
router.get( /^\/intro$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/intro.${ req.query.language }.html` ));
} );

// Resolve URL `/about/faculty`
router.get( /^\/faculty$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/faculty.${ req.query.language }.html` ));
} );

// Resolve URL `/about/faculty/[id]`
router.get( /^\/faculty\/[0-9]+$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/faculty-detail.${ req.query.language }.html` ));
} );

// Resolve URL `/about/staff`
router.get( /^\/staff$/, ( req, res ) => {
    res.sendFile( path.join( config.projectRoot ,`/static/dist/html/about/staff.${ req.query.language }.html` ));
} );

export default router;

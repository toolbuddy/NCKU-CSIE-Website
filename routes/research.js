// Router for /research
import express from 'express';
import config from 'settings/server/config.js';

const router = express.Router();
const projectRoot = config.projectRoot;

// Resolve URL `/research`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( `${ projectRoot }/static/dist/html/research/index.${ req.query.language }.html` );
} );

// Resolve URL `/research/groups`
router.get( /^\/groups$/, ( req, res ) => {
    res.sendFile( `${ projectRoot }/static/dist/html/research/groups.${ req.query.language }.html` );
} );

// Resolve URL `/research/labs`
router.get( /^\/labs$/, ( req, res ) => {
    res.sendFile( `${ projectRoot }/static/dist/html/research/labs.${ req.query.language }.html` );
} );

// Resolve URL `/research/publications`
router.get( /^\/publications$/, ( req, res ) => {
    res.sendFile( `${ projectRoot }/static/dist/html/research/publications.${ req.query.language }.html` );
} );

export default router;

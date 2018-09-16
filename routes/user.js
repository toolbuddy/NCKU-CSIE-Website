// Router for `/user`
const express = require( 'express' );
const router = express.Router();

// Resolve URL `/user`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/user/index.${ req.query.language }.html` );
} );

// Resolve URL `/user/profile`
router.get( /^\/profile$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/user/index.${ req.query.language }.html` );
} );

// Resolve URL `/user/announcement`
router.get( /^\/announcement$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/user/announcement/index.${ req.query.language }.html` );
} );

// Resolve URL `/user/announcement`
router.get( /^\/announcement\/add$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/user/announcement/add.${ req.query.language }.html` );
} );

// Resolve URL `/user/announcement`
router.get( /^\/announcement\/edit\/(\d+)$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/user/announcement/edit.${ req.query.language }.html` );
} );

module.exports = router;

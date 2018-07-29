// Router for /resource
const express = require( 'express' );
const router = express.Router();

// Resolve URL resource/law
router.get( '/rule', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/law.${ req.query.language }.html` );
} );

// Resolve URL resource/rent
router.get( '/rent', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/rent.${ req.query.language }.html` );
} );

// Resolve URL resource/fix
router.get( '/fix', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/fix.${ req.query.language }.html` );
} );

// Resolve URL resource/ieet
router.get( '/ieet', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/ieet.${ req.query.language }.html` );
} );

// Resolve URL resource/law
router.get( '/resources', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/resources.${ req.query.language }.html` );
} );

module.exports = router;

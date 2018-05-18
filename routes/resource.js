// Router for /resource
const express = require( 'express' );
const router = express.Router();

// Resolve URL resource/law
router.get( '/law', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/law.html` );
} );

// Resolve URL resource/rent
router.get( '/rent', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/rent.html` );
} );

// Resolve URL resource/fix
router.get( '/fix', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/fix.html` );
} );

// Resolve URL resource/ieet
router.get( '/ieet', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/ieet.html` );
} );

// Resolve URL resource/law
router.get( '/resources', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/resources.html` );
} );

module.exports = router;

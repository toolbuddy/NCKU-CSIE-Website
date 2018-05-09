// router for /resource
const express = require( 'express' );
const router = new express.Router();

// resolve URL resource/law
router.get( '/law', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/law.html` );
} );

// resolve URL resource/rent
router.get( '/rent', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/rent.html` );
} );

// resolve URL resource/fix
router.get( '/fix', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/fix.html` );
} );

// resolve URL resource/ieet
router.get( '/ieet', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/ieet.html` );
} );

// resolve URL resource/law
router.get( '/resources', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/resource/resources.html` );
} );

module.exports = router;

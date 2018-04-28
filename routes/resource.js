// router for /resource
const express = require( 'express' );
const router = new express.Router();

// resolve URL resource/law
router.get( '/law', function ( req, res ) {
    res.render( 'resource/law' );
} );

// resolve URL resource/rent
router.get( '/rent', function ( req, res ) {
    res.render( 'resource/rent' );
} );

// resolve URL resource/fix
router.get( '/fix', function ( req, res ) {
    res.render( 'resource/fix' );
} );

// resolve URL resource/ieet
router.get( '/ieet', function ( req, res ) {
    res.render( 'resource/ieet' );
} );

// resolve URL resource/law
router.get( '/resources', function ( req, res ) {
    res.render( 'resource/resources' );
} );

module.exports = router;

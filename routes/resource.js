// router for resource pages

const express = require( 'express' );
const router = new express.Router();

// route to resource/law
router.get( '/law', function ( req, res ) {
    res.render( 'resource/law' );
} );

// route to resource/rent
router.get( '/rent', function ( req, res ) {
    res.render( 'resource/rent' );
} );

// route to resource/fix
router.get( '/fix', function ( req, res ) {
    res.render( 'resource/fix' );
} );

// route to resource/ieet
router.get( '/ieet', function ( req, res ) {
    res.render( 'resource/ieet' );
} );

// route to resource/law
router.get( '/resources', function ( req, res ) {
    res.render( 'resource/resources' );
} );


module.exports = router;

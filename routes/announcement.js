// router for /announcement

const express = require( 'express' );
const router = new express.Router();

// route to /announcement/all
router.get( '/all', function ( req, res ) {
    res.render( 'announcement/all' );
} );

// route to /announcement/administrator
router.get( '/administrator', function ( req, res ) {
    res.render( 'announcement/administrator' );
} );

// route to /announcement/activity
router.get( '/activity', function ( req, res ) {
    res.render( 'announcement/activity' );
} );

// route to /announcement/speech
router.get( '/speech', function ( req, res ) {
    res.render( 'announcement/speech' );
} );

// route to /announcement/recruitment
router.get( '/recruitment', function ( req, res ) {
    res.render( 'announcement/recruitment' );
} );

module.exports = router;

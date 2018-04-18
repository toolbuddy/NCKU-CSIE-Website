// router for /announcement
const express = require( 'express' );
const router = new express.Router();

// resolve URL /announcement/all
router.get( '/all', function ( req, res ) {
    res.render( 'announcement/all' );
} );

// resolve URL /announcement/administrator
router.get( '/administrator', function ( req, res ) {
    res.render( 'announcement/administrator' );
} );

// resolve URL /announcement/activity
router.get( '/activity', function ( req, res ) {
    res.render( 'announcement/activity' );
} );

// resolve URL /announcement/speech
router.get( '/speech', function ( req, res ) {
    res.render( 'announcement/speech' );
} );

// resolve URL /announcement/recruitment
router.get( '/recruitment', function ( req, res ) {
    res.render( 'announcement/recruitment' );
} );

module.exports = router;

// router for /research
const express = require( 'express' );
const router = new express.Router();

// route to /research/labs
router.get( '/labs', function ( req, res ) {
    res.render( 'research/labs' );
} );

// route to /research/groups
router.get( '/groups', function ( req, res ) {
    res.render( 'research/groups' );
} );

// route to /research/publications
router.get( '/publications', function ( req, res ) {
    res.render( 'research/publications' );
} );

// route to /research/awards
router.get( '/awards', function ( req, res ) {
    res.render( 'research/awards' );
} );

// route to /research/conferences
router.get( '/conferences', function ( req, res ) {
    res.render( 'research/conferences' );
} );

module.exports = router;

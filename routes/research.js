// router for /research
const express = require( 'express' );
const router = new express.Router();

// resolve URL /research/labs
router.get( '/labs', function ( req, res ) {
    res.render( 'research/labs' );
} );

// resolve URL /research/groups
router.get( '/groups', function ( req, res ) {
    res.render( 'research/groups' );
} );

// resolve URL /research/publications
router.get( '/publications', function ( req, res ) {
    res.render( 'research/publications' );
} );

// resolve URL /research/awards
router.get( '/awards', function ( req, res ) {
    res.render( 'research/awards' );
} );

// resolve URL /research/conferences
router.get( '/conferences', function ( req, res ) {
    res.render( 'research/conferences' );
} );

module.exports = router;

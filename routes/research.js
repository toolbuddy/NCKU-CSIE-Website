// router for /research
const express = require( 'express' );
const router = new express.Router();

// resolve URL /research/labs
router.get( '/labs', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/research/labs.html` );
} );

// resolve URL /research/groups
router.get( '/groups', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/research/groups.html` );
} );

// resolve URL /research/publications
router.get( '/publications', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/research/publications.html` );
} );

// resolve URL /research/awards
router.get( '/awards', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/research/awards.html` );
} );

// resolve URL /research/conferences
router.get( '/conferences', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/research/conferences.html` );
} );

module.exports = router;

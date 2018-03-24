// router for /student
const express = require( 'express' );
const router = new express.Router();

// route to /student/course
router.get( '/course', function ( req, res ) {
    res.render( 'student/course' );
} );

// route to /student/college
router.get( '/college', function ( req, res ) {
    res.render( 'student/college' );
} );

// route to /student/master
router.get( '/master', function ( req, res ) {
    res.render( 'student/master' );
} );

// route to /student/phd
router.get( '/phd', function ( req, res ) {
    res.render( 'student/phd' );
} );

// route to /student/scholarship
router.get( '/scholarship', function ( req, res ) {
    res.render( 'student/scholarship' );
} );

// route to /student/international
router.get( '/international', function ( req, res ) {
    res.render( 'student/international' );
} );

module.exports = router;

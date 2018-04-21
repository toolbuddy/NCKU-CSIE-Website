// router for /student
const express = require( 'express' );
const router = new express.Router();

// resolve URL /student/course
router.get( '/course', function ( req, res ) {
    res.render( 'student/course' );
} );

// resolve URL /student/college
router.get( '/college', function ( req, res ) {
    res.render( 'student/college' );
} );

// resolve URL /student/master
router.get( '/master', function ( req, res ) {
    res.render( 'student/master' );
} );

// resolve URL /student/phd
router.get( '/phd', function ( req, res ) {
    res.render( 'student/phd' );
} );

// resolve URL /student/scholarship
router.get( '/scholarship', function ( req, res ) {
    res.render( 'student/scholarship' );
} );

// resolve URL /student/international
router.get( '/international', function ( req, res ) {
    res.render( 'student/international' );
} );

module.exports = router;

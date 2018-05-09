// router for /student
const express = require( 'express' );
const router = new express.Router();

// resolve URL /student/course
router.get( '/course', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/course.html` );
} );

// resolve URL /student/college
router.get( '/college', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/college.html` );
} );

// resolve URL /student/master
router.get( '/master', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/master.html` );
} );

// resolve URL /student/phd
router.get( '/phd', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/phd.html` );
} );

// resolve URL /student/scholarship
router.get( '/scholarship', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/scholarship.html` );
} );

// resolve URL /student/international
router.get( '/international', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/international.html` );
} );

module.exports = router;

// Router for /student
const express = require( 'express' );
const router = express.Router();

// Resolve URL /student/course
router.get( '/course', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/course.html` );
} );

// Resolve URL /student/college
router.get( '/college', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/college.html` );
} );

// Resolve URL /student/master
router.get( '/master', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/master.html` );
} );

// Resolve URL /student/phd
router.get( '/phd', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/phd.html` );
} );

// Resolve URL /student/scholarship
router.get( '/scholarship', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/scholarship.html` );
} );

// Resolve URL /student/international
router.get( '/international', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/international.html` );
} );

module.exports = router;

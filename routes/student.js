// Router for /student
const express = require( 'express' );
const router = express.Router();


// Resolve URL /student/college
router.get( '/college', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/college.${ req.query.language }.html` );
} );

// Resolve URL /student/course
router.get( '/course', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/course.${ req.query.language }.html` );
} );

// Resolve URL /student/international
router.get( '/international', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/international.${ req.query.language }.html` );
} );

// Resolve URL /student/international
router.get( '/internship', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/internship.${ req.query.language }.html` );
} );

// Resolve URL /student/master
router.get( '/master', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/master.${ req.query.language }.html` );
} );

// Resolve URL /student/phd
router.get( '/phd', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/phd.${ req.query.language }.html` );
} );

// Resolve URL /student/scholarship
router.get( '/scholarship', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/student/scholarship.${ req.query.language }.html` );
} );

module.exports = router;

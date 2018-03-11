// router for /student
const express = require( 'express' );
const router = express.Router();

// route to /student/course
router.get( '/course', function( req, res ) {
    var get_page = req.query.page;
    res.render( 'student/course', { page: get_page } );
} );

// route to /student/college
router.get( '/college', function( req, res ) {
    var get_page = req.query.page;
    res.render( 'student/college', { page: get_page } );
} );

// route to /student/master
router.get( '/master', function( req, res ) {
    var get_page = req.query.page;
    res.render( 'student/master', { page: get_page } );
} );

// route to /student/phd
router.get( '/phd', function( req, res ) {
    var get_page = req.query.page;
    res.render( 'student/phd', { page: get_page } );
} );

// route to /student/scholarship
router.get( '/scholarship', function( req, res ) {
    var get_page = req.query.page;
    res.render( 'student/scholarship', { page: get_page } );
} );

// route to /student/international
router.get( '/international', function( req, res ) {
    var get_page = req.query.page;
    res.render( 'student/international', { page: get_page } );
} );

module.exports = router;

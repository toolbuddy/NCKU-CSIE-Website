// Router for /about
const express = require( 'express' );
const router = express.Router();

// Resolve URL about/intro
router.get( '/intro', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/intro.html` );
} );

// Resolve URL about/teachers
router.get( '/teachers', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/teachers.html` );
} );

// Deal with URLs to teachers pages
router.get( '/teacher/:id', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/teacher.html` );
} );

// Resolve URL about/members
router.get( '/members', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/members.html` );
} );

// Resolve URL about/honor
router.get( '/honor', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/honor.html` );
} );

// Resolve URL about/location
router.get( '/location', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/location.html` );
} );

module.exports = router;

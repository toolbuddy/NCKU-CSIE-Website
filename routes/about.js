// router for /about
const express = require( 'express' );
const router = new express.Router();

// resolve URL about/intro
router.get( '/intro', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/intro.html` );
} );

// resolve URL about/teachers
router.get( '/teachers', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/teachers.html` );
} );

// deal with URLs to teachers pages
router.get( '/teacher/:id', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/teacher.html` );
} );

// resolve URL about/members
router.get( '/members', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/members.html` );
} );

// resolve URL about/honor
router.get( '/honor', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/honor.html` );
} );

// resolve URL about/location
router.get( '/location', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/location.html` );
} );

module.exports = router;

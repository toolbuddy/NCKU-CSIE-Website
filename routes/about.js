// Router for /about
const express = require( 'express' );
const router = express.Router();

// Resolve URL about/intro
router.get( '/intro', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/intro.${ req.query.language }.html` );
} );

// Resolve URL about/teachers
router.get( '/teachers', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/teachers.${ req.query.language }.html` );
} );

// Resolve URL about/teacher/[id]
router.get( '/teacher/:id', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/teacher.${ req.query.language }.html` );
} );

// Resolve URL about/members
router.get( '/members', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/members.${ req.query.language }.html` );
} );

// Resolve URL about/honor
router.get( '/honor', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/honor.${ req.query.language }.html` );
} );

// Resolve URL about/location
router.get( '/location', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/about/location.${ req.query.language }.html` );
} );

module.exports = router;

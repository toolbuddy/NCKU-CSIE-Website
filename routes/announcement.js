// router for /announcement
const express = require( 'express' );
const router = new express.Router();

// resolve URL /announcement/all
router.get( '/all', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/all.html` );
} );

// resolve URL /announcement/administrator
router.get( '/administrator', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/administrator.html` );
} );

// resolve URL /announcement/activity
router.get( '/activity', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/activity.html` );
} );

// resolve URL /announcement/speech
router.get( '/speech', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/speech.html` );
} );

// resolve URL /announcement/recruitment
router.get( '/recruitment', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/recruitment.html` );
} );

module.exports = router;

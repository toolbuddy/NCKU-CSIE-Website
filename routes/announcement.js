// Router for /announcement
const express = require( 'express' );
const router = express.Router();

// Resolve URL /announcement/all
router.get( '/all', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/all.html` );
} );

// Resolve URL /announcement/administrator
router.get( '/administrator', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/administrator.html` );
} );

// Resolve URL /announcement/activity
router.get( '/activity', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/activity.html` );
} );

// Resolve URL /announcement/speech
router.get( '/speech', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/speech.html` );
} );

// Resolve URL /announcement/recruitment
router.get( '/recruitment', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/recruitment.html` );
} );

module.exports = router;

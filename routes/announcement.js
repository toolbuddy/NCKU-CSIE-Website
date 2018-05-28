// Router for /announcement
const express = require( 'express' );
const router = express.Router();

// Resolve URL /announcement/all
router.get( '/all', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/all.${ req.query.language }.html` );
} );

// Resolve URL /announcement/administrator
router.get( '/administrator', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/administrator.${ req.query.language }.html` );
} );

// Resolve URL /announcement/activity
router.get( '/activity', ( req, res ) => {
// Resolve URL /announcement/speech
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/speech.${ req.query.language }.html` );
} );

// Resolve URL /announcement/recruitment
router.get( '/recruitment', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/announcement/recruitment.${ req.query.language }.html` );
} );

module.exports = router;

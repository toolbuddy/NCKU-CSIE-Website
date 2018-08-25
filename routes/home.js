// Router for /home
const express = require( 'express' );

const router = express.Router();

// Resolve URL `/`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.${ req.query.language }.html` );
} );

// Route to login page
router.get( '/login', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.${ req.query.language }.html` );
} );

// Route to search page
router.get( '/search', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.${ req.query.language }.html` );
} );

// Route to calender page
router.get( '/calendar', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.${ req.query.language }.html` );
} );

module.exports = router;

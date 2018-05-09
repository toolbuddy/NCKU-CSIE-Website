// router for /home
const express = require( 'express' );

const router = new express.Router();

// route to root directory
router.get( '/', function ( req, res ) {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.html` );
} );

module.exports = router;

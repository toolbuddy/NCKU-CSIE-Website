const express = require( 'express' );

const router = express.Router();

// route to root directory
router.get( '/', function( req, res ) {
    console.log(req.query);
    res.render( 'home/index' );
} );

module.exports = router;

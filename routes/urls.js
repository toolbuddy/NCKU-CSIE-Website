const express = require( 'express' );


const home = require( './home' );
const about = require( './about' );

const router = express.Router();

router.use( '/', home );
router.use( '/about', about );


module.exports = router;

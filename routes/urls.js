const express = require( 'express' );

const home = require( './home' );
const research = require( './research' );

const router = express.Router();

router.use( '/', home );
router.use( '/research', research );

module.exports = router;

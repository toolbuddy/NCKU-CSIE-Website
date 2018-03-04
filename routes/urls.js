const express = require( 'express' );


const home = require( './home' );
const about = require( './about' );
const announce = require('./announce');
const resource = require('./resource');

const router = express.Router();

router.use( '/', home );
router.use( '/about', about );
router.use('/announce', announce);
router.use('/resource', resource);

module.exports = router;

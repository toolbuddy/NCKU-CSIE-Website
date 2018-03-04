const express = require( 'express' );

const home = require( './home' );
const announce = require('./announce');
const resource = require('./resource');
const student = require( './student' );

const router = express.Router();

router.use( '/', home );
router.use('/announce', announce);
router.use('/resource', resource);
router.use('/student',student);

module.exports = router;

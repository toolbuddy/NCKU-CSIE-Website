const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );

const router = express.Router();

router.use( '/', home );

// Resolve URL /student
router.use( '/student', student );

// Resolve URL /about
router.use( '/about', about );

// Resolve URL /research
router.use( '/research', research );

// Resolve URL /announcement
router.use( '/announcement', announcement );

// Resolve URL /resource
router.use( '/resource', resource );

module.exports = router;

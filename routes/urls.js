const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );

const router = express.Router();

router.use( '/', home );

// Resolve URL /about
router.use( '/about', about );

// Resolve URL /announcement
router.use( '/announcement', announcement );

// Resolve URL /research
router.use( '/research', research );

// Resolve URL /resource
router.use( '/resource', resource );

// Resolve URL /student
router.use( '/student', student );

module.exports = router;

const express = require( 'express' );
const path = require( 'path' );

const projectRoot = path.dirname( __dirname );
const home = require( path.join( projectRoot, 'routes/home' ) );
const student = require( path.join( projectRoot, 'routes/student' ) );
const about = require( path.join( projectRoot, 'routes/about' ) );
const research = require( path.join( projectRoot, 'routes/research' ) );
const announcement = require( path.join( projectRoot, 'routes/announcement' ) );
const resource = require( path.join( projectRoot, 'routes/resource' ) );
const search = require( path.join( projectRoot, 'routes/search' ) );
const login = require( path.join( projectRoot, 'routes/login' ) );
const calendar = require( path.join( projectRoot, 'routes/calendar' ) );

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

router.use( '/search', search );

router.use( '/login', login );

router.use( '/calendar', calendar );

module.exports = router;

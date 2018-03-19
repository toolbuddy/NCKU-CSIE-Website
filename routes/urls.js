const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );

const config = require( '../settings/server/config' );

const router = express.Router();

router.use( '/', home );
// route to pages belongs to /student
router.use( '/student', student );
// route to pages belongs to /about
router.use( '/about', about );
// route to pages belongs to /research
router.use( '/research', research );
// route to pages belongs to /announcement
router.use( '/announcement', announcement );
// route to pages belongs to /resource
router.use( '/resource', resource );

module.exports = router;

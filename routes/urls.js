const express = require( 'express' );

const home = require( './home' );
const student = require( './student' );
const about = require( './about' );
const research = require( './research' );
const announcement = require( './announcement' );
const resource = require( './resource' );
const api = require( '../apis/urls' );

const config = require( '../settings/server/config' );

const router = express.Router();

const static_path = config.staticUrl();

const urlSettings = ( req, res, next ) => {
    res.locals.static = static_path;
    next();
};

router.use( '/', urlSettings, home );
// route to pages belongs to /student
router.use( '/student', urlSettings, student );
// route to pages belongs to /about
router.use( '/about', urlSettings,  about );
// route to pages belongs to /research
router.use( '/research', urlSettings, research );
// route to pages belongs to /announcement
router.use( '/announcement', urlSettings, announcement );
// route to pages belongs to /resource
router.use( '/resource', urlSettings, resource );
router.use( '/api', api );

module.exports = router;

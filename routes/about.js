const express = require( 'express' );
const router = express.Router();

// deal with the URL about. 
router.get( '/', function( req, res ) {
    res.render(
            'about/index'
    );
});

// deal with the URL about/intro.
router.get( '/intro', function( req, res ) {
    res.render(
            'about/intro'
    );
});

// deal with the URL about/teachers.
router.get( '/teachers', function( req, res ) {
    res.render(
            'about/teachers'
    );
});

// deal with the URL about/members.
router.get( '/members', function( req, res  ) {
    res.render(
            'about/members'
    );
});

// deal with the URL about/hornor.
router.get( '/hornor', function( req, res ) {
    res.render(
            'about/hornor'
    );
});

// deal with the URL about/traffic.
router.get( '/traffic', function( req, res ) {
    res.render(
            'about/traffic'
    );
});

// deal with the URL about/joinus.
router.get( '/joinus', function( req, res ) {
    res.render(
            'about/joinus'
    );
});

module.exports = router;

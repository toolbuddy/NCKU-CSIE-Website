const express = require( 'express' );
const router = express.Router();

router.get( '/', function( req, res ) {
    res.render(
            'about/index'
    );
});

router.get( '/intro', function( req, res ) {
    res.render(
            'about/intro'
    );
});

router.get( '/teachers', function( req, res ) {
    res.render(
            'about/teachers'
    );
});

router.get( '/members', function( req, res  ) {
    res.render(
            'about/members'
    );
});

router.get( '/hornor', function( req, res ) {
    res.render(
            'about/hornor'
    );
});
router.get( '/traffic', function( req, res ) {
    res.render(
            'about/traffic'
    );
});

router.get( '/joinus', function( req, res ) {
    res.render(
            'about/joinus'
    );
});

module.exports = router;


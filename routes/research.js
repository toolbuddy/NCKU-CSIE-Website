const express = require( 'express' );
const router = express.Router();

router.get( '/', function(req, res) {
    res.render(
        'research/research'
    );
} );

router.get( '/lab', function(req, res) {
    res.render(
        'research/lab'
    );
} );

router.get( '/research_group', function(req, res) {
    res.render(
        'research/research_group'
    );
} );

router.get( '/publication', function(req, res) {
    res.render(
        'research/publication'
    );
} );

router.get( '/award', function(req, res) {
    res.render(
        'research/award'
    );
} );

router.get( '/conference', function(req, res) {
    res.render(
        'research/conference'
    );
} );

module.exports = router;

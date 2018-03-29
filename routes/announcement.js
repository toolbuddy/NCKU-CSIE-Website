const express = require( 'express' );
const router = express.Router();

// route to filter (announcement/)
router.get( '/', (req, res) => {
    res.render('/');
} );

// route to /announcement/all
router.get( '/all', (req, res) => {
    res.render('/all');
} );

// route to /announcement/administrator
router.get( '/administrator', (req, res) => {
    res.render( '/administrator' );
} );

// route to /announcement/activity
router.get( '/activity', (req, res) => {
    res.render( '/acivity' );
} );

// route to /announcement/speech
router.get( '/speech', () => {
    res.render( '/speech' );
} );

// route to /announcement/recruitment
router.get( '/recruitment', () => {
    res.render( '/recruitment' );
} );

function errorHandler( err, req, res, next ) {
    //if ( res. )
}

module.exports = router;

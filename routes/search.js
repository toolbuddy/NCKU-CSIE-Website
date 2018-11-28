// Router for /search
const express = require( 'express' );
const router = express.Router();

// Resolve URL `/resource`
router.get( /^\/$/, ( req, res ) => {
    res.send( req.query.searchText );
} );

module.exports = router;

const express = require( 'express' );
const router = express.Router();
const announcement = require( '../models/announcement' );

// route to filter (announcement/)
router.get( '/course', (req, res) => {
    res.json( announcement.findForIndex() );
} );

// route to /announcement/all
router.get( '/college', (req, res) => {
    res.json( announcement.findForIndex() );
} );

module.exports = router;

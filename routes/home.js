// Router for /home
const express = require( 'express' );

const router = express.Router();

// Resolve URL `/`
router.get( /^\/$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.${ req.query.language }.html` );
} );

module.exports = router;

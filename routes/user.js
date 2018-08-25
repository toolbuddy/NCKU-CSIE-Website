// Router for `/user`
const express = require( 'express' );
const router = express.Router();

// Resolve URL `/user/announcement`
router.get( /^\/announcement$/, ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/user/announcement.${ req.query.language }.html` );
} );

module.exports = router;

// Router for /home
const express = require( 'express' );

const router = express.Router();

// Route to root directory
router.get( '/', ( req, res ) => {
    res.sendFile( `${ global.projectRoot }/static/dist/html/home/index.html` );
} );

module.exports = router;

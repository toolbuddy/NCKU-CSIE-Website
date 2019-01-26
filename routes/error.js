/**
 * Router module for error handling.
 *
 */

import express from 'express';

import staticHtml from 'routes/utils/static-html.js';

const router = express.Router( {
    caseSensitive: true,
    mergeParams:   false,
    strict:        false,
} );

router
.use( ( req, res, next ) => {
    console.error( req.baseUrl );
    res.status( 404 );
    next();
},
staticHtml( 'error/404' ) );

export default router;

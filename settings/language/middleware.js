const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( __dirname ) );
const language = require( path.join( projectRoot, 'settings/language/config' ) );

module.exports = ( req, res, next ) => {
    // No language option provided, using default option.
    req.query.language = req.query.language || language.default;

    // Invalid language option provided, response with error.
    if ( !language.support.includes( req.query.language ) )
        /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).send( 'invalid language option' );

    // Valid language option provided, call `next()` to continue routing.
    else
        next();
};

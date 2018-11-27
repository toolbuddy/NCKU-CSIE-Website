import language from 'settings/language/config.js';

export default function ( req, res, next ) {
    // No language option provided, using default option.
    req.query.language = req.query.language || language.default;

    // Invalid language option provided, response with error.
    if ( !language.support.includes( req.query.language ) )
    /* eslint no-magic-numbers: 'off' */
        res.status( 400 ).send( 'invalid language option' );

    // Valid language option provided, call `next()` to continue routing.
    else
        next();
}

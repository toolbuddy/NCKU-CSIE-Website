/**
 * Language middleware module for `express`.
 *
 * @typedef {object} Request
 * @typedef {object} Response
 * @typedef {function} Middleware
 */

/**
 * Check language query value in request.
 *
 * If query is not set, use default language id.
 * If query is not supported, response 400.
 * If query is supported, pass request to next middleware.
 * @param {Request}    req  - Request from client.
 * @param {Response}   res  - Response for client.
 * @param {Middleware} next - Next middleware to handle request `req`.
 */

module.exports = async function ( req, res, next ) {
    if ( !req.session.user ) {
        if ( req.path === '/id' || req.method !== 'GET' )
            res.status( 401 ).send( { message: 'Unauthorized.', } );

        else
            res.redirect( '/login' );
    }
    else
        next();
}

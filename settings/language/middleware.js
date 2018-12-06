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
 * If query is not set, use default language.
 * If query is not supported, response 400.
 * If query is supported, pass request to next middleware.
 * @param {Request}    req  - Request from client.
 * @param {Response}   res  - Response for client.
 * @param {Middleware} next - Next middleware to handle request `req`.
 */

import language from 'settings/language/config.js';

export default function ( req, res, next ) {
    /**
     * If no language query is provided, use default language option.
     */

    req.query.language = req.query.language || language.default;

    /**
     * If invalid language query is provided, response with 400.
     * @todo use 400 page to present.
     */

    if ( !language.support.includes( req.query.language ) )
        res.status( 400 ).send( 'invalid language option' );

    /**
     * If valid language query is provided, call `next()` to handle request `req`.
     */

    else
        next();
}

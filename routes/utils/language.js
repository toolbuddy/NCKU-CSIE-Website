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

import LanguageUtils from 'models/common/utils/language.js';

export default function ( req, res, next ) {
    if ( typeof ( req.query.languageId ) === 'undefined' )
        req.query.languageId = LanguageUtils.defaultLanguageId;

    /**
     * If valid language id query is provided, call `next()` to handle request `req`.
     */

    req.query.languageId = Number( req.query.languageId );
    if ( LanguageUtils.isSupportedLanguageId( req.query.languageId ) )
        next();

    /**
     * If invalid language id query is provided, response with 400.
     * @todo use 400 page to present.
     */

    else
        res.status( 400 ).send( 'invalid language option' );
}

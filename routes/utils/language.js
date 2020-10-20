/**
 * Check language query value in request.
 *
 * If query is not set, use default language id.
 * If query is not supported, response 400.
 * If query is supported, pass request to next middleware.
 * @param {Request}    req  - Request from client.
 * @param {Middleware} next - Next middleware to handle request `req`.
 */

const LanguageUtils = require('../../models/common/utils/language.js');

module.exports = (req, {}, next) => {
    if (typeof (req.query.languageId) === 'undefined')
        req.query.languageId = LanguageUtils.defaultLanguageId;

    // If valid language id query is provided, call `next()` to handle request `req`.
    req.query.languageId = Number(req.query.languageId);
    if (LanguageUtils.isSupportedLanguageId(req.query.languageId))
        next();

    // If invalid language id query is provided, response with 400.
    else {
        const error = new Error('Invalid language option');
        error.status = 400;
        next(error);
    }
};

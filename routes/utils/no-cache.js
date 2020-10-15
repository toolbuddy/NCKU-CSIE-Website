/**
 * Set header for response that don't use cache.
 *
 * TODO: fulfill this comment.
 * @param {Response}   res  - Response for client.
 * @param {Middleware} next - Next middleware to handle request `req`.
 */

module.exports = ({}, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
};

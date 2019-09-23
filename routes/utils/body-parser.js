import express from 'express';

/**
 * Url-encoded parser for HTTP request body.
 * Request header `Content-Type` can only be one of the supported types.
 * Mainly used by `<form method='POST' enctype='x-www-form-urlencoded'>`.
 */

/**
 * JSON parser for HTTP request body.
 * Request header `Content-Type` can only be JSON related MIME types.
 * Maximum supported JSON size is 5GB.
 */

const urlEncoded = express.urlencoded( {
    extended: true,
    limit:    '5GB',
    type:     [
        'application/x-www-form-urlencoded',
        'multipart/form-data',
        'text/*',
        '*/json',
        'application/xhtml+xml',
        'application/xml',
    ],
} );

const jsonParser = express.json( {
    limit: '5GB',
    type:  '*/json',
} );

export {
    jsonParser,
    urlEncoded,
};

export default {
    jsonParser,
    urlEncoded,
};

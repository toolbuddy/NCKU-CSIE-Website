/**
 * Static html file middleware wrapper module.
 * Because it use `req.query.languageId` to get requested language version of HTML,
 * it should only be used after middleware `routes/utils/language.js`.
 */

import { projectRoot, maxAge, } from 'settings/server/config.js';

export default file => ( req, res, next ) => {
    res.sendFile(
        `static/dist/html/${ file }.${ req.query.languageId }.html`,
        {
            root:         projectRoot,
            maxAge,
            dotfiles:     'deny',
            cacheControl: true,
        },
        ( err ) => {
            if ( err )
                next( err );
        }
    );
};

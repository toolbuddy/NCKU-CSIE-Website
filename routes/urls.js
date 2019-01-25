/**
 * Router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - home:         `/`
 * - about:        `/about`
 * - announcement: `/announcement`
 * - research:     `/research`
 * - resource:     `/resource`
 * - student:      `/student`
 * - user:         `/user`
 */

import express from 'express';

import about from 'routes/about.js';
import announcement from 'routes/announcement.js';
import auth from 'routes/auth.js';
import home from 'routes/home.js';
import research from 'routes/research.js';
import resource from 'routes/resource.js';
import student from 'routes/student.js';
import user from 'routes/user.js';

import { host, staticHost, } from 'settings/server/config.js';
import LanguageUtils from 'models/common/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';

const router = express.Router();

router.use( ( req, res, next ) => {
    res.locals = {
        SERVER: {
            host,
            staticHost,
        },
        LANG: {
            id:            req.query.languageId,
            getLanguageId: LanguageUtils.getLanguageId,
        },
        UTILS: {
            url: UrlUtils.serverUrl( new UrlUtils( host, req.query.languageId ) ),
        },
    };
    next();
} );

/**
 * Resolve URL `/`.
 */

router.use( '/', home );

/**
 * Resolve URL `/about`.
 */

router.use( '/about', about );

/**
 * Resolve URL `/announcement`.
 */

router.use( '/announcement', announcement );

/**
 * Resolve URL `/auth`.
 */

router.use( '/auth', auth );

/**
 * Resolve URL `/research`.
 */

router.use( '/research', research );

/**
 * Resolve URL `/resource`.
 */

router.use( '/resource', resource );

/**
 * Resolve URL `/student`.
 */

router.use( '/student', student );

/**
 * Resolve URL `/user`.
 */

router.use( '/user', user );

export default router;

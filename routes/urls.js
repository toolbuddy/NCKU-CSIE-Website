/**
 * Router middleware module for `/`.
 *
 * Including following sub-routing modules:
 * - home:         `/`
 * - about:        `/about`
 * - announcement: `/announcement`
 * - auth:         `/auth`
 * - developer:    `/developer`
 * - research:     `/research`
 * - resource:     `/resource`
 * - student:      `/student`
 * - user:         `/user`
 */

import path from 'path';
import express from 'express';
import expressSession from 'express-session';
import SequelizeStore from 'connect-session-sequelize';

import { host, maxAge, projectRoot, secret, staticHost, } from 'settings/server/config.js';
import language from 'routes/utils/language.js';
import staticHtml from 'routes/utils/static-html.js';
import staticFile from 'routes/static.js';
import UrlUtils from 'static/src/js/utils/url.js';
import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';
import databases from 'models/common/utils/connect.js';

import home from 'routes/home.js';
import about from 'routes/about.js';
import announcement from 'routes/announcement.js';
import auth from 'routes/auth.js';
import developer from 'routes/developer.js';
import research from 'routes/research.js';
import resource from 'routes/resource.js';
import student from 'routes/student.js';
import user from 'routes/user.js';

const app = express();

/**
 * Setup language option.
 */

app.use( language );

/**
 * Set HTML template engine.
 */

app.locals.basedir = path.join( projectRoot, '/static/src/pug' );
app.set( 'view engine', 'pug' );
app.set( 'views', path.join( projectRoot, '/static/src/pug' ) );

/**
 * Setup static files routes.
 */

app.use( '/static', staticFile );

/**
 * Set variables for frontend to render page.
 */

app.use( ( req, res, next ) => {
    res.locals.SERVER = {
        host,
        staticHost,
    };
    res.locals.LANG = {
        id:            req.query.languageId,
        getLanguageId: LanguageUtils.getLanguageId,
    };
    res.locals.UTILS = {
        url:       UrlUtils.serverUrl( new UrlUtils( host, req.query.languageId ) ),
        staticUrl: UrlUtils.serverUrl( new UrlUtils( staticHost, req.query.languageId ) ),
        ValidateUtils,
    };
    next();
} );

/**
 * Setup session store
 */

const SessionStore = SequelizeStore( expressSession.Store );
app.use( expressSession( {
    store: new SessionStore( {
        db:    databases.user,
        table: 'session',
    } ),
    cookie: {
        maxAge,
        path:     '/',
        httpOnly: true,
        sameSite: 'lax',
        secure:   false,
    },
    name:              'sessionId',
    secret,
    saveUninitialized: false,
    resave:            false,
    unset:             'destroy',
    rolling:           false,
    proxy:             false,
} ) );

/**
 * Resolve URL `/`.
 */

app.use( '/', home );

/**
 * Resolve URL `/about`.
 */

app.use( '/about', about );

/**
 * Resolve URL `/announcement`.
 */

app.use( '/announcement', announcement );

/**
 * Resolve URL `/auth`.
 */

app.use( '/auth', auth );

/**
 * Resolve URL `/developer`.
 */

app.use( '/developer', developer );

/**
 * Resolve URL `/research`.
 */

app.use( '/research', research );

/**
 * Resolve URL `/resource`.
 */

app.use( '/resource', resource );

/**
 * Resolve URL `/student`.
 */

app.use( '/student', student );

/**
 * Resolve URL `/user`.
 */

app.use( '/user', user );

app.use(
    ( {}, res, next ) => {
        res.status( 404 );
        next();
    },
    staticHtml( 'error/404' )
);

export default app;

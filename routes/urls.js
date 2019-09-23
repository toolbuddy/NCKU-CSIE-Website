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

import path from 'path';

import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import about from 'routes/about.js';
import announcement from 'routes/announcement.js';
import auth from 'routes/auth.js';
import home from 'routes/home.js';
import language from 'routes/utils/language.js';
import research from 'routes/research.js';
import resource from 'routes/resource.js';
import staticFile from 'routes/static.js';
import staticHtml from 'routes/utils/static-html.js';
import student from 'routes/student.js';
import developer from 'routes/developer.js';
import user from 'routes/user.js';

import { urlEncoded, jsonParser, } from 'routes/utils/body-parser.js';

import { host, staticHost, projectRoot, secret, } from 'settings/server/config.js';
import LanguageUtils from 'models/common/utils/language.js';
import UrlUtils from 'static/src/js/utils/url.js';
import ValidateUtils from 'models/common/utils/validate.js';

const app = express();

app.use( cookieParser() );

app.use( expressSession( {
    cookie: {
        maxAge:   7 * 24 * 60 * 60 * 1000,
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
 * Set HTML template engine.
 */

app.locals.basedir = path.join( projectRoot, '/static/src/pug' );
app.set( 'view engine', 'pug' );
app.set( 'views', path.join( projectRoot, '/static/src/pug' ) );

/**
 * Setup language option.
 */

app.use( language );

/**
 * Setup static files routes.
 */

app.use( '/static', urlEncoded, jsonParser, staticFile );

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


// App.use( checkSession );

/**
 * Resolve URL `/`.
 */

app.use( '/', urlEncoded, jsonParser, home );

/**
 * Resolve URL `/about`.
 */

app.use( '/about', urlEncoded, jsonParser, about );

/**
 * Resolve URL `/announcement`.
 */

app.use( '/announcement', urlEncoded, jsonParser, announcement );

/**
 * Resolve URL `/auth`.
 */

app.use( '/auth', urlEncoded, jsonParser, auth );

/**
 * Resolve URL `/research`.
 */

app.use( '/research', urlEncoded, jsonParser, research );

/**
 * Resolve URL `/resource`.
 */

app.use( '/resource', urlEncoded, jsonParser, resource );

/**
 * Resolve URL `/student`.
 */

app.use( '/student', urlEncoded, jsonParser, student );

/**
 * Resolve URL `/developer`.
 */

app.use( '/developer', urlEncoded, jsonParser, developer );

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

app.use( ( err, {}, res, {} ) => {
    res.sendStatus( 500 );
} );

export default app;

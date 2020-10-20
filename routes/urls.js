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

const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const SequelizeStore = require('connect-session-sequelize');

const {host, maxAge, secret, staticHost} = require('../settings/server/config.js');
const language = require('./utils/language.js');
const staticHtml = require('./utils/static-html.js');
const staticFile = require('./static.js');
const UrlUtils = require('../static/src/js/utils/url.js');
const LanguageUtils = require('../models/common/utils/language.js');
const ValidateUtils = require('../models/common/utils/validate.js');
const databases = require('../models/common/utils/connect.js');

const home = require('./home.js');
const about = require('./about.js');
const announcement = require('./announcement.js');
const auth = require('./auth.js');
const developer = require('./developer.js');
const research = require('./research.js');
const resource = require('./resource.js');
const student = require('./student.js');
const user = require('./user.js');

const projectRoot = path.resolve(__dirname, '..');
const app = express();

/**
 * Setup language option.
 */

app.use(language);

/**
 * Set HTML template engine.
 */

app.locals.basedir = path.join(projectRoot, '/static/src/pug');
app.set('view engine', 'pug');
app.set('views', path.join(projectRoot, '/static/src/pug'));

/**
 * Setup static files routes.
 */

app.use('/static', staticFile);

/**
 * Set variables for frontend to render page.
 */

app.use((req, res, next) => {
    res.locals.SERVER = {
        host,
        staticHost,
    };
    res.locals.LANG = {
        id: req.query.languageId,
        getLanguageId: LanguageUtils.getLanguageId,
    };
    res.locals.UTILS = {
        url: UrlUtils.serverUrl(new UrlUtils(host, req.query.languageId)),
        staticUrl: UrlUtils.serverUrl(new UrlUtils(staticHost, req.query.languageId)),
        ValidateUtils,
    };
    next();
});

/**
 * Setup session store
 */

const SessionStore = SequelizeStore(expressSession.Store);
app.use(expressSession({
    store: new SessionStore({
        db: databases.user,
        table: 'session',
    }),
    cookie: {
        maxAge,
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
    },
    name: 'sessionId',
    secret,
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
    rolling: false,
    proxy: false,
}));

/**
 * Resolve URL `/`.
 */

app.use('/', home);

/**
 * Resolve URL `/about`.
 */

app.use('/about', about);

/**
 * Resolve URL `/announcement`.
 */

app.use('/announcement', announcement);

/**
 * Resolve URL `/auth`.
 */

app.use('/auth', auth);

/**
 * Resolve URL `/developer`.
 */

app.use('/developer', developer);

/**
 * Resolve URL `/research`.
 */

app.use('/research', research);

/**
 * Resolve URL `/resource`.
 */

app.use('/resource', resource);

/**
 * Resolve URL `/student`.
 */

app.use('/student', student);

/**
 * Resolve URL `/user`.
 */

app.use('/user', user);

app.use(
    ({}, res, next) => {
        res.status(404);
        next();
    },
    staticHtml('error/404'),
);

module.exports = app;

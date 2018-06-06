const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );
const { url, port, } = require( `${ projectRoot }/settings/server/config` );
const jsFrontend = require( `${ projectRoot }/dev/gulp/js/config` );
const jsBackend = require( `${ projectRoot }/dev/gulp/server/config` );
const css = require( `${ projectRoot }/dev/gulp/css/config` );
const html = require( `${ projectRoot }/dev/gulp/html/config` );
const database = require( `${ projectRoot }/dev/gulp/database/config` );

/**
 * @constant
 * @readonly {Object} config.js.frontend - Configuration for Frontend JavaScript.
 * @readonly {Object} config.js.frontend - Configuration for Backend JavaScript.
 * @readonly {Object} config.css         - Configuration for CSS.
 * @readonly {Object} config.html        - Configuration for HTML.
 */

const config = {
    js: {
        frontend: jsFrontend,
        backend:  jsBackend,
    },
    css,
    html,
    database,
};

config.nodemon = {
    main:  `${ projectRoot }/server.js`,
    watch: {
        src: [
            ...( config.js.backend.lint.src.filter(
                glob => glob !== `${ projectRoot }/server.js`
            ) ),
            ...config.database.lint.src,
        ],
    },
};

config.browserSync = {
    port: port + 1,
    ui:   {
        port: port + 2,
    },
    proxy: url,
    files: [
        `${ config.js.frontend.build.dest }`,
        `${ config.css.build.dest }`,
        `${ config.html.build.dest.all }`,
    ],
};

module.exports = deepFreeze( config );

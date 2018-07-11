const path = require( 'path' );
const deepFreeze = require( 'deep-freeze' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const { url, port, } = require( `${ projectRoot }/settings/server/config` );
const js = require( `${ projectRoot }/dev/gulp/js/config` );
const css = require( `${ projectRoot }/dev/gulp/css/config` );
const html = require( `${ projectRoot }/dev/gulp/html/config` );
const server = require( `${ projectRoot }/dev/gulp/server/config` );
const database = require( `${ projectRoot }/dev/gulp/database/config` );

/**
 * @constant
 * @readonly {Object} config.js       - Configuration for frontend ECMAScript.
 * @readonly {Object} config.css      - Configuration for CSS.
 * @readonly {Object} config.html     - Configuration for HTML.
 * @readonly {Object} config.server   - Configuration for web server ECMAScript.
 * @readonly {Object} config.database - Configuration for database ECMAScript.
 */

const config = {
    js,
    css,
    html,
    server,
    database,
};

config.nodemon = {
    main:  `${ projectRoot }/server.js`,
    watch: {
        src: [
            ...( config.server.lint.src.filter(
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
        `${ config.js.build.dest }`,
        `${ config.css.build.dest }`,
        `${ config.html.build.dest.all }`,
    ],
};

module.exports = deepFreeze( config );

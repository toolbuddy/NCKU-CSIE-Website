const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );
const { host, port, } = require( `${ projectRoot }/settings/server/config` );

/**
 * @constant
 * @readonly {Object} config.js.frontend - Configuration for Frontend JavaScript.
 * @readonly {Object} config.js.frontend - Configuration for Backend JavaScript.
 * @readonly {Object} config.css         - Configuration for CSS.
 * @readonly {Object} config.html        - Configuration for HTML.
 */
const config = {
    js: {
        frontend: require( `${ projectRoot }/settings/gulp/js-frontend/config` ),
        backend: require( `${ projectRoot }/settings/gulp/js-backend/config` ),
    },
    css: require( `${ projectRoot }/settings/gulp/css/config` ),
    html: require( `${ projectRoot }/settings/gulp/html/config` ),
};

config.nodemon = {
    main: `${ projectRoot }/server.js`,
    watch: {
        src: [
            ...( config.js.backend.lint.src.filter(
                glob => glob !== `${ projectRoot }/server.js`
            ) ),
        ],
    },
};

const nextPort = 1;
config.browserSync = {
    port: port + nextPort,
    ui: {
        port: port + nextPort + nextPort,
    },
    proxy: host,
    files: [
        `${ config.js.frontend.build.dest }`,
        `${ config.css.build.dest }`,
        `${ config.html.build.dest }`,
    ],
};

module.exports = deepFreeze( config );

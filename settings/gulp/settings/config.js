const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.server.src    - Array of glob of source files for copying server configuration.
 * @readonly {string}   config.server.dest   - Glob of destination directory for copying server configuration.
 * @readonly {string}   config.server.copy   - Glob of the very copy file of server configuration.
 * @readonly {string[]} config.database.src  - Array of glob of source files for copying database configuration.
 * @readonly {string}   config.database.dest - Glob of destination directory for copying database configuration.
 * @readonly {string}   config.database.copy - Glob of the very copy file of database configuration.
 */
const config = {
    server: {
        src: [
            `${ projectRoot }/settings/server/config.js.default`,
        ],
        dest: `${ projectRoot }/settings/server`,
        copy: `${ projectRoot }/settings/server/config.js`,
    },
    database: {
        src: [
            `${ projectRoot }/settings/database/config.js.default`,
        ],
        dest: `${ projectRoot }/settings/database`,
        copy: `${ projectRoot }/settings/database/config.js`,
    },
};

module.exports = deepFreeze( config );

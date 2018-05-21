const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.src  - Array of glob of source files for copying server configuration.
 * @readonly {string}   config.dest - Glob of destination directory for copying server configuration.
 * @readonly {string}   config.copy - Glob of the very copy file of server configuration.
 */

const config = {
    src: [
        `${ projectRoot }/settings/server/config.js.default`,
    ],
    dest: `${ projectRoot }/settings/server`,
    copy: `${ projectRoot }/settings/server/config.js`,
};

module.exports = deepFreeze( config );

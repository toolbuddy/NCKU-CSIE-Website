const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const deepFreeze = require( `${ projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @readonly {string[]} config.src  - Array of glob of source files for copying database configuration.
 * @readonly {string}   config.dest - Glob of destination directory for copying database configuration.
 * @readonly {string}   config.copy - Glob of the very copy file of database configuration.
 */

const config = {
    src: [
        `${ projectRoot }/settings/database/config.js.default`,
    ],
    dest: `${ projectRoot }/settings/database`,
    copy: `${ projectRoot }/settings/database/config.js`,
};

module.exports = deepFreeze( config );

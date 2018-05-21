const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/database/config` );
const generateTables = require( `${ projectRoot }/settings/gulp/database/gen-tables` );

/**
 * Task `build:database`:
 *     Clean `pre-build:database` generated files.
 */

generateTables( 'teacher', config );
generateTables( 'announcement', config );

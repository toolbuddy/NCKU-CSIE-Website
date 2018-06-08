const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/database/config` );
const generateTables = require( `${ projectRoot }/dev/gulp/database/gen-tables` );

/**
 * Task `build:database`:
 *     Auto generate database table files.
 */

generateTables( 'teacher', config );
generateTables( 'announcement', config );

const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( __dirname ) );
const databaseSettings = require( path.join( projectRoot, 'settings/database/config.js' ) );
const generateTables = require( path.join( projectRoot, 'dev/database/gen-tables.js' ) );

/**
 * Task `build:database`:
 *     Auto generate database table files.
 */

generateTables( 'faculty', databaseSettings );
generateTables( 'announcement', databaseSettings );

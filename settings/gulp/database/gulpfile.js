const del = require( 'del' );
const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/database/config` );
const generateTables = require( `${ projectRoot }/settings/gulp/database/gen-tables` );

/**
 * Task `pre-build:database`:
 *     Use pure `gulp` to copy database configuration files.
 */

gulp.task(
    'pre-build:database',
    () => gulp.src( config.src )
        .pipe( rename(
            ( file ) => {
                file.extname = '';
            }
        ) )
        .pipe( gulp.dest( config.dest ) )
);

/**
 * Task `build:database`:
 *     Clean `pre-build:database` generated files.
 */

gulp.task(
    'build:database',
    gulp.parallel(
        done => {
            generateTables( 'teacher' );
            done();
        }
    )
); 

/**
 * Task `clear:database`:
 *     Clean `pre-build:database` generated files.
 */

gulp.task(
    'clear:database',
    gulp.parallel(
        done => del( config.copy, { force: true, } ).then( () => done() )
    )
);

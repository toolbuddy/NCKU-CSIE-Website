const del = require( 'del' );
const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/settings/config` );

/**
 * Task `pre-build:settings`:
 *     Use pure `gulp` to copy server and database configuration files.
 */
gulp.task( 'pre-build:settings', gulp.parallel(
    () => {
        return gulp.src( config.server.src )
            .pipe( rename(
                ( file ) => {
                    file.extname = '';
                }
            ) )
            .pipe( gulp.dest( config.server.dest ) );
    },
    () => {
        return gulp.src( config.database.src )
            .pipe( rename(
                ( file ) => {
                    file.extname = '';
                }
            ) )
            .pipe( gulp.dest( config.database.dest ) );
    }
) );

/**
 * Task `clear:settings`:
 *     Clean `pre-build:settings` generated files.
 */
gulp.task( 'clear:settings', gulp.parallel(
    ( done ) => {
        del( config.server.copy, { force: true, } )
            .then( () => done() );
    },
    ( done ) => {
        del( config.database.copy, { force: true, } )
            .then( () => done() );
    }
) );

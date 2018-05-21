const del = require( 'del' );
const gulp = require( 'gulp' );
const rename = require( 'gulp-rename' );
const path = require( 'path' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/server/config` );

/**
 * Task `pre-build:server`:
 *     Use pure `gulp` to copy server configuration files.
 */

gulp.task(
    'pre-build:server',
    () => gulp.src( config.src )
        .pipe( rename(
            ( file ) => {
                file.extname = '';
            }
        ) )
        .pipe( gulp.dest( config.dest ) )
);

/**
 * Task `clear:server`:
 *     Clean `pre-build:server` generated files.
 */

gulp.task(
    'clear:server',
    done => del( config.copy, { force: true, } ).then( () => done() ),
);

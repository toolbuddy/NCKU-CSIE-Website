const cached = require( 'gulp-cached' );
const debug = require( 'gulp-debug' );
const del = require( 'del' );
const eslint = require( 'gulp-eslint' );
const gulp = require( 'gulp' );
const gulpIf = require( 'gulp-if' );
const path = require( 'path' );
const plumber = require( 'gulp-plumber' );
const rename = require( 'gulp-rename' );

const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const config = require( `${ projectRoot }/settings/gulp/js-backend/config` );

/**
 * Task `pre-build:js-backend`:
 *     Use pure `gulp` to copy server configuration files.
 */

gulp.task(
    'pre-build:js-backend',
    () => gulp.src( config.preBuild.src )
        .pipe( rename(
            ( file ) => {
                file.extname = '';
            }
        ) )
        .pipe( gulp.dest( config.preBuild.dest ) )
);

/**
 * Task `lint:js-backend`:
 *     Use `eslint` to lint server ECMAScript files.
 */

gulp.task(
    'lint:js-backend',
    () => {
        /**
         * Helper Function:
         *     Judge `eslint` has fixed the file contents or not.
         */

        function isFixed ( file ) {
            return file.eslint != null && file.eslint.fixed;
        }

        return gulp.src( config.lint.src, { base: projectRoot, } )
            .pipe( plumber() )
            .pipe( cached( 'lint:js-backend' ) )
            .pipe( eslint( {
                configFile: config.lint.rule,
                fix:        true,
            } ) )
            .pipe( eslint.format() )
            .pipe( eslint.result( ( result ) => {
                const threshold = 0;

                // If a file has errors/warnings, uncache it.
                if ( result.warningCount > threshold || result.errorCount > threshold )
                    delete cached.caches[ 'lint:js-backend' ][ result.filePath ];
            } ) )
            .pipe( debug() )
            .pipe( gulpIf( isFixed, gulp.dest( config.lint.dest ) ) );
    }
);

/**
 * Task `clear:js-backend`:
 *     Clean `pre-build:js-backend` and `lint:js-backend` generated caches.
 */

gulp.task(
    'clear:js-backend',
    gulp.parallel(
        ( done ) => {
            delete cached.caches[ 'lint:js-backend' ];
            done();
        },
        done => del( config.preBuild.copy, { force: true, } ).then( () => done() )
    )
);

/**
 * Task `watch:js-backend`:
 *     Watch Backend JavaScript files.
 *     Trigger `lint:js-backend` if changed.
 */

gulp.task(
    'watch:js-backend',
    ( done ) => {
        gulp.watch( config.lint.src, gulp.series( 'lint:js-backend' ) );
        done();
    }
);
